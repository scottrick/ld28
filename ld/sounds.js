function Sounds(document) {
	this.starSounds = []; 
	this.starSounds.push(document.getElementById("soundStar0"));
	this.starSounds.push(document.getElementById("soundStar1"));
	this.starSounds.push(document.getElementById("soundStar2"));
	this.starSounds.push(document.getElementById("soundStar3"));
	this.starSounds.push(document.getElementById("soundStar4"));
	this.starSounds.push(document.getElementById("soundStar5"));
	this.starSounds.push(document.getElementById("soundStar6"));
	this.starSounds.push(document.getElementById("soundStar7"));
	this.starSounds.push(document.getElementById("soundStar8"));
	this.starSounds.push(document.getElementById("soundStar9"));
	this.starSoundIndex = 0;
}

Sounds.prototype.getNextStarSound = function() {
	var currentIndex = this.starSoundIndex;

	this.starSoundIndex = (this.starSoundIndex + 1) % this.starSounds.length;

	return this.starSounds[currentIndex];
};

