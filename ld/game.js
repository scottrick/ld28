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
var theSounds = new Sounds(document);

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
Game.currentMusic = null;
Game.previousMusic = null;

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

	var levelOne = new GameScene("LevelOne", levelOneData, levelOnePolys);
	levelOne.showHelp();

	this.levels.push(levelOne);
	this.levels.push(new GameScene("LevelTwo", levelTwoData, levelTwoPolys));
	this.levels.push(new GameScene("LevelThree", levelThreeData, levelThreePolys));
	this.levels.push(new GameScene("LevelFour", levelFourData, levelFourPolys));
	this.levels.push(new VictoryScene());
}

Game.nextLevel = function() {
	var currentLevelIndex = this.levels.indexOf(this.scene);

	if (currentLevelIndex == null) {
		//start them on the first level
		this.scene = this.levels[0];
		this.setMusic(this.scene.getMusic());
	}
	else {
		currentLevelIndex++;

		if (currentLevelIndex < this.levels.length) {
			this.scene = this.levels[currentLevelIndex];
			this.setMusic(this.scene.getMusic());
		}
		else {
			//were on the last level!  Game over here...
			this.reset();
		}
	}
}

Game.setMusic = function(music) {
	if (Game.currentMusic == music) {
		return;
	}

	if (Game.currentMusic != null) {
		var fadeOutMusic = Game.currentMusic;
		var interval = 50

		var fadeout = setInterval(
		  	function() {
			    var newVolume = fadeOutMusic.volume - 0.06;
			    if (newVolume <= 0) {
			    	newVolume = 0;
			    	fadeOutMusic.pause();
			    	fadeOutMusic.currentTime = 0;
					clearInterval(fadeout);
			    }

				fadeOutMusic.volume = newVolume;
		  }, 
		  interval);
	}

	Game.currentMusic = music;
	Game.currentMusic.volume = 0.8;

	Game.currentMusic.addEventListener('ended', function() {
		if (Game.currentMusic == this) {
		    this.currentTime = 0;
		    this.play();
		}
	}, false);

	Game.currentMusic.play();
}

Game.reset();

//start the loop!
Game._intervalId = setInterval(Game.run, 0);
