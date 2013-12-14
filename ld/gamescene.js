GameScene.prototype = new Scene();
GameScene.prototype.constructor = Scene;

function GameScene(name) {
	Scene.call(this, name);
}

GameScene.prototype.update = function(deltaTime, scene) {
	Scene.prototype.update.call(this, deltaTime, scene);
}
