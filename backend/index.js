var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

var crypto = require('crypto');
const bodyParser = require("body-parser");

// single room:
// - id
// - ideas
// - topic
// - users
var rooms = []


// database
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://mongo.grzegorzpach.pl/bitehack";

console.log("Connecting to database...");
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    console.log("Connected");

    // fetching initial data
    var dbo = db.db("mydb");
    console.log('Fetching data from database...')
    dbo.collection("rooms").find({}).toArray(function(err, roomsFromDatabase) {
        if (err) throw err;
        console.log('Fetching successful');
        rooms = roomsFromDatabase
    });
    db.close();
});


// POST args config
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());


app.post('/create-room', function(req, res) {
    var roomTopic = req.body.topic

    var objectToReturn = {}

    res.setHeader('Content-Type', 'application/json');

    objectToReturn.topic = roomTopic

    var newRoomId = crypto.randomBytes(20).toString('hex');
    objectToReturn.id = newRoomId
    objectToReturn.users = []
    objectToReturn.ideas = []

    rooms.push(objectToReturn)
    console.log(`Room created ${JSON.stringify(objectToReturn, null, 4)}`)
    res.end(JSON.stringify(objectToReturn));
})

io.on('connection', function(socket) {
    console.log(`New user connected (${socket.id})`)

    socket.on('connectToRoom', function({ roomId, username }) {
        console.log(`User connected to room ${roomId} as ${username}`)

        var user = {
            username: username,
            socketId: socket.id
        }

        for(let room of rooms){
            if(room.id == roomId){
                room.users.push(user);
                for(let userInRoom of room.users){
                    io.to(userInRoom.socketId).emit('newUserConnected', user)
                }
                socket.emit('roomInfo', room)
            }
        }
    })
    socket.on('newIdea', function({roomId, idea}) {
        console.log(`New idea in room ${roomId} - ${idea}`)
        for(var room of rooms){
            if(room.id == roomId) {
                room.ideas.push(idea)

                for(var userInRoom of room.users){
                    io.to(userInRoom.socketId).emit('pushNewIdeaToUsers', idea)
                }
            }
        }
    })

    // socket.on('create', function(room) {
    //     rooms.push(room);
    //     socket.emit('updaterooms', rooms, socket.room);
    // });

    // socket.on('sendchat', function(data) {
    //     io.sockets["in"](socket.room).emit('updatechat', socket.username, data);
    // });

    // socket.on('switchRoom', function(newroom) {
    //     var oldroom;
    //     oldroom = socket.room;
    //     socket.leave(socket.room);
    //     socket.join(newroom);
    //     socket.emit('updatechat', 'SERVER', 'you have connected to ' + newroom);
    //     socket.broadcast.to(oldroom).emit('updatechat', 'SERVER', socket.username + ' has left this room');
    //     socket.room = newroom;
    //     socket.broadcast.to(newroom).emit('updatechat', 'SERVER', socket.username + ' has joined this room');
    //     socket.emit('updaterooms', rooms, newroom);
    // });

    socket.on('disconnect', function() {
        console.log(`User disconnected (${socket.id})`)
        for(var i = 0; i < rooms.length;i++){
            for(var j = 0; j < rooms[i].users.length; j++){
                if(rooms[i].users[j].socketId == socket.id){
                    rooms[i].users.pop(j)

                   
                }
            }
        }
    });
 });

 http.listen(5000, function(){
    console.log('listening on *:5000');
  });