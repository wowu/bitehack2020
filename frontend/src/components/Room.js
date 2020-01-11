import React, { useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";

const RoomCreation = () => {
  const { id } = useParams();
  const [idea, setIdea] = useState("");

  const [ideas, setIdeas] = useState([]);
  const socket = io("http://localhost:3000");

  const publishIdea = () => {
    setIdeas([idea, ...ideas]);
    setIdea("");
  };

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
        onChange={e => setIdea(e.target.value)}
      />

      <button onClick={publishIdea}>Dodaj pomysł</button>
    </div>
  );
};

export default RoomCreation;
