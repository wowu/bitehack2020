(this.webpackJsonpfrontend = this.webpackJsonpfrontend || []).push([
  [0],
  {
    145: function(e, t) {},
    154: function(e, t, a) {},
    155: function(e, t, a) {},
    156: function(e, t, a) {
      "use strict";
      a.r(t);
      var n = a(0),
        o = a.n(n),
        r = a(13),
        c = a.n(r),
        i = (a(94), a(23)),
        s = a(8),
        d = a(36),
        m = a.n(d),
        l = a(24),
        u = a(78),
        h = a(68),
        f = a.n(h),
        p = a(69),
        v = a.n(p),
        g = function() {
          var e = Object(n.useState)(""),
            t = Object(u.a)(e, 2),
            a = t[0],
            r = t[1],
            c = Object(s.f)();
          return o.a.createElement(
            "div",
            { className: "container" },
            o.a.createElement(
              "div",
              { className: "row my-5" },
              o.a.createElement(
                "div",
                { className: "col" },
                o.a.createElement(
                  "div",
                  {
                    className:
                      "d-flex justify-content-center align-items-center"
                  },
                  o.a.createElement("img", {
                    style: { maxWidth: 400 },
                    alt: "Master Plan",
                    src: v.a
                  })
                )
              ),
              o.a.createElement(
                "div",
                { className: "col" },
                o.a.createElement(
                  "div",
                  { className: "my-5" },
                  o.a.createElement("h1", null, "MindExplode"),
                  o.a.createElement(
                    "h3",
                    null,
                    "Better brainstorming for everyone."
                  )
                )
              )
            ),
            o.a.createElement(
              "div",
              { className: "row justify-content-center" },
              o.a.createElement(
                "div",
                { className: "col-md-6" },
                o.a.createElement(
                  "form",
                  {
                    onSubmit: function(e) {
                      var t, n, o;
                      return m.a.async(
                        function(r) {
                          for (;;)
                            switch ((r.prev = r.next)) {
                              case 0:
                                return (
                                  e.preventDefault(),
                                  (r.prev = 1),
                                  (r.next = 4),
                                  m.a.awrap(
                                    f.a.post("/create-room", {
                                      topic:
                                        "" === a ? "Untitled brainstorm" : a
                                    })
                                  )
                                );
                              case 4:
                                (t = r.sent),
                                  (n = t.data.id),
                                  (o =
                                    JSON.parse(
                                      window.localStorage.getItem("masterOf")
                                    ) || []),
                                  window.localStorage.setItem(
                                    "masterOf",
                                    JSON.stringify([n].concat(Object(l.a)(o)))
                                  ),
                                  c.push("/room/".concat(n)),
                                  (r.next = 14);
                                break;
                              case 11:
                                (r.prev = 11),
                                  (r.t0 = r.catch(1)),
                                  console.error(r.t0);
                              case 14:
                              case "end":
                                return r.stop();
                            }
                        },
                        null,
                        null,
                        [[1, 11]]
                      );
                    }
                  },
                  o.a.createElement(
                    "div",
                    { className: "input-group" },
                    o.a.createElement("input", {
                      className: "form-control",
                      type: "text",
                      value: a,
                      onChange: function(e) {
                        return r(e.target.value);
                      },
                      placeholder: "What problem do you want to solve?",
                      style: {
                        borderTopLeftRadius: "1.078em",
                        borderBottomLeftRadius: "1.078em"
                      }
                    }),
                    o.a.createElement(
                      "div",
                      { className: "input-group-append" },
                      o.a.createElement(
                        "button",
                        { className: "btn btn-primary" },
                        "Create room"
                      )
                    )
                  )
                )
              )
            ),
            o.a.createElement(
              "div",
              { className: "row mt-5" },
              o.a.createElement(
                "div",
                { className: "col mt-5" },
                o.a.createElement(
                  "div",
                  { className: "text-center mt-5" },
                  "Created by Random Dudes at BiteHack 2020"
                )
              )
            )
          );
        },
        E = a(72),
        b = a(73),
        k = a(79),
        w = a(74),
        N = a(80),
        x = a(75),
        y = a.n(x),
        I = a(76),
        C = a(5),
        T = function(e) {
          return document.createElementNS("http://www.w3.org/2000/svg", e);
        },
        S = (window.ms = (function() {
          var e = document.createElement("span");
          return (
            (e.id = "ruler"),
            document.body.append(e),
            function(t) {
              return (e.innerText = t), e.getBoundingClientRect().width;
            }
          );
        })());
      var O = function(e, t) {
          var a = 0,
            n = 0,
            r = 1,
            c = C.a("svg");
          c.node().classList.add("whiteboard"),
            c.attr("width", e),
            c.attr("height", t),
            c.attr("viewBox", [0, 0, e, t]),
            window.addEventListener("resize", function() {
              (e = window.innerWidth),
                c.attr("width", e),
                c.attr("viewBox", [0, 0, e, t]),
                l.attr(
                  "transform",
                  "translate(".concat(e / 2 + a, ", ").concat(t / 2 + n, ")")
                );
            });
          var i = [],
            s = [],
            d = function() {},
            m = C.f(i)
              .force("charge", C.e().strength(-1e3))
              .force("link", C.d(s).distance(200))
              .force("x", C.g())
              .force("y", C.h())
              .alphaTarget(1)
              .on("tick", function() {
                h
                  .attr("transform", function(e) {
                    return "translate(".concat(e.x, ", ").concat(e.y, ")");
                  })
                  .call(
                    C.b()
                      .on("start", function(e) {
                        C.c.active || m.alphaTarget(0.3).restart(),
                          (e.fx = e.x),
                          (e.fy = e.y);
                      })
                      .on("drag", function(e) {
                        (e.fx = C.c.x), (e.fy = C.c.y);
                      })
                      .on("end", function(e) {
                        C.c.active || m.alphaTarget(0),
                          (e.fx = null),
                          (e.fy = null);
                      })
                  ),
                  u
                    .attr("x1", function(e) {
                      return e.source.x;
                    })
                    .attr("y1", function(e) {
                      return e.source.y;
                    })
                    .attr("x2", function(e) {
                      return e.target.x;
                    })
                    .attr("y2", function(e) {
                      return e.target.y;
                    });
              }),
            l = c
              .append("g")
              .attr("transform", "translate(" + e / 2 + "," + t / 2 + ")"),
            u = l
              .append("g")
              .attr("stroke", "#000")
              .attr("stroke-width", 1.5)
              .selectAll(".link"),
            h = l
              .append("g")
              .attr("stroke", "#fff")
              .attr("stroke-width", 1.5)
              .selectAll(".node");
          function f() {
            l.attr(
              "transform",
              "translate("
                .concat(e / 2 + a, ", ")
                .concat(t / 2 + n, "), scale(")
                .concat(r, ")")
            );
          }
          function p() {
            (h = h.data(i, function(e) {
              return e.id;
            }))
              .exit()
              .remove(),
              (h = h
                .enter()
                .append(function(e) {
                  var t = T("g"),
                    a = T("text");
                  a.innerHTML = e.idea;
                  var n = T("rect");
                  return (
                    n.setAttribute("width", S(e.idea) + 12),
                    t.append(n),
                    t.append(a),
                    t.addEventListener("contextmenu", function(t) {
                      t.preventDefault(),
                        g.remove(e),
                        d({ id: e.id, idea: e.idea });
                    }),
                    t
                  );
                })
                .merge(h)),
              (u = u.data(s, function(e) {
                return e.source.id + "-" + e.target.id;
              }))
                .exit()
                .remove(),
              (u = u
                .enter()
                .append("line")
                .merge(u)),
              m.nodes(i),
              m.force("link").links(s),
              m.alpha(1).restart();
          }
          p();
          var v = !1;
          c.node().addEventListener("mousedown", function(e) {
            v = !0;
          }),
            window.addEventListener("mouseup", function(e) {
              v = !1;
            }),
            window.addEventListener("mousemove", function(e) {
              v && ((a += e.movementX), (n += e.movementY), f());
            }),
            c.node().addEventListener("mousewheel", function(e) {
              (r -= e.deltaY / 500), f();
            });
          var g = {
            add: function(e) {
              i.push(e), p();
            },
            remove: function(e) {
              var t = i.findIndex(function(t) {
                return t.id === e.id;
              });
              -1 !== t && (i.splice(t, 1), p());
            },
            onNodeRemoved: function(e) {
              d = e;
            },
            connect: function(e, t) {
              s.push({ source: e, target: t }), p();
            },
            component: o.a.createElement(
              "div",
              {
                ref: function(e) {
                  return e && e.append(c.node());
                }
              },
              " "
            )
          };
          return g;
        },
        L = function(e) {
          var t = e.idea,
            a = e.master,
            n = e.onUpvote,
            r = e.mode,
            c = e.onRemove;
          return o.a.createElement(
            "div",
            { className: "card mb-2" },
            o.a.createElement(
              "div",
              { className: "card-body " },
              o.a.createElement(
                "div",
                { className: "row" },
                o.a.createElement("div", { className: "col-10" }, t.idea),
                o.a.createElement("div", { className: "col-2" }, t.score),
                a && o.a.createElement("button", { onClick: c }, "X"),
                "voting" === r &&
                  o.a.createElement("button", { onClick: n }, "/\\")
              )
            )
          );
        },
        R = a(77),
        j = a.n(R),
        W = (function(e) {
          function t(e) {
            var a;
            Object(E.a)(this, t),
              ((a = Object(k.a)(this, Object(w.a)(t).call(this, e))).roomId =
                e.match.params.id),
              (a.masterOf = JSON.parse(
                window.localStorage.getItem("masterOf")
              )),
              (a.master = a.masterOf && -1 !== a.masterOf.indexOf(a.roomId));
            var n = O(window.innerWidth, window.innerHeight - 200),
              o = n.component,
              r = n.add,
              c = n.remove;
            return (
              (0, n.onNodeRemoved)(function(e) {
                a.removeIdea(e);
              }),
              (a.removeFromWhiteboard = c),
              (a.addToWhiteboard = r),
              (a.whiteboard = o),
              (a.state = {
                ideas: [],
                ideaText: "",
                topic: "",
                mode: "insert",
                loading: !0,
                userIdeaCount: 0
              }),
              (a.socket = y()("https://bitehack.grzegorzpach.pl")),
              a.socket.on("roomInfo", function(e) {
                var t = e.ideas,
                  n = e.topic,
                  o = e.mode;
                a.setState({ ideas: t, topic: n, mode: o, loading: !1 }),
                  t.forEach(a.addToWhiteboard);
              }),
              a.socket.on("pushNewIdeaToUsers", function(e) {
                a.setState({
                  ideas: [].concat(Object(l.a)(a.state.ideas), [e])
                }),
                  a.addToWhiteboard(e),
                  console.log(e);
              }),
              a.socket.on("roomModeChanged", function(e) {
                console.log(e), a.setState({ mode: e });
              }),
              a.socket.on("pushDeletedIdeaToUsers", function(e) {
                a.setState({
                  ideas: a.state.ideas.filter(function(t) {
                    return t.id !== e.id;
                  })
                }),
                  a.removeFromWhiteboard(e);
              }),
              a.socket.on("topicChanged", function(e) {
                a.setState({ topic: e });
              }),
              a.socket.on("roomNotFound", function(e) {
                console.error("Room not found"), a.props.history.push("/");
              }),
              a.socket.on("ideaUpvoted", function(e) {
                a.setState({
                  ideas: a.state.ideas.map(function(t) {
                    return t.id === e.id ? e : t;
                  })
                });
              }),
              a.socket.emit("connectToRoom", {
                roomId: a.roomId,
                userName: "userName"
              }),
              a
            );
          }
          return (
            Object(N.a)(t, e),
            Object(b.a)(t, [
              {
                key: "removeIdea",
                value: function(e) {
                  this.socket.emit("removeIdea", {
                    roomId: this.roomId,
                    ideaId: e.id
                  });
                }
              },
              {
                key: "publishIdea",
                value: function() {
                  "" !== this.state.ideaText &&
                    (this.socket.emit("newIdea", {
                      roomId: this.roomId,
                      idea: this.state.ideaText
                    }),
                    this.setState({
                      ideaText: "",
                      userIdeaCount: this.state.userIdeaCount + 1
                    }));
                }
              },
              {
                key: "changeTopic",
                value: function(e) {
                  var t = e.topic;
                  this.socket.emit("changeTopic", {
                    roomId: this.roomId,
                    topic: t
                  });
                }
              },
              {
                key: "handleFormSubmit",
                value: function(e) {
                  e.preventDefault(), this.publishIdea();
                }
              },
              {
                key: "handleModeChange",
                value: function(e) {
                  this.socket.emit("changeRoomMode", {
                    roomId: this.roomId,
                    newMode: e.target.value
                  });
                }
              },
              {
                key: "upvote",
                value: function(e) {
                  this.socket.emit("upvoteIdea", {
                    roomId: this.roomId,
                    ideaId: e.id
                  });
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this,
                    t = this.state,
                    a = t.ideas,
                    n = t.ideaText,
                    r = t.topic,
                    c = t.mode,
                    i = t.loading,
                    s = this.master;
                  return o.a.createElement(
                    o.a.Fragment,
                    null,
                    i
                      ? o.a.createElement("div", null, "Loading...")
                      : o.a.createElement(
                          "div",
                          null,
                          o.a.createElement(
                            "div",
                            { className: "container" },
                            o.a.createElement(
                              "div",
                              { className: "row" },
                              o.a.createElement(
                                "div",
                                { className: "col" },
                                o.a.createElement(
                                  "h3",
                                  { className: "mt-4 text-center" },
                                  s
                                    ? o.a.createElement(I.RIEInput, {
                                        value: r,
                                        propName: "topic",
                                        change: this.changeTopic.bind(this),
                                        validate: function(e) {
                                          return "" !== e;
                                        }
                                      })
                                    : r
                                ),
                                s &&
                                  o.a.createElement(
                                    "div",
                                    { className: "text-center" },
                                    o.a.createElement(
                                      "div",
                                      {
                                        className:
                                          "form-check form-check-inline"
                                      },
                                      "Select mode:"
                                    ),
                                    o.a.createElement(
                                      "div",
                                      {
                                        className:
                                          "form-check form-check-inline"
                                      },
                                      o.a.createElement(
                                        "label",
                                        null,
                                        o.a.createElement("input", {
                                          type: "radio",
                                          className: "mr-1",
                                          name: "mode",
                                          value: "insert",
                                          checked: "insert" === c,
                                          onChange: this.handleModeChange.bind(
                                            this
                                          )
                                        }),
                                        "Brainstorm"
                                      )
                                    ),
                                    o.a.createElement(
                                      "div",
                                      {
                                        className:
                                          "form-check form-check-inline"
                                      },
                                      o.a.createElement(
                                        "label",
                                        { className: "form-check-inline" },
                                        o.a.createElement("input", {
                                          type: "radio",
                                          className: "mr-1",
                                          name: "mode",
                                          value: "voting",
                                          checked: "voting" === c,
                                          onChange: this.handleModeChange.bind(
                                            this
                                          )
                                        }),
                                        "Voting"
                                      )
                                    ),
                                    o.a.createElement(
                                      "div",
                                      {
                                        className:
                                          "form-check form-check-inline"
                                      },
                                      o.a.createElement(
                                        "label",
                                        { className: "form-check-inline" },
                                        o.a.createElement("input", {
                                          type: "radio",
                                          className: "mr-1",
                                          name: "mode",
                                          value: "block",
                                          checked: "block" === c,
                                          onChange: this.handleModeChange.bind(
                                            this
                                          )
                                        }),
                                        "Conclusions"
                                      )
                                    )
                                  ),
                                ("voting" === c || (s && "block" === c)) &&
                                  o.a.createElement(
                                    "div",
                                    null,
                                    "voting" === c &&
                                      o.a.createElement(
                                        "h5",
                                        { className: "text-center" },
                                        "Now vote for 3 best ideas"
                                      ),
                                    a.map(function(t) {
                                      return o.a.createElement(L, {
                                        key: t.id,
                                        idea: t,
                                        onRemove: function() {
                                          return e.removeIdea(t);
                                        },
                                        onUpvote: function() {
                                          return e.upvote(t);
                                        },
                                        mode: c,
                                        master: s
                                      });
                                    })
                                  ),
                                "insert" === c &&
                                  o.a.createElement(
                                    "form",
                                    {
                                      className: "mt-4",
                                      onSubmit: this.handleFormSubmit.bind(this)
                                    },
                                    o.a.createElement(
                                      "div",
                                      { className: "input-group" },
                                      o.a.createElement("input", {
                                        className: "form-control",
                                        type: "text",
                                        maxLength: 80,
                                        placeholder: "Your idea...",
                                        value: n,
                                        onChange: function(t) {
                                          return e.setState({
                                            ideaText: t.target.value
                                          });
                                        },
                                        style: {
                                          borderTopLeftRadius: "1.078em",
                                          borderBottomLeftRadius: "1.078em"
                                        }
                                      }),
                                      o.a.createElement(
                                        "div",
                                        { className: "input-group-append" },
                                        o.a.createElement(
                                          "button",
                                          { className: "btn btn-primary" },
                                          "Send!"
                                        )
                                      )
                                    ),
                                    o.a.createElement(
                                      "div",
                                      {
                                        className: "text-muted text-center mt-1"
                                      },
                                      this.state.userIdeaCount > 0 &&
                                        o.a.createElement(
                                          o.a.Fragment,
                                          null,
                                          "You sent ",
                                          this.state.userIdeaCount,
                                          " idea",
                                          this.state.userIdeaCount > 1 && "s",
                                          "! Good work!"
                                        )
                                    )
                                  ),
                                !s &&
                                  "block" === c &&
                                  o.a.createElement(
                                    "div",
                                    {
                                      className:
                                        "mt-5 d-flex flex-column align-items-center"
                                    },
                                    o.a.createElement("img", {
                                      style: { maxWidth: 300, widht: "100%" },
                                      src: j.a
                                    }),
                                    o.a.createElement(
                                      "h3",
                                      { className: "text-center" },
                                      "Thanks for participation!"
                                    )
                                  )
                              )
                            )
                          )
                        ),
                    s && "insert" === c && this.whiteboard
                  );
                }
              }
            ]),
            t
          );
        })(n.Component),
        B = Object(s.g)(W);
      a(154);
      var M = function() {
        return o.a.createElement(
          i.a,
          null,
          o.a.createElement(
            s.c,
            null,
            o.a.createElement(s.a, { path: "/room/:id", component: B }),
            o.a.createElement(s.a, { path: "/whiteboard", component: O }),
            o.a.createElement(s.a, { path: "/" }, o.a.createElement(g, null))
          )
        );
      };
      Boolean(
        "localhost" === window.location.hostname ||
          "[::1]" === window.location.hostname ||
          window.location.hostname.match(
            /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
          )
      );
      a(155);
      c.a.render(o.a.createElement(M, null), document.getElementById("root")),
        "serviceWorker" in navigator &&
          navigator.serviceWorker.ready.then(function(e) {
            e.unregister();
          });
    },
    69: function(e, t, a) {
      e.exports = a.p + "static/media/master_plan.0b57a90c.svg";
    },
    77: function(e, t, a) {
      e.exports = a.p + "static/media/kanban.bf4f0317.png";
    },
    89: function(e, t, a) {
      e.exports = a(156);
    },
    94: function(e, t, a) {}
  },
  [[89, 1, 2]]
]);
//# sourceMappingURL=main.79fed88b.chunk.js.map
