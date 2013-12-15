Spark.prototype = new PointObject();
Spark.prototype.constructor = PointObject;

function Spark(position, velocity, life) {
	PointObject.call(this, position, velocity, 8);

	this.pointType = POINT_TYPE_UNKNOWN;
	this.collisionType = COLLISION_TYPE_NONE;

	this.life = life;
	this.maxLife = life;

	this.rotationSpeed = (Math.random() - 0.5) * 2000;
	this.rotation = Math.random() * 360;
}

Spark.prototype.update = function(deltaTime, scene) {
	PointObject.prototype.update.call(this, deltaTime, scene);

	this.life -= deltaTime;

	this.rotation += this.rotationSpeed * deltaTime;
	this.alpha = 0.8 * this.life / this.maxLife;

	if (this.life <= 0) {
		this.isDead = true;
	}
}

Spark.prototype.getImage = function() {
	return theImages.getSpark();
}