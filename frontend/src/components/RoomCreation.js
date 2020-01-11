import React, { useState } from "react";
import { Link } from "react-router-dom";

const RoomCreation = () => {
  const [brainstormTopic, setBrainstormTopic] = useState("");

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <input
            type="text"
            value={brainstormTopic}
            onChange={e => setBrainstormTopic(e.target.value)}
          />

          <Link to="/room/xD" className="btn btn-primary">
            Create room
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoomCreation;
