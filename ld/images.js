function Images(document) {
	this.star = document.getElementById("starImageId");
	this.cannon = document.getElementById("cannonImageId");
	this.spark = document.getElementById("sparkImageId");
}

Images.prototype.getStar = function() {
	return this.star;
};

Images.prototype.getCannonball = function() {
	return this.cannon;
}

Images.prototype.getSpark = function() {
	return this.spark;
}