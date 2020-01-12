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
    const { idea, master, onRemove } = this.props;
    return (
      <div className="card mb-2" style={this.props.style || {}}>
        <div className="card-body ">
          <div className="row">
            <div className="col-10">{idea.idea}</div>
            <div className="col-2">
              <IconToggle
                iconOn="fa fa-heart"
                iconOff="far fa-heart"
                style={{ color: "#cc1717" }}
                value={this.state.liked}
                onClick={this.onVote.bind(this)}
              />
            </div>
            <div className="col-2">{idea.score}</div>
            {master && <button onClick={onRemove}>X</button>}
          </div>
        </div>
      </div>
    );
  }
}
