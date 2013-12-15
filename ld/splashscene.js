SplashScene.prototype = new Scene();
SplashScene.prototype.constructor = Scene;

function SplashScene() {
	Scene.call(this, "SplashScene");

	this.loadData(splashData);
}

SplashScene.prototype.draw = function(context) {
	Scene.prototype.draw.call(this, context);

	context.save();

	var startY = 380;
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
	context.fillText("[press spacebar]", 400, 600 - 48 - 4);

	context.restore();
}