PointObject.prototype = new GameObject();
PointObject.prototype.constructor = GameObject;


function PointObject (position, velocity, radius) {
	GameObject.call(this);

    this.position = position;
    this.velocity = velocity;
    this.radius = radius;
}

PointObject.prototype.update = function(deltaTime) {
	if (this.velocity != null) {
		this.position.x += this.velocity.x * deltaTime;
		this.position.y += this.velocity.y * deltaTime;
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

PointObject.prototype.getImage = function() {
	return null;
}