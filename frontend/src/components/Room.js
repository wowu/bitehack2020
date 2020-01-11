import React, { useState, useEffect, Component } from "react";
import io from "socket.io-client";

export default class Room extends Component {
  constructor(props) {
    super(props);
    this.roomId = props.match.params.id;
    this.state = { ideas: [], idea: "" };

    this.socket = io("http://localhost:5000");
    this.socket.emit("connectToRoom", {
      roomId: this.roomId,
      userName: "userName"
    });
  }
  publishIdea() {
    this.socket.emit("newIdea", {
      roomId: this.roomId,
      idea: this.state.idea
    });
    this.setState({
      ideas: [...this.state.ideas, this.state.idea],
      idea: ""
    });
  }
  render() {
    const { id, ideas, idea } = this.state;
    return (
      <div>
        <h3>Brainstorm: {id}</h3>

        <ul>
          {ideas.map(idea => (
            <li>{idea}</li>
          ))}
        </ul>

        <input
          type="text"
          placeholder="Wpisz pomysł"
          value={idea}
          onChange={e => this.setState({ idea: e.target.value })}
        />

        <button onClick={this.publishIdea.bind(this)}>Dodaj pomysł</button>
      </div>
    );
  }
}
