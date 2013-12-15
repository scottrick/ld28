SplashScene.prototype = new Scene();
SplashScene.prototype.constructor = Scene;

function SplashScene() {
	Scene.call(this, "SplashScene");

	loadSplash(this);
}
