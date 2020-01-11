import React from "react";

const Card = ({ idea, master, onUpvote, mode, onRemove }) => (
  <div className="card mb-2">
    <div className="card-body ">
      <div className="row">
        <div className="col-10">{idea.idea}</div>
        <div className="col-2">{idea.score}</div>
        {master && <button onClick={onRemove}>X</button>}
        {mode === "voting" && <button onClick={onUpvote}>/\</button>}
      </div>
    </div>
  </div>
);

export default Card;
