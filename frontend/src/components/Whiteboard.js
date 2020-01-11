import React, { Component } from "react";
import { Graph } from "react-d3-graph";

export default class Whiteboard extends Component {
  render() {
    const data = {
      nodes: [{ id: "Harry" }, { id: "Sally" }, { id: "Alice" }],
      links: []
    };
    return (
      <div>
        <Graph id="graph-id" data={data} />
      </div>
    );
  }
}
