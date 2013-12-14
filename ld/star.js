Star.prototype = new PointObject();
Star.prototype.constructor = PointObject;

function Star (position) {
	PointObject.call(this, position, null, 8);;
}

Star.prototype.getImage = function() {
	return theImages.getStar();
}


