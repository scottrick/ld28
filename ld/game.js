//LD28
//Scott Atkins
//December 2013

var documentWidth = window.innerWidth;
var documentHeight = window.innerHeight;

var gameWidth = 800;
var gameHeight = 600;

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

//state variables
var keysDown = {};

addEventListener("keydown", function (e) {
		keysDown[e.keyCode] = true;
		Game.handleKeyDown(e.keyCode);
}, false);

addEventListener("keyup", function (e) {
		delete keysDown[e.keyCode];
		Game.handleKeyUp(e.keyCode);
}, false);

var Game = { };

Game.fps = 30; //number of redraws / game state updates a second
Game.paused = false;
Game.slowMotion = false;
Game.slowMotionFactor = 5.0;
Game.time = 0.0;
Game.scene = null;

Game.togglePause = function() {
	this.paused = !this.paused;
}

Game.toggleSlowMotion = function() {
	this.slowMotion = !this.slowMotion;
}

Game.run = (function() {
		var ticksPerUpdate = 1000 / Game.fps;
		var nextGameTick = (new Date).getTime() + ticksPerUpdate;
		
		return function() {
			while ((new Date).getTime() > nextGameTick) {
				nextGameTick += ticksPerUpdate;

				Game.update();
				Game.draw();
			}		
		};
})();

Game.draw = function() {
	// context.clearRect(0, 0, context.canvas.width, context.canvas.height);
	
	context.fillStyle = "#000"
	context.fillRect(0, 0, context.canvas.width, context.canvas.height);

	// context.drawImage(image, 0, 0, image.width, image.height, 0, 0, 400, 300);

	context.font = "24px Arial";
	context.fillStyle = "#aaa"
	context.fillText("" + this.time.toFixed(2), 24, 48);

	this.scene.draw(context);
};

Game.update = function() { 
	if (this.paused) {
		return;
	}

	var deltaTime = 1 / Game.fps;

	if (this.slowMotion) {
		deltaTime = deltaTime / this.slowMotionFactor;
	}

	this.time += deltaTime;

	this.scene.update(deltaTime);
};

Game.handleKeyDown = function(key) {

}

Game.handleKeyUp = function(key) {
	if (key == 32) { // spacebar
		Game.togglePause();
	}

	if (key == 83) { //  s
		Game.toggleSlowMotion();
	}
}

var theImages = new Images(document);

//setup the initial game scene
Game.scene = new Scene("TestScene");

for (var i = 0; i < 40; i++) {
	var star = new Star(new Vector(i * 20, i * 2));
	Game.scene.addObject(star);
}

for (var i = 0; i < 40; i++) {
	var cannonball = new Cannonball(new Vector(i * 20, 600 - i * 2), new Vector((Math.random() - 0.5) * 20, - 50 + (Math.random() - 0.5) * 30));
	Game.scene.addObject(cannonball);
}

var testObject1 = new PointObject(new Vector(0, 0), new Vector(90, 37), 10);
var testObject2 = new PointObject(new Vector(700, 400), new Vector(-123, -41), 40);

Game.scene.addObject(testObject1);
Game.scene.addObject(testObject2);

Game.scene.getInfo();

// var audio = document.getElementById("audioId");
// audio.play();

//start the loop!
Game._intervalId = setInterval(Game.run, 0);
