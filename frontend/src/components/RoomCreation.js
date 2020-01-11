import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import MasterPlanImage from "../assets/master_plan.svg";

const RoomCreation = () => {
  const [brainstormTopic, setBrainstormTopic] = useState("");
  const history = useHistory();

  const handleCreateRoom = async e => {
    e.preventDefault();

    try {
      const response = await axios.post("/create-room", {
        topic: brainstormTopic === "" ? "No name" : brainstormTopic
      });

      const roomId = response.data.id;

      const masterOf =
        JSON.parse(window.localStorage.getItem("masterOf")) || [];

      window.localStorage.setItem(
        "masterOf",
        JSON.stringify([roomId, ...masterOf])
      );

      history.push(`/room/${roomId}`);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="container">
      <div className="row my-5">
        <div className="col">
          <div className="d-flex justify-content-center align-items-center">
            <img
              style={{ maxWidth: 400 }}
              alt="Master Plan"
              src={MasterPlanImage}
            />
          </div>
        </div>
        <div className="col">
          <div className="my-5">
            <h1>MindExplode</h1>
            <h3>Better brainstorming for everyone.</h3>
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleCreateRoom}>
            <div className="input-group">
              <input
                className="form-control"
                type="text"
                value={brainstormTopic}
                onChange={e => setBrainstormTopic(e.target.value)}
                placeholder="What problem do you want to solve?"
                style={{
                  borderTopLeftRadius: "1.078em",
                  borderBottomLeftRadius: "1.078em"
                }}
              />

              <div className="input-group-append">
                <button className="btn btn-primary">Create room</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col mt-5">
          <div className="text-center mt-5">
            Created by Random Dudes at BiteHack 2020
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCreation;
