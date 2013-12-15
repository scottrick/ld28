Star.prototype = new PointObject();
Star.prototype.constructor = PointObject;

function Star(position, radius) {
	PointObject.call(this, position, null, radius);

	this.pointType = POINT_TYPE_STAR;

	this.expiring = false;
	this.expireSpeed = 1;

	this.rotationMax = 15;
	this.starRotationSpeed = 15 + Math.random() * 10;
	this.rotation = Math.random() * this.rotationMax * 2 - this.rotationMax;
};

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
};

Star.prototype.getImage = function() {
	return theImages.getStar();
};

Star.prototype.onDeath = function() {

};

Star.prototype.explode = function() {
	this.expireSpeed = this.radius;
	this.expiring = true;
	this.collisionType = COLLISION_TYPE_NONE;

	this.makeSparks();

	theSounds.getNextStarSound().play();
};

Star.prototype.makeSparks = function() {
	var numSparks = 4 + Math.random(4);
	var sparkRadius = this.radius * 0.8;

	for (var i = 0; i < numSparks; i++) {
		var v = Math.random() * 10 + 50;
		var angle = Math.random() * 360;

		var x = Math.cos(Math.PI * angle / 180) * v;
		var y = Math.sin(Math.PI * angle / 180) * v;

		var life = 0.3 + Math.random() * 0.3;
		var spark = new Spark(this.position.copy(), new Vector(x, y), sparkRadius, life);

		Game.scene.addObject(spark);
	}	
}


