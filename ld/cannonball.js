Cannonball.prototype = new PointObject();
Cannonball.prototype.constructor = PointObject;

function Cannonball (position, velocity) {
	PointObject.call(this, position, velocity, 8);;
}

Cannonball.prototype.getImage = function() {
	return theImages.getCannonball();
}


