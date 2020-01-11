import React, { Component } from "react";
import io from "socket.io-client";
import { withRouter } from "react-router-dom";
import { RIEInput } from "riek";

class Room extends Component {
  constructor(props) {
    super(props);

    this.roomId = props.match.params.id;
    this.state = {
      ideas: [],
      ideaText: "",
      topic: "",
      mode: "insert",
      loading: true
    };

    this.socket = io("http://localhost:5000");

    this.socket.on("roomInfo", ({ ideas, topic, mode }) => {
      this.setState({ ideas, topic, mode, loading: false });
    });

    this.socket.on("pushNewIdeaToUsers", idea => {
      this.setState({
        ideas: [...this.state.ideas, idea]
      });
    });

    this.socket.on("roomModeChanged", mode => {
      console.log(mode);
      this.setState({ mode });
    });

    this.socket.on("pushDeletedIdeaToUsers", idea => {
      this.setState({
        ideas: this.state.ideas.filter(({ id }) => id !== idea.id)
      });
    });

    this.socket.on("topicChanged", topic => {
      this.setState({ topic });
    });

    this.socket.on("roomNotFound", data => {
      this.props.history.push("/");
    });

    this.socket.emit("connectToRoom", {
      roomId: this.roomId,
      userName: "userName"
    });
  }

  removeIdea(idea) {
    this.socket.emit("removeIdea", {
      roomId: this.roomId,
      ideaId: idea.id
    });
  }

  publishIdea() {
    this.socket.emit("newIdea", {
      roomId: this.roomId,
      idea: this.state.ideaText
    });

    this.setState({
      ideaText: ""
    });
  }

  changeTopic({ topic }) {
    this.socket.emit("changeTopic", { roomId: this.roomId, topic });
  }

  handleFormSubmit(e) {
    e.preventDefault();
    this.publishIdea();
  }

  handleModeChange(e) {
    this.socket.emit("changeRoomMode", {
      roomId: this.roomId,
      newMode: e.target.value
    });
  }

  render() {
    const { ideas, ideaText, topic, mode, loading } = this.state;

    return (
      <>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div>
            <div className="container">
              <div className="row">
                <div className="col">
                  <h3>
                    Q:{" "}
                    <RIEInput
                      value={topic}
                      propName="topic"
                      change={this.changeTopic.bind(this)}
                      validate={string => string !== ""}
                    />
                  </h3>

                  <div>
                    <label>
                      <input
                        type="radio"
                        name="mode"
                        value="insert"
                        checked={mode === "insert"}
                        onChange={this.handleModeChange.bind(this)}
                      />
                      Dodawanie
                    </label>
                    <br />
                    <label>
                      <input
                        type="radio"
                        name="mode"
                        value="voting"
                        checked={mode === "voting"}
                        onChange={this.handleModeChange.bind(this)}
                      />
                      Głosowanie
                    </label>
                    <br />
                    <label>
                      <input
                        type="radio"
                        name="mode"
                        value="block"
                        checked={mode === "block"}
                        onChange={this.handleModeChange.bind(this)}
                      />
                      Zablokuj
                    </label>
                  </div>

                  <ul>
                    {ideas.map(idea => (
                      <li key={idea.id}>
                        {idea.idea}{" "}
                        <button onClick={() => this.removeIdea(idea)}>X</button>
                      </li>
                    ))}
                  </ul>

                  {mode === "insert" && (
                    <form onSubmit={this.handleFormSubmit.bind(this)}>
                      <div className="input-group">
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Wpisz pomysł"
                          value={ideaText}
                          onChange={e =>
                            this.setState({ ideaText: e.target.value })
                          }
                          style={{
                            borderTopLeftRadius: "1.078em",
                            borderBottomLeftRadius: "1.078em"
                          }}
                        />

                        <div className="input-group-append">
                          <button className="btn btn-primary">
                            Dodaj pomysł
                          </button>
                        </div>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default withRouter(Room);
