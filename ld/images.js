function Images(document) {
	this.star = document.getElementById("starImageId");
	this.cannonball = document.getElementById("cannonballImageId");
	this.spark = document.getElementById("sparkImageId");
	this.cannon = document.getElementById("cannonImageId");
}

Images.prototype.getStar = function() {
	return this.star;
};

Images.prototype.getCannonball = function() {
	return this.cannonball;
}

Images.prototype.getSpark = function() {
	return this.spark;
}

Images.prototype.getCannon = function() {
	return this.cannon;
}