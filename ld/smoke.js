Smoke.prototype = new PointObject();
Smoke.prototype.constructor = PointObject;

function Smoke(position, radius) {
	var v = new Vector((Math.random() - 0.5) * 10, - 50 - Math.random() * - 50);

	PointObject.call(this, position, v, radius);

	this.pointType = POINT_TYPE_UNKNOWN;
	this.collisionType = COLLISION_TYPE_NONE;

	this.life = 4 + Math.random() * 1.5;
	this.maxLife = this.life;

	this.rotationSpeed = (Math.random() - 0.5) * 100;
	this.rotation = Math.random() * 360;

	this.wind = new Vector(20 + Math.random() * 10, 0);
}

Smoke.prototype.update = function(deltaTime, scene) {
	if (this.velocity != null && (this.velocity.x != 0 || this.velocity.y != 0)) {
		this.previousPosition = this.position;
		this.previousVelocity = this.velocity;

		this.position.x += this.velocity.x * deltaTime;
		this.position.y += this.velocity.y * deltaTime;

		this.velocity.x += this.wind.x * deltaTime;
		this.velocity.y += this.wind.y * deltaTime;

		this.didMove = true;
	}
	else {
		this.didMove = false;
	}



	this.life -= deltaTime;

	this.rotation += this.rotationSpeed * deltaTime;
	this.alpha = 0.4 * this.life / this.maxLife;

	if (this.life <= 0) {
		this.isDead = true;
	}
}

Smoke.prototype.getImage = function() {
	return theImages.getSmoke();
}