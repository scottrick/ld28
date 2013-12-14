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