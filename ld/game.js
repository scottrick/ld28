//LD28
//Scott Atkins
//December 2013

var canvasInset = 8;

var documentWidth = window.innerWidth;
var documentHeight = window.innerHeight;

if (documentWidth === undefined) {
	documentWidth = 800;
}
if (documentHeight === undefined) {
	documentHeight = 600;
}	

var gameWidth = documentWidth - canvasInset * 2;
var gameHeight = documentHeight - canvasInset * 2;

// console.log("screen " + screen.width + ", " + screen.height);
// console.log("window " + window.innerWidth + ", " + window.innerHeight);

var canvas = document.createElement("canvas");
canvas.style.border = "none";
canvas.width = gameWidth;
canvas.height = gameHeight;
document.body.appendChild(canvas);

// console.log(canvas.style);

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

Game.togglePause = function() {
	Game.paused = !Game.paused;
}

Game.toggleSlowMotion = function() {
	Game.slowMotion = !Game.slowMotion;
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
	context.clearRect(0, 0, canvas.width, canvas.height);
	
	context.fillStyle = "#a00"
	context.fillRect(0, 0, canvas.width, canvas.height);

	context.font = "24px Arial";
	context.fillStyle = "#000"
	context.fillText("" + Game.time.toFixed(2), 24, 48);
};

Game.update = function() { 
	if (Game.paused) {
		return;
	}

	var deltaTime = 1 / Game.fps;

	if (Game.slowMotion) {
		deltaTime = deltaTime / Game.slowMotionFactor;
	}

	Game.time += deltaTime;
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

//start the loop!
Game._intervalId = setInterval(Game.run, 0);
