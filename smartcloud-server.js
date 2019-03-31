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

var users = new Map();

// Add the WebSocket handlers
io.on('connection', function(socket) {
    socket.on('new-user', (userId, userName) => {
        console.log('new-user', socket.id, userName);
        // users[String(socket.id)] = {
        //     id: userId,
        //     name: userName
        // };
        // users.push({
        //     id: userId,
        //     name: userName
        // });
        var user =  {
            id: userId,
            name: userName
        };
        users.set(socket.id, user);
        console.log('users', users);
        io.sockets.emit('logged-users', users);
    });
  
    socket.on('disconnect', (reason) => {
        io.sockets.emit('user-exit', socket.id);
        console.log('user-exit', socket.id);
        //delete users[socket.id];
        users.delete(socket.id);
        console.log('users Map', users);
    });
});

setInterval(function() {
  io.sockets.emit('message', 'hi!');
}, 1000);