var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

var osutils=require('os-utils');

server.listen(3000);


app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

app.get('/jquery.js', function (req, res) {
  res.sendfile(__dirname + '/node_modules/Flot/jquery.js');
});

app.get('/jquery.flot.js', function (req, res) {
  res.sendfile(__dirname + '/node_modules/Flot/jquery.flot.js');
});

app.get('/cpumeter.css', function (req, res) {
  res.sendfile(__dirname + '/cpumeter.css');
});

io.sockets.on('connection', function (socket) {
 var stream=setInterval(function(){
  osutils.cpuUsage(function(value){
   socket.emit('cpuchange', { data: value });
  });
 },1000); 
});
