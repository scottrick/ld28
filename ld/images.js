function Images(document) {
	this.star = document.getElementById("starImageId");
	this.cannon = document.getElementById("cannonImageId");
}

Images.prototype.getStar = function() {
	return this.star;
};

Images.prototype.getCannonball = function() {
	return this.cannon;
}