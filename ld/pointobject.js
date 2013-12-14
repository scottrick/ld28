function PointObject (position, velocity) {
	GameObject.call(this);

    this.position = position;
    this.velocity = velocity;
}

PointObject.prototype.update = function(deltaTime) {
	this.position.x += this.velocity.x * deltaTime;
	this.position.y += this.velocity.y * deltaTime;
};

PointObject.prototype.draw = function(context) {
	context.beginPath();
	context.fillStyle = "#0a0"
	context.arc(this.position.x, this.position.y, 8, 0, 2 * Math.PI);
	context.fill();
};