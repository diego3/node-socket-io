var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');
var app = express();
var server = http.Server(app);
var io = socketIO(server);
var PORT = 8181;

app.set('port', PORT);
//app.use('/static', express.static(__dirname + '/static'));
// Routing
app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, '/static/pong.html'));
});

// Starts the server.
server.listen(PORT, function() {
  console.log('Pong serving at http://localhost:'+PORT);
});


var clients = {};
var adversarios = [];

// Add the WebSocket handlers
io.on('connection', function(socket) {

    socket.on('join', (username) => {
        clients[socket.id] = {
           name: username
        };
        console.log('join', socket.id);
        console.log(clients);
        io.sockets.emit('clients', clients);
    });

    socket.on('get-clients', () => {
      io.sockets.emit('clients', clients);
    });

    socket.on('disconnect', () => {
        console.log('exited', socket.id);
        delete clients[socket.id];
        io.sockets.emit('exited', socketd.id);
        io.sockets.emit('clients', clients);
    });
  
});

//  if game started
// setInterval(function() {
//   io.sockets.emit('state', players);
// }, 1000 / 60);


var Pong = {
    playing: false,
    init: function(players) {
        if(players.length < 2) {
          console.log('we need two players');
          return false;
        }


    }

};
