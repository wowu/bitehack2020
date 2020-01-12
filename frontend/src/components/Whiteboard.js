import * as d3 from "d3";
import React from "react";

const svgElement = type =>
  document.createElementNS("http://www.w3.org/2000/svg", type);
const measureString = (window.ms = (() => {
  const ruler = document.createElement("span");
  ruler.id = "ruler";
  document.body.append(ruler);
  return string => {
    ruler.innerText = string;
    return ruler.getBoundingClientRect().width;
  };
})());

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
  let offsetX = 0;
  let offsetY = 0;
  let scale = 1;

  const svg = d3.create("svg");
  svg.node().classList.add("whiteboard");
  svg.attr("width", width);
  svg.attr("height", height);
  svg.attr("viewBox", [0, 0, width, height]);
  window.addEventListener("resize", () => {
    width = window.innerWidth;
    svg.attr("width", width);
    svg.attr("viewBox", [0, 0, width, height]);
    g.attr(
      "transform",
      `translate(${width / 2 + offsetX}, ${height / 2 + offsetY})`
    );
  });

  let nodes = [];
  let links = [];
  let onNodeRemoved = () => {};

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

  function updateTransforms() {
    g.attr(
      "transform",
      `translate(${width / 2 + offsetX}, ${height / 2 +
        offsetY}), scale(${scale})`
    );
  }

  function restart() {
    // Apply the general update pattern to the nodes.
    node = node.data(nodes, d => d.id);
    node.exit().remove();

    node = node
      .enter()
      .append(d => {
        const g = svgElement("g");
        const text = svgElement("text");
        text.innerHTML = d.idea;
        const rect = svgElement("rect");
        rect.setAttribute("width", measureString(d.idea) + 12);
        g.append(rect);
        g.append(text);
        // remove nodes
        g.addEventListener("contextmenu", e => {
          e.preventDefault();
          exports.remove(d);
          onNodeRemoved({ id: d.id, idea: d.idea });
        });
        return g;
      })
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
  let mousedown = false;
  svg.node().addEventListener("mousedown", e => {
    mousedown = true;
  });
  window.addEventListener("mouseup", e => {
    mousedown = false;
  });
  window.addEventListener("mousemove", e => {
    if (mousedown) {
      offsetX += e.movementX;
      offsetY += e.movementY;
      updateTransforms();
    }
  });
  svg.node().addEventListener("mousewheel", e => {
    scale -= e.deltaY / 500;
    updateTransforms();
  });

  function ticked() {
    node.attr("transform", d => `translate(${d.x}, ${d.y})`).call(drag());

    link
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y);
  }

  const exports = {
    add(node) {
      nodes.push(node);
      restart();
    },
    remove(node) {
      const index = nodes.findIndex(x => x.id === node.id);
      if (index !== -1) {
        nodes.splice(index, 1);
        restart();
      }
    },
    onNodeRemoved(callback) {
      onNodeRemoved = callback;
    },
    connect(source, target) {
      links.push({ source, target });
      restart();
    },
    component: <div ref={div => div && div.append(svg.node())}> </div>
  };
  return exports;
}

export default createNewWhiteBoard;
