SplashScene.prototype = new Scene();
SplashScene.prototype.constructor = Scene;

function SplashScene() {
	Scene.call(this, "SplashScene");

	this.loadLevelData(splashData);

	this.starting = false;
	this.life = 2;

	this.explodeCount = 3;
	this.explodeDelay = 0.02;
	this.nextExplode = 0;

	this.textOffsetY = 0;
	this.textSpeed = 40;

	this.textAlpha = 1;
	this.textAlphaFadeSpeed = 1; //in seconds
}

SplashScene.prototype.update = function(deltaTime, scene) {
	Scene.prototype.update.call(this, deltaTime, scene);

	if (this.starting) {
		this.textOffsetY += this.textSpeed * deltaTime;
		this.textAlpha -= 1 / this.textAlphaFadeSpeed * deltaTime;

		this.nextExplode -= deltaTime;

		if (this.stars.length > 0 && this.nextExplode <= 0) {
			this.nextExplode = this.explodeDelay;

			for (var i = 0; i < this.explodeCount; i++) {
				if (this.stars.length <= 0) {
					break;
				}

				var index = Math.floor(Math.random() * this.stars.length);
				this.stars[index].explode(false);
		    	this.stars.splice(index, 1);
			}
		}

		this.life -= deltaTime;
		if (this.life <= 0) {
			//we are dead...  launch level 1
			Game.nextLevel();
		}
	}
}

SplashScene.prototype.draw = function(context) {
	Scene.prototype.draw.call(this, context);

	context.save();

	if (this.textAlpha > 0) {
		context.globalAlpha = this.textAlpha;

		var startY = 380 + this.textOffsetY;
		var spacingY = 28;
		context.font = "24px Courier New";
		context.fillStyle = "#ff0"

		context.textAlign = "left"
		context.fillText("You only get one shot,", 28, startY);
		startY += spacingY;

		context.textAlign = "center"
		context.fillText("to collect all the stars,", 400, startY);
		startY += spacingY;

		context.textAlign = "right"
		context.fillText("...so make your shot count!", 800 - 28, startY);
		startY += spacingY;

		context.font = "48px Courier New";
		context.fillStyle = "#ff0"

		context.textAlign = "center"
		context.fillText("[press spacebar]", 400, 600 - 48 - 4 + this.textOffsetY);	
	}

	context.restore();
}

SplashScene.prototype.handleStarsGone = function() {
	Scene.prototype.handleStarsGone.call(this);
}

SplashScene.prototype.handleKeyDown = function(key) {
	Scene.prototype.handleKeyDown.call(this, key);
}

SplashScene.prototype.handleKeyUp = function(key) {
	Scene.prototype.handleKeyUp.call(this, key);

	switch (key) {
		case 32: 	//spacebar 32
			this.starting = true;
			theSounds.getNextStarSound().play();
			break;
	}
}

