var planet = require('./planet.js'); 
var vector = require('./vector.js');
exports.planets = [];
var G = 6.673 * Math.pow(10, -3);


/*
 * Math functions
 *
 */
exports.initialize = function () {
	exports.planets.push(new planet(100, 10, {x:0, y:0},{x:0.0,y:15.0}));
	exports.planets.push(new planet(10000000, 5, {x:-100, y:10}, {x:0.0,y:0.0}));
};

function step(delta) {
	for(var x = 0; x < exports.planets.length; x++) {
		var current = exports.planets[x];
		current.force = getForceVector(x);
		current.velocity.x += (current.force.x/current.mass)*delta;
		current.velocity.y += (current.force.y/current.mass)*delta;
	}

	for(x = 0; x < exports.planets.length; x++) {
		var c = exports.planets[x];
		c.position.x += c.velocity.x*delta;
		c.position.y += c.velocity.y*delta;
	}
}

function getForceVector(planetIndex) {
	var force = {x:0.0,y:0.0};
	var basePlanet = exports.planets[planetIndex];
	for (var x = 0; x < exports.planets.length; x++) {
		if (x == planetIndex) continue;
		
		var scalarForce = G*basePlanet.mass*exports.planets[x].mass;
		scalarForce /= Math.pow(vector.getDistance(
					basePlanet.position, 
					exports.planets[x].position), 
				2);
		var directionVector = vector.getDirections(
				basePlanet.position,
				exports.planets[x].position
				);
		force.x += directionVector.x*scalarForce;
		force.y += directionVector.y*scalarForce;
	}
	return force;
}

/*
 * Game loop logic
 *
 */
var tickRate = 1000/60; //denominator represents FPS
var previousTick = Date.now();

//module wrapper function
exports.setTickRate = function(t) {
	tickRate = t;
};

exports.gameLoop = function () {
	var now = Date.now();
	if (previousTick + tickRate <= now) {
		var delta = (now - previousTick) / 1000;
		previousTick = now;
		step(delta);
	}

	if (Date.now() - previousTick < tickRate - 16) {
		setTimeout(exports.gameLoop);
	} else {
		setImmediate(exports.gameLoop);
	}
};
