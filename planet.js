var planetPrototype = {
	mass:1.0, //in kg
	radius:10, //in m
	position:{x:0.0,y:0.0}, // in m
	velocity:{x:0.0,y:0.0} //in m/s
};

module.exports = function (mass, radius, position, velocity) {
	this.mass = mass?mass:planetPrototype.mass;
	this.radius = radius?radius:planetPrototype.radius;
	this.position = position?position:planetPrototype.position;
	this.velocity = velocity?velocity:planetPrototype.velocity;
};
