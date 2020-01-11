import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";

const RoomCreation = () => {
  const { id } = useParams();
  const [idea, setIdea] = useState("");

  const [ideas, setIdeas] = useState([]);

  useEffect(() => {
    const socket = io("http://localhost:5000");

    socket.emit("connectToRoom", {
      roomId: id,
      userName: "asd"
    });

    socket.on("test", data => {
      console.log("foo");
    });

    return () => {
      socket.close();
    };
  }, []);

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
