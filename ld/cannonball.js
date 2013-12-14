Cannonball.prototype = new PointObject();
Cannonball.prototype.constructor = PointObject;

function Cannonball(position, velocity) {
	PointObject.call(this, position, velocity, 8);

	this.life = Math.random() * 9;
}

Cannonball.prototype.getImage = function() {
	return theImages.getCannonball();
}

Cannonball.prototype.update = function(deltaTime, scene) {
	PointObject.prototype.update.call(this, deltaTime);

	// this.life -= deltaTime;
	if (this.life < 0 && !this.isDead) {
		this.isDead = true;
	}
};
