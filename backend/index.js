var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

var crypto = require('crypto');
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());


var usernames = {};


// room = {'name': 'Room name', 'hash', 'asdfsr4ewfw34dss=='}
var rooms = [];

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.post('/create-room', function(req, res) {
    var roomName = req.body.name

    var objectToReturn = {}

    res.setHeader('Content-Type', 'application/json');

    for(room of rooms){
        if(room.name === roomName){
            objectToReturn.status = 'error'
            objectToReturn.message = 'Room with this name already exists.'
            res.end(JSON.stringify(objectToReturn));
            return
        }
    }
    objectToReturn.name = roomName

    var newRoomID = crypto.randomBytes(20).toString('hex');
    objectToReturn.hash = newRoomID

    rooms.push(objectToReturn)
    res.end(JSON.stringify(objectToReturn));
})

io.on('connection', function(socket) {
    console.log('user connected')

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