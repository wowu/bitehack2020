(this.webpackJsonpfrontend = this.webpackJsonpfrontend || []).push([
  [0],
  {
    146: function(e, t) {},
    155: function(e, t, a) {},
    156: function(e, t, a) {},
    157: function(e, t, a) {
      "use strict";
      a.r(t);
      var n = a(0),
        o = a.n(n),
        r = a(13),
        i = a.n(r),
        c = (a(95), a(28)),
        s = a(8),
        d = a(41),
        l = a.n(d),
        m = a(29),
        u = a(80),
        f = a(73),
        h = a.n(f),
        p = a(74),
        v = a.n(p),
        g = function() {
          var e = Object(n.useState)(""),
            t = Object(u.a)(e, 2),
            a = t[0],
            r = t[1],
            i = Object(s.f)();
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
                      return l.a.async(
                        function(r) {
                          for (;;)
                            switch ((r.prev = r.next)) {
                              case 0:
                                return (
                                  e.preventDefault(),
                                  (r.prev = 1),
                                  (r.next = 4),
                                  l.a.awrap(
                                    h.a.post("/create-room", {
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
                                    JSON.stringify([n].concat(Object(m.a)(o)))
                                  ),
                                  i.push("/room/".concat(n)),
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
        E = a(14),
        b = a(15),
        k = a(17),
        w = a(16),
        N = a(18),
        y = a(77),
        x = a.n(y),
        I = a(78),
        O = a(5),
        C = function(e) {
          return document.createElementNS("http://www.w3.org/2000/svg", e);
        },
        j = (window.ms = (function() {
          var e = document.createElement("span");
          return (
            (e.id = "ruler"),
            document.body.append(e),
            function(t) {
              return (e.innerText = t), e.getBoundingClientRect().width;
            }
          );
        })());
      var S = function(e, t) {
          var a = 0,
            n = 0,
            r = 1,
            i = O.a("svg");
          i.node().classList.add("whiteboard"),
            i.attr("width", e),
            i.attr("height", t),
            i.attr("viewBox", [0, 0, e, t]),
            window.addEventListener("resize", function() {
              (e = window.innerWidth),
                i.attr("width", e),
                i.attr("viewBox", [0, 0, e, t]),
                m.attr(
                  "transform",
                  "translate(".concat(e / 2 + a, ", ").concat(t / 2 + n, ")")
                );
            });
          var c = [],
            s = [],
            d = function() {},
            l = O.f(c)
              .force("charge", O.e().strength(-1e3))
              .force("link", O.d(s).distance(200))
              .force("x", O.g())
              .force("y", O.h())
              .alphaTarget(1)
              .on("tick", function() {
                f
                  .attr("transform", function(e) {
                    return "translate(".concat(e.x, ", ").concat(e.y, ")");
                  })
                  .call(
                    O.b()
                      .on("start", function(e) {
                        O.c.active || l.alphaTarget(0.3).restart(),
                          (e.fx = e.x),
                          (e.fy = e.y);
                      })
                      .on("drag", function(e) {
                        (e.fx = O.c.x), (e.fy = O.c.y);
                      })
                      .on("end", function(e) {
                        O.c.active || l.alphaTarget(0),
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
            m = i
              .append("g")
              .attr("transform", "translate(" + e / 2 + "," + t / 2 + ")"),
            u = m
              .append("g")
              .attr("stroke", "#000")
              .attr("stroke-width", 1.5)
              .selectAll(".link"),
            f = m
              .append("g")
              .attr("stroke", "#fff")
              .attr("stroke-width", 1.5)
              .selectAll(".node");
          function h() {
            m.attr(
              "transform",
              "translate("
                .concat(e / 2 + a, ", ")
                .concat(t / 2 + n, "), scale(")
                .concat(r, ")")
            );
          }
          function p() {
            (f = f.data(c, function(e) {
              return e.id;
            }))
              .exit()
              .remove(),
              (f = f
                .enter()
                .append(function(e) {
                  var t = C("g"),
                    a = C("text");
                  a.innerHTML = e.idea;
                  var n = C("rect");
                  return (
                    n.setAttribute("width", j(e.idea) + 12),
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
                .merge(f)),
              (u = u.data(s, function(e) {
                return e.source.id + "-" + e.target.id;
              }))
                .exit()
                .remove(),
              (u = u
                .enter()
                .append("line")
                .merge(u)),
              l.nodes(c),
              l.force("link").links(s),
              l.alpha(1).restart();
          }
          p();
          var v = !1;
          i.node().addEventListener("mousedown", function(e) {
            v = !0;
          }),
            window.addEventListener("mouseup", function(e) {
              v = !1;
            }),
            window.addEventListener("mousemove", function(e) {
              v && ((a += e.movementX), (n += e.movementY), h());
            }),
            i.node().addEventListener("mousewheel", function(e) {
              (r -= e.deltaY / 500), h();
            });
          var g = {
            add: function(e) {
              c.push(e), p();
            },
            remove: function(e) {
              var t = c.findIndex(function(t) {
                return t.id === e.id;
              });
              -1 !== t && (c.splice(t, 1), p());
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
                  return e && e.append(i.node());
                }
              },
              " "
            )
          };
          return g;
        },
        T = a(81),
        L = (function(e) {
          function t(e) {
            var a;
            return (
              Object(E.a)(this, t),
              ((a = Object(k.a)(this, Object(w.a)(t).call(this, e))).iconOn =
                a.props.iconOn),
              (a.iconOff = a.props.iconOff),
              (a.someProps = Object(T.a)({}, e)),
              delete a.someProps.iconOn,
              delete a.someProps.iconOff,
              a
            );
          }
          return (
            Object(N.a)(t, e),
            Object(b.a)(t, [
              {
                key: "render",
                value: function() {
                  return o.a.createElement(
                    "i",
                    Object.assign({}, this.someProps, {
                      className: "toggle-icon ".concat(
                        this.props.value ? this.iconOn : this.iconOff
                      )
                    })
                  );
                }
              }
            ]),
            t
          );
        })(n.Component),
        R = (function(e) {
          function t() {
            var e;
            return (
              Object(E.a)(this, t),
              ((e = Object(k.a)(this, Object(w.a)(t).call(this))).state = {
                liked: !1
              }),
              e
            );
          }
          return (
            Object(N.a)(t, e),
            Object(b.a)(t, [
              {
                key: "onVote",
                value: function() {
                  var e = !this.state.liked;
                  e ? this.props.onUpvote() : this.props.onDownvote(),
                    this.setState({ liked: e });
                }
              },
              {
                key: "render",
                value: function() {
                  var e = this.props,
                    t = e.idea,
                    a = e.master,
                    n = (e.onUpvote, e.mode, e.onRemove);
                  return o.a.createElement(
                    "div",
                    { className: "card mb-2" },
                    o.a.createElement(
                      "div",
                      { className: "card-body " },
                      o.a.createElement(
                        "div",
                        { className: "row" },
                        o.a.createElement(
                          "div",
                          { className: "col-10" },
                          t.idea
                        ),
                        o.a.createElement(
                          "div",
                          { className: "col-2" },
                          t.score
                        ),
                        a && o.a.createElement("button", { onClick: n }, "X"),
                        o.a.createElement(L, {
                          iconOn: "fa fa-heart",
                          iconOff: "far fa-heart",
                          style: { color: "#cc1717" },
                          value: this.state.liked,
                          onClick: this.onVote.bind(this)
                        })
                      )
                    )
                  );
                }
              }
            ]),
            t
          );
        })(n.Component),
        W = a(79),
        B = a.n(W),
        M = (function(e) {
          function t(e) {
            var a;
            Object(E.a)(this, t),
              ((a = Object(k.a)(this, Object(w.a)(t).call(this, e))).roomId =
                e.match.params.id),
              (a.masterOf = JSON.parse(
                window.localStorage.getItem("masterOf")
              )),
              (a.master = a.masterOf && -1 !== a.masterOf.indexOf(a.roomId));
            var n = S(window.innerWidth, window.innerHeight - 200),
              o = n.component,
              r = n.add,
              i = n.remove;
            return (
              (0, n.onNodeRemoved)(function(e) {
                a.removeIdea(e);
              }),
              (a.removeFromWhiteboard = i),
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
              (a.socket = x()("/")),
              a.socket.on("roomInfo", function(e) {
                var t = e.ideas,
                  n = e.topic,
                  o = e.mode;
                a.setState({ ideas: t, topic: n, mode: o, loading: !1 }),
                  t.forEach(a.addToWhiteboard);
              }),
              a.socket.on("pushNewIdeaToUsers", function(e) {
                a.setState({
                  ideas: [].concat(Object(m.a)(a.state.ideas), [e])
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
              a.socket.on("ideaDownvoted", function(e) {
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
                key: "downvote",
                value: function(e) {
                  this.socket.emit("downvoteIdea", {
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
                    i = t.mode,
                    c = t.loading,
                    s = this.master;
                  return o.a.createElement(
                    o.a.Fragment,
                    null,
                    c
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
                                          checked: "insert" === i,
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
                                          checked: "voting" === i,
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
                                          checked: "block" === i,
                                          onChange: this.handleModeChange.bind(
                                            this
                                          )
                                        }),
                                        "Conclusions"
                                      )
                                    )
                                  ),
                                ("voting" === i || (s && "block" === i)) &&
                                  o.a.createElement(
                                    "div",
                                    null,
                                    "voting" === i &&
                                      o.a.createElement(
                                        "h5",
                                        { className: "text-center" },
                                        "Now vote for 3 best ideas"
                                      ),
                                    a.map(function(t) {
                                      return o.a.createElement(R, {
                                        key: t.id,
                                        idea: t,
                                        onRemove: function() {
                                          return e.removeIdea(t);
                                        },
                                        onUpvote: function() {
                                          return e.upvote(t);
                                        },
                                        onDownvote: function() {
                                          return e.downvote(t);
                                        },
                                        mode: i,
                                        master: s
                                      });
                                    })
                                  ),
                                "insert" === i &&
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
                                  "block" === i &&
                                  o.a.createElement(
                                    "div",
                                    {
                                      className:
                                        "mt-5 d-flex flex-column align-items-center"
                                    },
                                    o.a.createElement("img", {
                                      style: { maxWidth: 300, widht: "100%" },
                                      src: B.a
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
                    s && "insert" === i && this.whiteboard
                  );
                }
              }
            ]),
            t
          );
        })(n.Component),
        D = Object(s.g)(M);
      a(155);
      var F = function() {
        return o.a.createElement(
          c.a,
          null,
          o.a.createElement(
            s.c,
            null,
            o.a.createElement(s.a, { path: "/room/:id", component: D }),
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
      a(156);
      i.a.render(o.a.createElement(F, null), document.getElementById("root")),
        "serviceWorker" in navigator &&
          navigator.serviceWorker.ready.then(function(e) {
            e.unregister();
          });
    },
    74: function(e, t, a) {
      e.exports = a.p + "static/media/master_plan.0b57a90c.svg";
    },
    79: function(e, t, a) {
      e.exports = a.p + "static/media/kanban.bf4f0317.png";
    },
    90: function(e, t, a) {
      e.exports = a(157);
    },
    95: function(e, t, a) {}
  },
  [[90, 1, 2]]
]);
//# sourceMappingURL=main.e16ab196.chunk.js.map
