var proxy = require("express-http-proxy");
var express = require("express");
var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

var crypto = require("crypto");
const bodyParser = require("body-parser");
const vote2ideaRatio = 0.3;
const { ceil, min } = Math;

var rooms = [];

// POST args config
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(bodyParser.json());

app.use(express.static("public"));
app.use("/api", proxy("localhost:8000"));

function getId(length) {
  return crypto.randomBytes(length).toString("hex");
}

app.post("/create-room", function(req, res) {
  var roomTopic = req.body.topic;

  var objectToReturn = {};

  res.setHeader("Content-Type", "application/json");

  objectToReturn.topic = roomTopic;

  var newRoomId = getId(5);
  objectToReturn.id = newRoomId;
  objectToReturn.users = [];
  objectToReturn.ideas = [];
  objectToReturn.mode = "insert";

  rooms.push(objectToReturn);
  console.log(`Room created ${JSON.stringify(objectToReturn, null, 4)}`);
  res.end(JSON.stringify(objectToReturn));
});

io.on("connection", function(socket) {
  console.log(`New user connected (${socket.id})`);

  socket.on("connectToRoom", function({ roomId, username }) {
    console.log(`User connected to room ${roomId} as ${username}`);

    var user = {
      username: username,
      socketId: socket.id
    };

    for (let room of rooms) {
      if (room.id == roomId) {
        room.users.push(user);
        for (let userInRoom of room.users) {
          io.to(userInRoom.socketId).emit("newUserConnected", user);
        }
        socket.emit("roomInfo", {
          ...room,
          votesRemaining: min(
            room.ideas.length,
            ceil(room.ideas.length * vote2ideaRatio)
          )
        });
        return;
      }
    }
    socket.emit("roomNotFound", {});
  });

  socket.on("changeTopic", function({ roomId, topic }) {
    console.log(`Changing topic of ${roomId} to ${topic}`);

    for (var room of rooms) {
      if (room.id === roomId) {
        room.topic = topic;
        for (var userInRoom of room.users) {
          io.to(userInRoom.socketId).emit("topicChanged", topic);
        }
        return;
      }
    }
  });
  socket.on("changeRoomMode", function({ roomId, newMode }) {
    console.log(`Changing room (${roomId}) mode to ${newMode}`);

    for (var room of rooms) {
      if (room.id == roomId) {
        room.mode = newMode;

        for (var userInRoom of room.users) {
          if (newMode === "voting") {
            const { ideas } = room;
            io.to(userInRoom.socketId).emit("roomModeChanged", {
              mode: newMode,
              votesRemaining: min(
                ceil(ideas.length * vote2ideaRatio),
                ideas.length
              )
            });
          } else
            io.to(userInRoom.socketId).emit("roomModeChanged", {
              mode: newMode
            });
        }
        return;
      }
    }
  });
  socket.on("clearvotes", ({ roomId }) => {
    for (let v of findRoom(roomId, { ideas: [] }).ideas) {
      v.score = 0;
    }
  });
  socket.on("newIdea", function({ roomId, idea }) {
    console.log(`New idea in room ${roomId} - ${idea}`);
    for (var room of rooms) {
      if (room.id == roomId) {
        idea = {
          id: getId(20),
          idea,
          score: 0
        };

        if (room.ideas.find(x => x.idea === idea.idea)) {
          return;
        }

        room.ideas.push(idea);

        for (var userInRoom of room.users) {
          io.to(userInRoom.socketId).emit("pushNewIdeaToUsers", idea);
        }
        return;
      }
    }
  });
  socket.on("removeIdea", function({ roomId, ideaId }) {
    console.log(`Remove idea in room ${roomId} - ${ideaId}`);
    for (var room of rooms) {
      if (room.id == roomId) {
        for (var i = 0; i < room.ideas.length; i++) {
          if (room.ideas[i].id == ideaId) {
            var removedIdea = room.ideas.splice(i, 1)[0];
            for (var userInRoom of room.users) {
              io.to(userInRoom.socketId).emit(
                "pushDeletedIdeaToUsers",
                removedIdea
              );
            }
            return;
          }
        }
      }
    }
  });

  function scoreIdea(roomId, ideaId, delta, event) {
    for (var room of rooms) {
      if (room.id == roomId) {
        for (var idea of room.ideas) {
          if (idea.id == ideaId) {
            idea.score += delta;

            for (var userInRoom of room.users) {
              io.to(userInRoom.socketId).emit(event, idea);
            }

            return;
          }
        }
      }
    }
  }
  socket.on("upvoteIdea", function({ roomId, ideaId }) {
    scoreIdea(roomId, ideaId, 1, "ideaUpvoted");
    socket.votes += 1;
  });

  socket.on("downvoteIdea", function({ roomId, ideaId }) {
    scoreIdea(roomId, ideaId, -1, "ideaDownvoted");
    socket.votes -= 1;
  });

  const findRoom = (roomId, def = null) =>
    rooms.find(room => room.id === roomId) || def;

  const filterSuggestions = (ideas, suggestions) =>
    suggestions.filter(
      suggestion => !ideas.find(idea => idea.idea == suggestion)
    );

  socket.on("suggest", async ({ roomId, input }) => {
    const ideas = findRoom(roomId, { ideas: [] }).ideas;
    // todo: request do serwera andrzeja
    const suggestions = [
      ...Array.from({ length: (Math.random() * 8) | 0 }, (_, i) => `${i}`)
    ];
    const filtered = filterSuggestions(ideas, suggestions);
    socket.emit("suggestions", filtered);
  });

  socket.on("disconnect", function() {
    console.log(`User disconnected (${socket.id})`);
    for (var i = 0; i < rooms.length; i++) {
      for (var j = 0; j < rooms[i].users.length; j++) {
        if (rooms[i].users[j].socketId == socket.id) {
          var deletedUser = rooms[i].users.splice(j, 1)[0];

          for (var userInRoom in rooms[i].users) {
            io.to(userInRoom.socketId).emit("deleteUser", deletedUser);
          }
        }
      }
    }
  });
});

app.get("*", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

http.listen(5000, function() {
  console.log("Listening on *:5000");
});
