VictoryScene.prototype = new Scene();
VictoryScene.prototype.constructor = Scene;

function VictoryScene() {
	Scene.call(this, "VictoryScene");

	this.loadData(victoryData);

	this.ending = false;
	this.life = 2;

	this.explodeCount = 2;
	this.explodeDelay = 0.02;
	this.nextExplode = 0;

	this.textAlpha = 1;
	this.textAlphaFadeSpeed = 2; //in seconds

	this.stars = [];
	for (var i = 0; i < this.objects.length; i++) {
		this.stars.push(this.objects[i]);
	}
}

VictoryScene.prototype.update = function(deltaTime, scene) {
	Scene.prototype.update.call(this, deltaTime, scene);

	if (this.ending) {
		this.textAlpha -= 1 / this.textAlphaFadeSpeed * deltaTime;

		this.nextExplode -= deltaTime;

		if (this.stars.length > 0 && this.nextExplode <= 0) {
			this.nextExplode = this.explodeDelay;

			for (var i = 0; i < this.explodeCount; i++) {
				if (this.stars.length <= 0) {
					break;
				}

				var index = Math.floor(Math.random() * this.stars.length);
				this.stars[index].explode();
		    	this.stars.splice(index, 1);
			}
		}

		this.life -= deltaTime;
		if (this.life <= 0) {
			//we are dead...  launch level 1
			Game.reset();
		}
	}
}

VictoryScene.prototype.draw = function(context) {
	Scene.prototype.draw.call(this, context);

	context.save();

	if (this.textAlpha > 0) {
		context.globalAlpha = this.textAlpha;

		var startY = 240 ;
		var spacingY = 48;

		context.font = "48px Courier New";
		context.fillStyle = "#ff0";

		context.textAlign = "center";
		context.fillText("You shot all the stars!", 400, startY);
		startY += spacingY;

		context.font = "32px Courier New";
		context.textAlign = "center";
		context.fillText("Thanks for playing.", 400, startY);
		startY += spacingY;

		context.font = "48px Courier New";
		context.fillStyle = "#ff0";

		context.textAlign = "center";
		context.fillText("[spacebar to reset]", 400, 440);	

		context.font = "17px Courier New";
		context.textAlign = "center";
		context.fillText("Written by Scott Atkins (https://github.com/scottrick) for Ludum Dare 28.", 400, 600 - 4 - 24);
	}

	context.restore();
}

VictoryScene.prototype.handleKeyDown = function(key) {
	Scene.prototype.handleKeyDown.call(this, key);
}

VictoryScene.prototype.handleKeyUp = function(key) {
	Scene.prototype.handleKeyUp.call(this, key);

	switch (key) {
		case 32: 	//spacebar 32
			this.ending = true;
			break;
	}
}

