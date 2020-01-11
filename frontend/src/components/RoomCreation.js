import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const RoomCreation = () => {
  const [brainstormTopic, setBrainstormTopic] = useState("");
  const history = useHistory();

  const handleCreateRoom = async () => {
    try {
      const response = await axios.post("/create-room", {
        topic: brainstormTopic
      });

      history.push(`/room/${response.data.id}`);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <input
            type="text"
            value={brainstormTopic}
            onChange={e => setBrainstormTopic(e.target.value)}
            placeholder="Topic"
          />

          <button onClick={handleCreateRoom}>Create room</button>
        </div>
      </div>
    </div>
  );
};

export default RoomCreation;
