import React, { Component } from "react";
import io from "socket.io-client";
import { withRouter } from "react-router-dom";
import { RIEInput } from "riek";
import createWhiteboard from "./Whiteboard";
import Autosuggest from "react-autosuggest";
import axios from "axios";

import Card from "./Card";
import KanbanImg from "../assets/kanban.png";

class Room extends Component {
  constructor(props) {
    super(props);

    this.roomId = props.match.params.id;

    this.masterOf = JSON.parse(window.localStorage.getItem("masterOf"));

    this.master = this.masterOf && this.masterOf.indexOf(this.roomId) !== -1;

    const { component, add, remove, onNodeRemoved } = createWhiteboard(
      window.innerWidth,
      window.innerHeight - 200
    );
    onNodeRemoved(node => {
      this.removeIdea(node);
    });

    this.removeFromWhiteboard = remove;
    this.addToWhiteboard = add;
    this.whiteboard = component;
    this.state = {
      ideas: [],
      ideaText: "",
      topic: "",
      mode: "insert",
      loading: true,
      userIdeaCount: 0,
      votesRemaining: 0,
      suggestions: []
    };

    this.socket = io("/");

    this.socket.on("roomInfo", ({ ideas, topic, mode, votesRemaining }) => {
      this.setState({ ideas, topic, mode, loading: false, votesRemaining });

      ideas.forEach(this.addToWhiteboard);
    });

    this.socket.on("pushNewIdeaToUsers", idea => {
      this.setState({
        ideas: [...this.state.ideas, idea]
      });
      this.addToWhiteboard(idea);
      console.log(idea);
    });

    this.socket.on(
      "roomModeChanged",
      ({ mode, votesRemaining = this.state.votesRemaining }) => {
        console.log(mode, votesRemaining);
        this.setState({ mode, votesRemaining });
      }
    );

    this.socket.on("pushDeletedIdeaToUsers", idea => {
      this.setState({
        ideas: this.state.ideas.filter(({ id }) => id !== idea.id)
      });
      this.removeFromWhiteboard(idea);
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

    this.socket.on("ideaDownvoted", newIdea => {
      this.setState({
        ideas: this.state.ideas.map(idea =>
          idea.id === newIdea.id ? newIdea : idea
        )
      });
    });

    // this.socket.on("suggestions", suggestions => {
    //   this.setState({ suggestions });
    // });

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
    if (this.state.votesRemaining > 0) {
      this.socket.emit("upvoteIdea", { roomId: this.roomId, ideaId: idea.id });
      this.setState({ votesRemaining: this.state.votesRemaining - 1 });
    }
  }

  downvote(idea) {
    this.socket.emit("downvoteIdea", { roomId: this.roomId, ideaId: idea.id });
    this.setState({ votesRemaining: this.state.votesRemaining + 1 });
  }

  isSentence(string) {
    return string.trim().split(" ").length >= 1;
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
                        <label className="form-check-inline">
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
                        <label className="form-check-inline">
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

                  {(mode === "voting" || (master && mode === "block")) && (
                    <div>
                      {mode === "voting" && (
                        <h5 className="text-center">
                          {this.state.votesRemaining > 0
                            ? `You have ${this.state.votesRemaining} votes remaining`
                            : `You don't have any votes remaining`}
                        </h5>
                      )}
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        {ideas.map(idea => (
                          <Card
                            key={idea.id}
                            idea={idea}
                            onRemove={() => this.removeIdea(idea)}
                            onUpvote={() => this.upvote(idea)}
                            onDownvote={() => this.downvote(idea)}
                            getState={() => this.state}
                            style={master ? { order: -(idea.score || 0) } : {}}
                            mode={mode}
                            master={master}
                          />
                        ))}
                      </div>
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
                          maxLength={80}
                          placeholder="Your idea..."
                          value={ideaText}
                          onChange={e => {
                            this.setState({ ideaText: e.target.value });
                            const text = e.target.value;

                            const endpointName = this.isSentence(text)
                              ? "proces_sentence"
                              : "similar_nouns";

                            axios
                              .get(`/api/v1.0/${endpointName}/${text}`)
                              .then(({ data }) => {
                                this.setState({
                                  suggestions: data.suggestions
                                });
                              });
                          }}
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
                      {/* todo UI */}
                      {/* <Autosuggest
                        suggestions={this.state.suggestions}
                        onSuggestionsFetchRequested={({ value }) => {
                          axios
                            .get(`/api/v1.0/similar_nouns/${value}`)
                            .then(({ data }) => {
                              this.setState({ suggestions: data.nouns });
                            });
                        }}
                        onSuggestionsClearRequested={() => {
                          this.setState({
                            suggestions: []
                          });
                        }}
                        getSuggestionValue={suggestion => {
                          console.log("suggested", suggestion);
                          return suggestion;
                        }}
                        renderSuggestion={s => (
                          <div>
                            {s}
                            <button>+</button>
                          </div>
                        )}
                        inputProps={{
                          value: this.state.ideaText,
                          onChange: e => {
                            this.setState({ ideaText: e.target.value });
                          }
                        }}
                      /> */}
                      {this.state.ideaText
                        ? this.state.suggestions.map((suggestion, i) => (
                            <div key={i}>
                              <h2>{suggestion}</h2>
                              <button
                                onClick={e => {
                                  this.socket.emit("newIdea", {
                                    roomId: this.roomId,
                                    idea: suggestion
                                  });
                                  this.state.suggestions.splice(i, 1);
                                  this.setState({
                                    suggestions: this.state.suggestions
                                  });
                                  e.preventDefault();
                                }}
                              >
                                +
                              </button>
                            </div>
                          ))
                        : null}
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
        {master && mode === "insert" && this.whiteboard}
      </>
    );
  }
}

export default withRouter(Room);
