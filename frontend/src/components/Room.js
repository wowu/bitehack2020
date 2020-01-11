import React, { useState, useEffect, Component } from "react";
import io from "socket.io-client";

export default class Room extends Component {
  constructor(props) {
    super(props);
    this.roomId = props.match.params.id;
    this.state = { ideas: [], ideaText: "", topic: "" };

    this.socket = io("http://localhost:5000");

    this.socket.on("roomInfo", ({ ideas, topic }) => {
      this.setState({ ideas, topic });
    });

    this.socket.on("pushNewIdeaToUsers", idea => {
      this.setState({
        ideas: [...this.state.ideas, idea]
      });
    });

    this.socket.on("pushDeletedIdeaToUsers", idea => {
      console.log("DELETED IDEA:", idea);
      this.setState({
        ideas: this.state.ideas.filter(({ id }) => id !== idea.id)
      });
    });

    this.socket.on("roomNotFound", data => {
      console.error("Room not found");
    });

    this.socket.emit("connectToRoom", {
      roomId: this.roomId,
      userName: "userName"
    });
  }

  removeIdea(idea) {
    console.log("IDEA TO REMOVE: ", idea);
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

  handleFormSubmit(e) {
    e.preventDefault();
    this.publishIdea();
  }

  render() {
    const { ideas, ideaText, topic } = this.state;

    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col">
              <h3>Q: {topic}</h3>

              <ul>
                {ideas.map(idea => (
                  <li key={idea.id}>
                    {idea.idea}{" "}
                    <button onClick={() => this.removeIdea(idea)}>X</button>
                  </li>
                ))}
              </ul>

              <form onSubmit={this.handleFormSubmit.bind(this)}>
                <input
                  type="text"
                  placeholder="Wpisz pomysł"
                  value={ideaText}
                  onChange={e => this.setState({ ideaText: e.target.value })}
                />

                <button>Dodaj pomysł</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
