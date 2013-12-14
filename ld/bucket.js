function Bucket(start, size) {
	this.start = start;
	this.size = size;

	this.objects = [];
}

Bucket.prototype.add = function(object) {
	this.objects.push(object);
}

Bucket.prototype.remove = function(object) {
	var index = this.objects.indexOf(object);

	if (index >= 0) {
    	this.objects.splice(index, 1);
	}
}

Bucket.prototype.containsPoint = function(point) {
	return this.containsCircle(point, 0);
}

Bucket.prototype.containsCircle = function(point, radius) {
	if (point.x + radius < this.start.x || this.start.x + this.size.x + radius < point.x) {
		return false;
	}

	if (point.y + radius < this.start.y || this.start.y + this.size.y + radius < point.y) {
		return false;
	}

	return true;
}

Bucket.prototype.containsLine = function(start, end) {

}

Bucket.prototype.draw = function(context) {
	if (this.objects.length > 0) {
		context.strokeStyle = "#0f0";
	}
	else {
		context.strokeStyle = "#020";
	}

	context.strokeRect(this.start.x, this.start.y, this.size.x, this.size.y);
}

Bucket.prototype.checkCollisions = function() {
	var checkCount = 0;

	for (var i = 0; i < this.objects.length; i++) {
		var objectOne = this.objects[i];

		for (var k = i + 1; k < this.objects.length; k++) {
			var objectTwo = this.objects[k];

			if (objectOne.didMove || objectTwo.didMore) {
				this.checkCollision(objectOne, objectTwo);
				checkCount++;
			}
		}
	}

	return checkCount;
}

Bucket.prototype.checkCollision = function(objectOne, objectTwo) {
	if (objectOne.collisionType == COLLISION_TYPE_CIRCLE && objectTwo.collisionType == COLLISION_TYPE_CIRCLE) {
		var xDist = objectOne.position.x - objectTwo.position.x;
		var yDist = objectOne.position.y - objectTwo.position.y;

		var distSquared = xDist * xDist + yDist * yDist;
		var radiusSquared = (objectOne.radius + objectTwo.radius) * (objectOne.radius + objectTwo.radius);

		if (distSquared < radiusSquared) {
			//there was a collision

			var d = Math.sqrt(distSquared);

			if (d < objectOne.radius - objectTwo.radius) {
				//circle inside the other
				return;
			}

			if (d == 0 && objectOne.radius == objectTwo.radius) {
				//circles are identical!
				return;
			}

			// a = (r02 - r12 + d2 ) / (2 d)
			var a = (objectOne.radius * objectOne.radius - objectTwo.radius * objectTwo.radius + distSquared) / (2 * d);

			var collisionX = objectOne.position.x + a * (objectTwo.position.x - objectOne.position.x) / d;
			var collisionY = objectOne.position.y + a * (objectTwo.position.y - objectOne.position.y) / d;

			var collisionPoint = new Vector(collisionX, collisionY);

			objectOne.collide(objectTwo, collisionPoint);
			objectTwo.collide(objectOne, collisionPoint);
		}
		else {
			//no collision!
			return;
		}
	}
}
