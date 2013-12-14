PointObject.prototype = new GameObject();
PointObject.prototype.constructor = GameObject;

function PointObject(position, velocity, radius) {
	GameObject.call(this);

	this.collisionType = COLLISION_TYPE_CIRCLE;

    this.position = position;
    this.previousPosition = position;
    this.velocity = velocity;
    this.radius = radius;
}

PointObject.prototype.update = function(deltaTime, scene) {
	if (this.velocity != null && (this.velocity.x != 0 || this.velocity.y != 0)) {
		this.previousPosition = this.position;

		this.position.x += this.velocity.x * deltaTime;
		this.position.y += this.velocity.y * deltaTime;

		this.didMove = true;
	}
	else {
		this.didMove = false;
	}
};

PointObject.prototype.draw = function(context) {
	var image = this.getImage();

	if (image != null) {
		context.drawImage(image, 0, 0, image.width, image.height, this.position.x - this.radius, this.position.y - this.radius, this.radius * 2, this.radius * 2);
	}
	else {
		context.beginPath();
		context.fillStyle = "#0a0"
		context.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
		context.fill();
	}
};

//Specific point objects should override this with the image they want to use
PointObject.prototype.getImage = function() {
	return null;
}