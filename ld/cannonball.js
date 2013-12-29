Cannonball.prototype = new PointObject();
Cannonball.prototype.constructor = PointObject;

function Cannonball(position, velocity, radius) {
	PointObject.call(this, position, velocity, radius);

	this.pointType = POINT_TYPE_CANNONBALL;
	this.removeWhenDead = false;

	this.life = 4; //seconds before it starts slowing down
	this.decaySpeed = 100;
};

Cannonball.prototype.getImage = function() {
	return theImages.getCannonball();
};

Cannonball.prototype.update = function(deltaTime, scene) {
	PointObject.prototype.update.call(this, deltaTime, scene);

	if (this.life > 0) {
		this.life -= deltaTime;
	}
	else {
		//decaying
		if (this.velocity == null) {
			return;
		}

		var speed = this.velocity.distance();
		speed -= this.decaySpeed * deltaTime;
		if (speed < 0) {
			speed = 0;
			this.velocity = null;
		}
		else {
			this.velocity.normalize();

			this.velocity.x *= speed;
			this.velocity.y *= speed;
		}
	}
};
