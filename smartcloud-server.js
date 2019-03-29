var express  = require('express');
var http     = require('http');
var path     = require('path');
var socketIO = require('socket.io');
var app      = express();
var server   = http.Server(app);
var io       = socketIO(server);

var OPENSHIFT_PORT = 8080;

app.set('port', OPENSHIFT_PORT);
app.use('/static', express.static(__dirname + '/static'));
// Routing
app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, 'index.html'));
});
// Starts the server.
server.listen(OPENSHIFT_PORT, function() {
  console.log('Starting server on port '+OPENSHIFT_PORT);
});

var users = [];

// Add the WebSocket handlers
io.on('connection', function(socket) {
    socket.on('new-user', (userId) => {
        console.log('new-user', socket.id);
        users[socket.id] = {
            id: userId
        }
        io.sockets.emit('logged-users', users);
    });
  
    socket.on('disconnect', (reason) => {
        io.sockets.emit('user-exit', socket.id);
        delete users[socket.id];
    });
});

setInterval(function() {
  io.sockets.emit('message', 'hi!');
}, 1000);