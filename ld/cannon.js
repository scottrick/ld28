Cannon.prototype = new GameObject();
Cannon.prototype.constructor = GameObject;

function Cannon(position, velocity, radius) {
	GameObject.call(this);

	this.collisionType = COLLISION_TYPE_NONE;

    this.position = new Vector(400, 600);
    this.aimAngle = 90;
    this.minAngle = 20;
    this.maxAngle = 160;

    this.cannonSpeed = 500;
    this.cannonRotateSpeed = 45;

    this.cannonRadius = 32;

    this.shots = 1; // You only get one!
}

Cannon.prototype.fire = function(scene) {
    var xDir = Math.cos(Math.PI / 180 * this.aimAngle);    
    var yDir = -Math.sin(Math.PI / 180 * this.aimAngle);    

    var cannonballRadius = 12;
    var startMultiplier = (cannonballRadius + 0.05) / yDir;

    var startPosition = this.position.copy();
    startPosition.x -= xDir * startMultiplier;
    startPosition.y -= yDir * startMultiplier;

    var speed = new Vector(xDir, yDir);
    speed.normalize();
    speed.x *= this.cannonSpeed;
    speed.y *= this.cannonSpeed;

    var smokeStart = startPosition.copy();
    smokeStart.x -= xDir * startMultiplier * 1;
    smokeStart.y -= yDir * startMultiplier * 2;

    if (this.shots > 0) {
        //firing!
        var cannonball = new Cannonball(startPosition, speed, cannonballRadius);
        scene.addObject(cannonball);

        this.shots--;

        this.makeSmoke(smokeStart, scene, 48, 16);
    }
    else {
        //out of ammunition, misfire!
        this.makeSmoke(smokeStart, scene, 8, 8);
    }
}

Cannon.prototype.update = function(deltaTime, scene) {

};

Cannon.prototype.draw = function(context) {
    var xDir = Math.cos(Math.PI / 180 * this.aimAngle);    
    var yDir = -Math.sin(Math.PI / 180 * this.aimAngle);

    var image = theImages.getCannon();

    context.translate(this.position.x, this.position.y);
    context.rotate(Math.PI / 180 * -(this.aimAngle - 90));

    if (image != null) {
        context.drawImage(image, 0, 0, image.width, image.height, - this.cannonRadius, - this.cannonRadius, this.cannonRadius * 2, this.cannonRadius * 2);
    }
}

Cannon.prototype.makeSmoke = function(startPosition, scene, number, scale) {
    var numSmokes = number;

    for (var i = 0; i < numSmokes; i++) {
        var smokeStart = startPosition.copy();
        smokeStart.x += (Math.random() - 0.5) * scale * 2;
        smokeStart.y += (Math.random() - 0.5) * scale * 2;
        var smoke = new Smoke(smokeStart, scale + Math.random() * scale);

        scene.addObject(smoke);
    }
}

Cannon.prototype.rotateLeft = function(deltaTime) {
    this.aimAngle += this.cannonRotateSpeed * deltaTime;
    if (this.aimAngle > this.maxAngle) {
        this.aimAngle = this.maxAngle;
    }
}

Cannon.prototype.rotateRight = function(deltaTime) {
    this.aimAngle -= this.cannonRotateSpeed * deltaTime;
    if (this.aimAngle < this.minAngle) {
        this.aimAngle = this.minAngle;
    }
}

