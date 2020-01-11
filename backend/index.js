var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);


// database
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://mongo.grzegorzpach.pl/bitehack";


var crypto = require('crypto');
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());



// room = {'topic': 'Room name', 'id', 'asdfsr4ewfw34dss=='}

// room
// - id
// - ideas
// - topic
// - users

var rooms = [];

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

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
    console.log('room created ', objectToReturn)
    res.end(JSON.stringify(objectToReturn));
})

io.on('connection', function(socket) {
    console.log('new user connected')

    socket.on('connectToRoom', function({ roomId, username }) {
        console.log(`connect to room ${roomId} as ${username}`)
        var user = {
            username: username,
            socketId: socket.id
        }
        for(let room of rooms){
            if(room.hash == roomId){
                room.users.push(user);
                console.log(user)
                for(let userInRoom of room.users){
                    console.log(user)
                    io.to(userInRoom.socketId).emit('newUserConnected', user)
                }
                
                socket.emit('roomInfo', room)
            }
        }
    })
    socket.on('newIdea', function({roomId, idea}) {
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

    // socket.on('disconnect', function() {
    //     delete usernames[socket.username];
    //     io.sockets.emit('updateusers', usernames);
    //     socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
    //     socket.leave(socket.room);
    // });
 });

 http.listen(5000, function(){
    console.log('listening on *:5000');
  });