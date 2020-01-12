import React, { useState, Component } from "react";
import IconToggle from "./IconToggle";

export default class Card extends Component {
  constructor() {
    super();
    this.state = { liked: false };
  }
  onVote() {
    const liked = !this.state.liked;
    if (this.props.getState().votesRemaining > 0 || !liked) {
      if (liked) this.props.onUpvote();
      else this.props.onDownvote();
      this.setState({ liked });
    }
  }
  render() {
    const { idea, master, onRemove, mode } = this.props;
    return (
      <div className="card mb-2" style={this.props.style || {}}>
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col-8 col-md-10" style={{ fontSize: 20 }}>
              {idea.idea}
            </div>
            <div className="col-4 col-md-2">
              <div className="row justify-content-end">
                <div className="col text-right">
                  {mode === "voting" && !master && (
                    <IconToggle
                      iconOn="fa fa-heart"
                      iconOff="far fa-heart"
                      style={{ color: "#cc1717" }}
                      value={this.state.liked}
                      onClick={this.onVote.bind(this)}
                    />
                  )}
                </div>
                {master && (
                  <div className="col text-center">
                    <i
                      className="fa fa-times"
                      style={{ cursor: "pointer" }}
                      onClick={onRemove}
                    ></i>
                  </div>
                )}
                {master && (
                  <div className="col text-center">
                    {idea.score}
                    <br />
                    <span style={{ fontSize: 13, fontWeight: "bold" }}>
                      VOTES
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
