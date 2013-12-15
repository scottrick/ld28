Cannonball.prototype = new PointObject();
Cannonball.prototype.constructor = PointObject;

function Cannonball(position, velocity, radius) {
	PointObject.call(this, position, velocity, radius);

	this.pointType = POINT_TYPE_CANNONBALL;

	this.life = Math.random() * 9;
};

Cannonball.prototype.getImage = function() {
	return theImages.getCannonball();
};

Cannonball.prototype.update = function(deltaTime, scene) {
	PointObject.prototype.update.call(this, deltaTime, scene);

	// this.life -= deltaTime;
	if (this.life < 0 && !this.isDead) {
		this.isDead = true;
	}
};
