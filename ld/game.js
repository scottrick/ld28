//LD28
//Scott Atkins
//December 2013

var canvasInset = 8;

var documentWidth = window.innerWidth;
var documentHeight = window.innerHeight;

if (documentWidth === undefined) {
	documentWidth = 1024;
}
if (documentHeight === undefined) {
	documentHeight = 768;
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
}, false);

addEventListener("keyup", function (e) {
		delete keysDown[e.keyCode];
}, false);

var Game = { };

Game.fps = 30;
Game.paused = false;

Game.togglePause = function() {
	Game.paused = !Game.paused;
}

Game.run = (function() {
		var loops = 0, skipTicks = 1000 / Game.fps,
		maxFrameSkip = 10,
		nextGameTick = (new Date).getTime(),
		lastGameTick;
		
		return function() {
			loops = 0;
			
			while ((new Date).getTime() > nextGameTick) {
				Game.update();
				nextGameTick += skipTicks;
				loops++;
			}		
			
			if (!loops) {
				Game.draw((nextGameTick - (new Date).getTime()) / skipTicks);
			} else {
				Game.draw(0);
			}
		};
})();

Game.draw = function() {
	context.clearRect(0, 0, canvas.width, canvas.height);
	
	context.fillStyle = "#b00"
	context.fillRect(0, 0, canvas.width, canvas.height);
};

Game.update = function() { 
	if (Game.paused) {
		return;
	}

	var deltaTime = 1 / Game.fps;
};

//start the loop!
Game._intervalId = setInterval(Game.run, 0);
