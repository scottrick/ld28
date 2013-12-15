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
		deadObjects[i].onDeath();
	}

	this.dumpTimer += deltaTime;
	if (this.dumpTimer >= 1) {
		this.dumpTimer -= 1;
		this.getInfo();
	}
};

Scene.prototype.draw = function(context) {
	for (var i = 0; i < this.objects.length; i++) {
		if (this.objects[i].shouldDraw) {
			context.save();
			this.objects[i].draw(context);
			context.restore();
		}	
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

Scene.prototype.loadData = function(data) {
	var spacing = 24;

	for (var i = 0; i < data.length; i++) {
		var value = data[i];

		if (value == null) {
			continue;
		}

		var xPos = i % 33;
		var yPos = Math.floor(i / 33);

		switch (value) {
			case 1:
			{ //its a star!  so add it to the scene...
				var star = new Star(new Vector(16 + xPos * spacing, 12 + yPos * spacing));
				this.addObject(star);
			}
				break;
		}
	}
}

