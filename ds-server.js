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

var dict_index = [];
dict_index.push({id:'d1',x:300, y:300});
dict_index.push({id:'d2',x:340, y:340});
dict_index.push({id:'d3',x:500, y:500});

var map = new Map();
map.set('d1',{x:100, y:100});
map.set('d2',{x:200, y:200});
map.set('d3',{x:300, y:300});

var players = {};
players['d1'] = {x:100, y:100};
players['d2'] = {x:200, y:200};
players['d3'] = {x:300, y:300};
console.log('players', players);

// Add the WebSocket handlers
io.on('connection', function(socket) {

    socket.on('map', function(data){
        io.sockets.emit('get-map', map);
    });

    socket.on('dict1', function(data){
        io.sockets.emit('get-dict1', dict_index);
    });

    socket.on('dict2', function(data){
        io.sockets.emit('get-dict2', players);// não chega no cliente 
        //console.log(send);
    });

  
});
