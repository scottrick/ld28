function Scene(name) {
    this.name = name;
    this.objects = new Array();

    this.dumpTimer = 0;
}

Scene.prototype.update = function(deltaTime) {
	var deadObjects = [];

	for (var i = 0; i < this.objects.length; i++) {
		this.objects[i].update(deltaTime, this);

		if (this.objects[i].isDead) {
			deadObjects.push(this.objects[i]);
		}
	}

	for (var i = 0; i < deadObjects.length; i++) {
		this.removeObject(deadObjects[i]);
	}

	this.dumpTimer += deltaTime;
	if (this.dumpTimer >= 1) {
		this.dumpTimer -= 1;
		this.getInfo();
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
	console.log("Scene [" + this.name + "] has " + this.objects.length + " objects.");;
};

