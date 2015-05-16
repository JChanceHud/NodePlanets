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
	var hypotenuse = exports.getDistance(v1,v2);
	var xTheta = Math.acos((v2.x-v1.x)/hypotenuse);
	var yTheta = Math.asin((v2.y-v1.y)/hypotenuse);
	return {
		x: Math.cos(xTheta), 
		y: Math.sin(yTheta)
	};
};

exports.getMagnitude = function(v1) {
	return Math.sqrt(Math.pow(v1.x, 2) + Math.pow(v1.y, 2));
};
