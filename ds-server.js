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
  response.sendFile(path.join(__dirname, '/static/ds-bootstrap.html'));
});

// Starts the server.
server.listen(PORT, function() {
  console.log('Data sctructures test. Serving at http://localhost:'+PORT);
});

var players = [];
var map = [];
map.push({id:'d1',x:300, y:300});
map.push({id:'d2',x:340, y:340});
map.push({id:'d3',x:500, y:500});

// Add the WebSocket handlers
io.on('connection', function(socket) {
    

    socket.on('map', function(data){
        io.sockets.emit('get-map', map);
    });

  
});
