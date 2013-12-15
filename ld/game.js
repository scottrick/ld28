//LD28
//Scott Atkins
//December 2013

var documentWidth = window.innerWidth;
var documentHeight = window.innerHeight;

var gameWidth = 800;
var gameHeight = 600;

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var theImages = new Images(document);

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

Game.updatesPerSecond = 120;
Game.drawsPerSecond = 30;
Game.paused = false;
Game.slowMotion = false;
Game.slowMotionFactor = 5.0;
Game.time = 0.0;
Game.scene = null;
Game.levels = [];

Game.togglePause = function() {
	this.paused = !this.paused;
}

Game.toggleSlowMotion = function() {
	this.slowMotion = !this.slowMotion;
}

Game.run = (function() {
		var ticksPerUpdate = 1000 / Game.updatesPerSecond;
		var ticksPerRedraw = 1000 / Game.drawsPerSecond;
		var nextGameUpdateTick = (new Date).getTime() + ticksPerUpdate;
		var nextGameRedrawTick = nextGameUpdateTick;
		
		return function() {
			while ((new Date).getTime() > nextGameUpdateTick) {
				nextGameUpdateTick += ticksPerUpdate;

				Game.update();

				if (nextGameUpdateTick > nextGameRedrawTick) {
					Game.draw();
					nextGameRedrawTick += ticksPerRedraw;
				}
			}		
		};
})();

Game.draw = function() {
	context.fillStyle = "#000"
	context.fillRect(0, 0, context.canvas.width, context.canvas.height);

	this.scene.draw(context);
};

Game.update = function() { 
	if (this.paused) {
		return;
	}

	var deltaTime = 1 / Game.updatesPerSecond;

	if (this.slowMotion) {
		deltaTime = deltaTime / this.slowMotionFactor;
	}

	this.time += deltaTime;

	this.scene.update(deltaTime);
};

Game.handleKeyDown = function(key) {
	Game.scene.handleKeyDown(key);
}

Game.handleKeyUp = function(key) {
	Game.scene.handleKeyUp(key);

	// if (key == 32) { // spacebar
	// 	Game.togglePause();
	// }

	// if (key == 83) { //  s
	// 	Game.toggleSlowMotion();
	// }

	// if (key == 66) { //  b
	// 	if (Game.scene.DEBUG_DRAW != null) {
	// 		Game.scene.DEBUG_DRAW = !Game.scene.DEBUG_DRAW;
	// 	}
	// }
}

Game.reset = function() {
	this.scene = null;

	Game.setupLevels();
	Game.nextLevel();
}

Game.setupLevels = function() {
	this.levels = [];
	this.levels.push(new SplashScene());
	this.levels.push(new GameScene("LevelOne", levelOneData));
	this.levels.push(new GameScene("LevelTwo", levelTwoData));
	this.levels.push(new GameScene("LevelThree", levelThreeData));
	this.levels.push(new GameScene("LevelFour", levelFourData));
	this.levels.push(new VictoryScene());
}

Game.nextLevel = function() {
	var currentLevelIndex = this.levels.indexOf(this.scene);

	if (currentLevelIndex == null) {
		//start them on the first level
		this.scene = this.levels[0];
	}
	else {
		currentLevelIndex++;

		if (currentLevelIndex < this.levels.length) {
			this.scene = this.levels[currentLevelIndex];
		}
		else {
			//were on the last level!  Game over here...
			this.reset();
		}
	}
}

// var spacing = 24;
// for (var x = 0; x < 33; x++) {
// 	for (var y = 0; y < 25; y++) {
// 		var star = new Star(new Vector(16 + x * spacing, 12 + y * spacing));
// 		Game.scene.addObject(star);
// 	}
// }

// for (var i = 0; i < 5; i++) {
// 	var cannonball = new Cannonball(new Vector(50 + i * 120, 580 - i * 2), new Vector((Math.random() - 0.5) * 200, - 100 + (Math.random() - 0.5) * 200));
// 	Game.scene.addObject(cannonball);
// }

// var star = new Star(new Vector(400, 300));
// Game.scene.addObject(star);
// star.explode();


// for (var i = 0; i < 8; i++) {
// 	var cannonball = new Cannonball(new Vector(i * 100, i * 2), new Vector((Math.random() - 0.5) * 50, 50 + (Math.random() - 0.5) * - 40));
// 	Game.scene.addObject(cannonball);
// }

// var cannonball = new Cannonball(new Vector(100, 500), new Vector(50, -220));
// Game.scene.addObject(cannonball);

//test point objects
// var testObject1 = new PointObject(new Vector(0, 0), new Vector(90, 37), 45);
// var testObject2 = new PointObject(new Vector(700, 400), new Vector(-123, -141), 60);

// Game.scene.addObject(testObject1);
// Game.scene.addObject(testObject2);

// {
// 	var points = [
// 				new Vector(150, 122), 
// 				new Vector(200, 40), 
// 				new Vector(450, 200)];

// 	var testPolygon1 = new PolygonObject(points, "#00f", "#f00");
// 	Game.scene.addObject(testPolygon1);
// }

// {
// 	var points = [
// 				new Vector(400, 200), 
// 				new Vector(500, 300), 
// 				new Vector(400, 400), 
// 				new Vector(300, 300)];

// 	var testPolygon1 = new PolygonObject(points, "#00f", "#f00");
// 	Game.scene.addObject(testPolygon1);
// }

// {
// 	var points = [];

// 	for (var i = 0; i < 4; i++) {
// 		points.push(new Vector(Math.random() * 300 + 10, Math.random() * 300 + 10));
// 	}

// 	var testPolygon1 = new PolygonObject(points, "#00f", "#f00");
// 	Game.scene.addObject(testPolygon1);
// }

// var testRect = new RectangleObject(new Vector(300, 300), new Vector(49, 49), "#666", "#fff");
// Game.scene.addObject(testRect);

// var audio = document.getElementById("audioId");
// audio.play();

Game.reset();

//start the loop!
Game._intervalId = setInterval(Game.run, 0);
