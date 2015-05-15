//each vector is expected to have an x and y value
//


/*
 *	Returns an absolute value representing the distance between the objects
 */
exports.getDistance = function(v1, v2) {
	return Math.sqrt(
			Math.pow(Math.abs(v1.x-v2.x), 2) + Math.pow(Math.abs(v1.y-v2.y), 2)
			);
};

/*
 * Returns vector with x and y containing values from -1 to 1 representing the relative magnitude of each axis
 * The returned direction is from v1 to v2
 */	
exports.getDirections = function(v1, v2) {
	var theta = Math.acos((v2.x-v1.x)/exports.getDistance(v1,v2));
	return {
		x: Math.abs(Math.cos(theta)) * ((v2.x > v1.x)?1:-1), 
		y: Math.abs(Math.sin(theta)) * ((v2.y > v1.y)?1:-1)
	};
};
