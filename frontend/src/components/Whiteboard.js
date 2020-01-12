import * as d3 from "d3";
import React from "react";

function createNewWhiteBoard(width, height) {
  function drag() {
    function dragstarted(d) {
      if (!d3.event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }

    function dragended(d) {
      if (!d3.event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    return d3
      .drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);
  }

  const svg = d3.create("svg");
  svg.node().classList.add("whiteboard");
  svg.attr("width", width);
  svg.attr("height", height);
  svg.attr("viewBox", [0, 0, width, height]);

  const color = d3.scaleOrdinal(d3.schemeCategory10);

  let nodes = [];
  let links = [];

  const simulation = d3
    .forceSimulation(nodes)
    .force("charge", d3.forceManyBody().strength(-1000))
    .force("link", d3.forceLink(links).distance(200))
    .force("x", d3.forceX())
    .force("y", d3.forceY())
    .alphaTarget(1)
    .on("tick", ticked);

  const g = svg
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
  let link = g
    .append("g")
    .attr("stroke", "#000")
    .attr("stroke-width", 1.5)
    .selectAll(".link");
  let node = g
    .append("g")
    .attr("stroke", "#fff")
    .attr("stroke-width", 1.5)
    .selectAll(".node");

  restart();

  let i = 100;
  svg.on("dblclick", () => {
    nodes.push({ id: i++, idea: "foo bar idea!" });
    restart();
  });

  function restart() {
    // Apply the general update pattern to the nodes.
    node = node.data(nodes, function(d) {
      return d;
    });
    node.exit().remove();

    node = node
      .enter()
      .append("g")
      .append("text")
      .text(d => d.idea)
      // .append("rect")
      .attr("stroke", function(d) {
        return "black";
      })
      // .attr("width", 150)
      // .attr("height", 50)
      // // .attr('text')
      // // .text('test')
      .merge(node);

    // Apply the general update pattern to the links.
    link = link.data(links, function(d) {
      return d.source.id + "-" + d.target.id;
    });
    link.exit().remove();
    link = link
      .enter()
      .append("line")
      .merge(link);

    // Update and restart the simulation.
    simulation.nodes(nodes);
    simulation.force("link").links(links);
    simulation.alpha(1).restart();
  }

  function ticked() {
    node
      .attr("x", d => d.x)
      .attr("y", d => d.y)
      .call(drag());

    link
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y);
  }

  svg.on("contextmenu", () => {
    nodes.pop();
    restart();
  });

  return {
    add(node) {
      nodes.push(node);
      restart();
    },
    remove(node) {
      const index = nodes.findIndex(x => x.id === node.id);
      if (index != -1) {
        nodes.splice(index, 1);
        restart();
      }
    },
    component: <div ref={div => div && div.append(svg.node())}> </div>
  };
}

export default createNewWhiteBoard;
