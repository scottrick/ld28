Star.prototype = new PointObject();
Star.prototype.constructor = PointObject;

function Star(position) {
	PointObject.call(this, position, null, 8);

	this.pointType = POINT_TYPE_STAR;

	this.expiring = false;
	this.expireSpeed = 1;

	this.rotationMax = 15;
	this.starRotationSpeed = 15 + Math.random() * 10;
	this.rotation = Math.random() * this.rotationMax * 2 - this.rotationMax;
}

Star.prototype.update = function(deltaTime, scene) {
	PointObject.prototype.update.call(this, deltaTime, scene);

	if (this.expiring) {
		this.radius -= this.expireSpeed * deltaTime;

		if (this.radius <= 0) {
			this.isDead = true;
		}

		this.rotation -= this.starRotationSpeed * deltaTime * 20;
		this.alpha -= deltaTime;
	}
	else {
		this.rotation += this.starRotationSpeed * deltaTime;

		if (Math.abs(this.rotation) > this.rotationMax) {
			this.starRotationSpeed = -this.starRotationSpeed;
		}
	}
}

Star.prototype.getImage = function() {
	return theImages.getStar();
}

Star.prototype.capture = function() {
	this.expireSpeed = this.radius;
	this.expiring = true;
	this.collisionType = COLLISION_TYPE_NONE;
}


