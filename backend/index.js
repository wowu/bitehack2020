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
// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://mongo.grzegorzpach.pl/bitehack";

console.log("Connecting to database...");
// MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     console.log("Connected");

//     var dataFetched = false;
//     // fetching data
//     db.collectionNames(function(err, collections){
//         for(var collection of collections){
//             if(collection === 'rooms'){
//                 console.log('Collection rooms already exists. Fetching data...');
//                 var dbo = db.db("mydb");
//                 dbo.collection("rooms").find({}).toArray(function(err, roomsFromDatabase) {
//                     if (err) throw err;
//                     console.log('Fetching successful');
//                     dataFetched = true;
//                     rooms = roomsFromDatabase
//                 });
//             }
//         }
//         if(!dataFetched) {
//             console.log('Collection rooms doesn\'t exist. Creating one...')
//             dbo.createCollection("rooms", function(err, res) {
//                 if (err) throw err;
//                 console.log("Collection created.");
//                 db.close();
//             });
//         }
//     });
    
//     db.close();
// });


// POST args config
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

function getId(length){
    return crypto.randomBytes(length).toString('hex');
}

app.post('/create-room', function(req, res) {
    var roomTopic = req.body.topic

    var objectToReturn = {}

    res.setHeader('Content-Type', 'application/json');

    objectToReturn.topic = roomTopic

    var newRoomId = getId(5)
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
                    io.to(userInRoom.socketId).emit('newUserConnected', user);
                }
                socket.emit('roomInfo', room);
                return;
            }
        }
        socket.emit('roomNotFound', {})
    })
    socket.on('newIdea', function({roomId, idea}) {
        console.log(`New idea in room ${roomId} - ${idea}`)
        for(var room of rooms){
            if(room.id == roomId) {
                idea = {
                    id: getId(5),
                    idea,
                    score: 0,
                }
                room.ideas.push(idea)

                for(var userInRoom of room.users){
                    io.to(userInRoom.socketId).emit('pushNewIdeaToUsers', idea)
                }
                return;
            }
        }
    });
    socket.on('removeIdea', function({roomId, ideaId}) {
        console.log(`Remove idea in room ${roomId} - ${ideaId}`)
        for(var room of rooms){
            if(room.id == roomId) {
                for(var i = 0;i < room.ideas.length; i++){
                    if(room.ideas[i].id == ideaId){
                        var removedIdea = room.ideas.pop(i)
                        for(var userInRoom of room.users){
                            io.to(userInRoom.socketId).emit('pushDeletedIdeaToUsers', removedIdea);
                        }
                        return;
                    }
                }
            }
        }
    });

    socket.on('disconnect', function() {
        console.log(`User disconnected (${socket.id})`)
        for(var i = 0; i < rooms.length;i++){
            for(var j = 0; j < rooms[i].users.length; j++){
                if(rooms[i].users[j].socketId == socket.id){
                    var deletedUser = rooms[i].users.pop(j)

                    for(var userInRoom in rooms[i].users){
                        io.to(userInRoom.socketId).emit('deleteUser', deletedUser)
                    }
                }
            }
        }
    });
 });

 http.listen(5000, function(){
    console.log('Listening on *:5000');
  });