var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');
var app = express();
var server = http.Server(app);
var io = socketIO(server);
var PORT = 8485;

app.set('port', PORT);
//app.use('/static', express.static(__dirname + '/static'));
// Routing
app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, '/static/sheet.html'));
});

// Starts the server.
server.listen(PORT, function() {
  console.log('Sheet serving at http://localhost:'+PORT);
});


function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

var clients = {};
var colors = ['red', 'green', 'blue', 'pink', 'yellow'];

function getRandomColor(){
    var i = randomInt(0, colors.length-1);
    return colors[i];
}

io.on('connect', (socket) =>{
    clients[socket.id] = {
        color: getRandomColor()
     };
     console.log('join', socket.id);
     console.log(clients);
     io.sockets.emit('clients', clients);
});

// Add the WebSocket handlers
io.on('connection', function(socket) {

    // socket.on('connect', (username) => {
    //     // clients[socket.id] = {
    //     //    name: username
    //     // };
    //     // console.log('join', socket.id);
    //     // console.log(clients);
    //     // io.sockets.emit('clients', clients);
    // });

    socket.on('get-clients', () => {
      io.sockets.emit('clients', clients);
    });

    socket.on('disconnect', () => {
        console.log('exited', socket.id);
        delete clients[socket.id];
        io.sockets.emit('exited', socket.id);
        io.sockets.emit('clients', clients);
    });
  
});
