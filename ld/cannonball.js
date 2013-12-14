Cannonball.prototype = new PointObject();
Cannonball.prototype.constructor = PointObject;

function Cannonball (position, velocity) {
	PointObject.call(this, position, velocity, 8);

	this.life = Math.random() * 9;
	this.shouldReplicate = true;
}

Cannonball.prototype.getImage = function() {
	return theImages.getCannonball();
}

Cannonball.prototype.update = function(deltaTime, scene) {
	PointObject.prototype.update.call(this, deltaTime);

	this.life -= deltaTime;
	if (this.life < 0 && !this.isDead) {
		this.isDead = true;

		if (this.shouldReplicate) {
			for (var i = 0; i < 100; i++) {
				var cannonball = new Cannonball(new Vector(this.position.x, this.position.y), new Vector((Math.random() - 0.5) * 80, (Math.random() - 0.5) * 80));
				cannonball.shouldReplicate = false;
				scene.addObject(cannonball);
			}
		}
	}
};
