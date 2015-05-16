var fs = require('fs');
var planetSim = require('./planetSim.js');

var server = require('http').createServer(function(request, response){
	fs.readFile(__dirname + '/client/index.html',
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
	console.log("connected");
	socket.emit('connection', {});
});

setInterval(function() {
	//data contains the planet info and diagnostic info
	var data = {
		planets: planetSim.planets,
		runtimeInfo: [
			"Stepping every " + planetSim.getTickRate() + " seconds.",
			"Total mass: " + planetSim.getTotalMass() + "KG.",
			"Total energy: " + planetSim.getTotalEnergy() + "Joules."
		]
	};
	io.emit('planetPositions', data);
}, 20);

planetSim.initialize();
planetSim.gameLoop();
