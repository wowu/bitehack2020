import React, { Component } from "react";
import io from "socket.io-client";
import { withRouter } from "react-router-dom";
import { RIEInput } from "riek";

import Card from "./Card";
import KanbanImg from "../assets/kanban.png";

class Room extends Component {
  constructor(props) {
    super(props);

    this.roomId = props.match.params.id;

    this.masterOf = JSON.parse(window.localStorage.getItem("masterOf"));

    this.master = this.masterOf && this.masterOf.indexOf(this.roomId) !== -1;

    this.state = {
      ideas: [],
      ideaText: "",
      topic: "",
      mode: "insert",
      loading: true,
      userIdeaCount: 0
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
      console.error("Room not found");
      this.props.history.push("/");
    });

    this.socket.on("ideaUpvoted", newIdea => {
      this.setState({
        ideas: this.state.ideas.map(idea =>
          idea.id === newIdea.id ? newIdea : idea
        )
      });
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
    if (this.state.ideaText === "") return;

    this.socket.emit("newIdea", {
      roomId: this.roomId,
      idea: this.state.ideaText
    });

    this.setState({
      ideaText: "",
      userIdeaCount: this.state.userIdeaCount + 1
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

  upvote(idea) {
    this.socket.emit("upvoteIdea", { roomId: this.roomId, ideaId: idea.id });
  }

  render() {
    const { ideas, ideaText, topic, mode, loading } = this.state;
    const master = this.master;

    return (
      <>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div>
            <div className="container">
              <div className="row">
                <div className="col">
                  <h3 className="mt-4 text-center">
                    {master ? (
                      <RIEInput
                        value={topic}
                        propName="topic"
                        change={this.changeTopic.bind(this)}
                        validate={string => string !== ""}
                      />
                    ) : (
                      topic
                    )}
                  </h3>

                  {master && (
                    <div className="text-center">
                      <div className="form-check form-check-inline">
                        Select mode:
                      </div>

                      <div className="form-check form-check-inline">
                        <label>
                          <input
                            type="radio"
                            className="mr-1"
                            name="mode"
                            value="insert"
                            checked={mode === "insert"}
                            onChange={this.handleModeChange.bind(this)}
                          />
                          Brainstorm
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <label class="form-check-inline">
                          <input
                            type="radio"
                            className="mr-1"
                            name="mode"
                            value="voting"
                            checked={mode === "voting"}
                            onChange={this.handleModeChange.bind(this)}
                          />
                          Voting
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <label class="form-check-inline">
                          <input
                            type="radio"
                            className="mr-1"
                            name="mode"
                            value="block"
                            checked={mode === "block"}
                            onChange={this.handleModeChange.bind(this)}
                          />
                          Conclusions
                        </label>
                      </div>
                    </div>
                  )}

                  {(master || mode === "voting") && (
                    <div>
                      {mode === "voting" && (
                        <h5 className="text-center">
                          Now vote for 3 best ideas
                        </h5>
                      )}
                      {ideas.map(idea => (
                        <Card
                          key={idea.id}
                          idea={idea}
                          onRemove={() => this.removeIdea(idea)}
                          onUpvote={() => this.upvote(idea)}
                          mode={mode}
                          master={master}
                        />
                      ))}
                    </div>
                  )}

                  {mode === "insert" && (
                    <form
                      className="mt-4"
                      onSubmit={this.handleFormSubmit.bind(this)}
                    >
                      <div className="input-group">
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Your idea..."
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
                          <button className="btn btn-primary">Send!</button>
                        </div>
                      </div>
                      <div className="text-muted text-center mt-1">
                        {this.state.userIdeaCount > 0 && (
                          <>
                            You sent {this.state.userIdeaCount} idea
                            {this.state.userIdeaCount > 1 && "s"}! Good work!
                          </>
                        )}
                      </div>
                    </form>
                  )}

                  {!master && mode === "block" && (
                    <div className="mt-5 d-flex flex-column align-items-center">
                      <img
                        style={{ maxWidth: 300, widht: "100%" }}
                        src={KanbanImg}
                      />
                      <h3 className="text-center">Thanks for participation!</h3>
                    </div>
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
