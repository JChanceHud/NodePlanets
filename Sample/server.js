var fs = require('fs');
var server = require('http').createServer(function(request, response){
	fs.readFile(__dirname + '/index.html',
		function (err, data) {
			if (err) {
				response.writeHead(500);
				return response.end("Error loading index");
			}
			response.writeHead(200);
			response.end(data);
		});
});
var io = require('socket.io').listen(server);
server.listen(3000);

io.on('connection', function (socket) {
	socket.emit('connection', {});
	console.log("connected");
});
