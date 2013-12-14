function Scene (type) {
    this.type = type;
    this.objects = new Array();
}

Scene.prototype.update = function(deltaTime) {
	for (var i = 0; i < this.objects.length; i++) {
		this.objects[i].update(deltaTime);
	}
};

Scene.prototype.draw = function(context) {
	for (var i = 0; i < this.objects.length; i++) {
		this.objects[i].draw(context);
	}
}

Scene.prototype.addObject = function(object) {
	this.objects.push(object);
}

Scene.prototype.removeObject = function(object) {
	var index = this.objects.indexOf(object);

	if (index >= 0) {
    	this.objects.splice(index, 1);
	}
}

Scene.prototype.getInfo = function() {
	console.log("Scene [" + this.type + "] has " + this.objects.length + " objects.");;
};

