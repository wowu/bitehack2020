import React, { useState, Component } from "react";
import IconToggle from "./IconToggle";

export default class Card extends Component {
  constructor() {
    super();
    this.state = { liked: false };
  }
  onVote() {
    const liked = !this.state.liked;
    if (liked) this.props.onUpvote();
    else this.props.onDownvote();
    this.setState({ liked });
  }
  render() {
    const { idea, master, onUpvote, mode, onRemove } = this.props;
    return (
      <div className="card mb-2">
        <div className="card-body ">
          <div className="row">
            <div className="col-10">{idea.idea}</div>
            <div className="col-2">{idea.score}</div>
            {master && <button onClick={onRemove}>X</button>}

            <IconToggle
              iconOn="fa fa-heart"
              iconOff="far fa-heart"
              style={{ color: "#cc1717" }}
              value={this.state.liked}
              onClick={this.onVote.bind(this)}
            />
          </div>
        </div>
      </div>
    );
  }
}
