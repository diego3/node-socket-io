var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');
var app = express();
var server = http.Server(app);
var io = socketIO(server);

app.set('port', 8080);
app.use('/static', express.static(__dirname + '/static'));
// Routing
app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, 'index.html'));
});
// Starts the server.
server.listen(8080, function() {
  console.log('Starting server on port 8080, http://localhost:8080');
});

var players = [];

// Add the WebSocket handlers
io.on('connection', function(socket) {
    socket.on('new-player', (data) => {
        console.log('new-player', socket.id);
        players[socket.id] = {
          x : 300,
          y : 300
        }
    });

    socket.on('click', function(data){
        console.log('click-server', data);
    });
  
    socket.on('movement', (data) => {
      var player = players[socket.id] || {};
      if (data.left) {
        player.x -= 5;
      }
      if (data.up) {
        player.y -= 5;
      }
      if (data.right) {
        player.x += 5;
      }
      if (data.down) {
        player.y += 5;
      }
      console.log('movement', player);
    })
});

setInterval(function() {
  io.sockets.emit('message', 'hi!');
}, 1000);

setInterval(function() {
  io.sockets.emit('state', players);
}, 1000 / 60);