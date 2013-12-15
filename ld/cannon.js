Cannon.prototype = new GameObject();
Cannon.prototype.constructor = GameObject;

function Cannon(position, velocity, radius) {
	GameObject.call(this);

	this.collisionType = COLLISION_TYPE_NONE;

    this.position = new Vector(400, 600);
    this.aimAngle = 90;
    this.minAngle = 20;
    this.maxAngle = 160;
    this.cannonRotateSpeed = 3;

    this.cannonSpeed = 500;

    this.rotation = 0;
    this.alpha = 1;

    this.shots = 12; // You only get one!
}

Cannon.prototype.fire = function(scene) {
    if (this.shots > 0) {
        //firing!
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

        var cannonball = new Cannonball(startPosition, speed, cannonballRadius);
        scene.addObject(cannonball);

        this.shots--;
    }
    else {
        //can't fire, out of cannonballs...
    }
}

Cannon.prototype.update = function(deltaTime, scene) {

};

Cannon.prototype.draw = function(context) {
    var xDir = Math.cos(Math.PI / 180 * this.aimAngle);    
    var yDir = -Math.sin(Math.PI / 180 * this.aimAngle);    

    context.strokeStyle = "#f0f";
    context.lineWidth = 2;

    context.beginPath();
    context.moveTo(this.position.x, this.position.y);
    context.lineTo(this.position.x + xDir * 40, this.position.y + yDir * 40);
    context.stroke();
}

Cannon.prototype.rotateLeft = function() {
    this.aimAngle += this.cannonRotateSpeed;
    if (this.aimAngle > this.maxAngle) {
        this.aimAngle = this.maxAngle;
    }
}

Cannon.prototype.rotateRight = function() {
    this.aimAngle -= this.cannonRotateSpeed;
    if (this.aimAngle < this.minAngle) {
        this.aimAngle = this.minAngle;
    }
}

