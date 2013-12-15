GameScene.prototype = new Scene();
GameScene.prototype.constructor = Scene;

function GameScene(name, data) {
	Scene.call(this, name);

	this.DEBUG_DRAW = false;

	//setup the buckets
	{
		this.buckets = [];

		var NUM_BUCKETS_X = 20;
		var NUM_BUCKETS_Y = 15;
		var BUCKET_WIDTH = gameWidth / NUM_BUCKETS_X;
		var BUCKET_HEIGHT = gameHeight / NUM_BUCKETS_Y;

		for (var x = 0; x < NUM_BUCKETS_X; x++) {
			for (var y = 0; y < NUM_BUCKETS_Y; y++) {
				var bucket = new Bucket(new Vector(x * BUCKET_WIDTH, y * BUCKET_HEIGHT), new Vector(BUCKET_WIDTH, BUCKET_HEIGHT));
				this.buckets.push(bucket);
			}
		}
	}

	this.loadData(data);

	var boundaries = new RectangleObject(new Vector(0, 0), new Vector(800, 600), null, null);
	boundaries.shouldDraw = false;
	this.addObject(boundaries);
}

GameScene.prototype.update = function(deltaTime, scene) {
	Scene.prototype.update.call(this, deltaTime, scene);

	this.checkCollisions();
}

GameScene.prototype.draw = function(context) {
	Scene.prototype.draw.call(this, context);

	if (!this.DEBUG_DRAW) {
		return;
	}

	for (var i = 0; i < this.buckets.length; i++) {
		var bucket = this.buckets[i];

		if (bucket.objects.length <= 0) {
			bucket.draw(context);
		}
	}

	for (var i = 0; i < this.buckets.length; i++) {
		var bucket = this.buckets[i];

		if (bucket.objects.length > 0) {
			bucket.draw(context);
		}
	}
}

GameScene.prototype.checkCollisions = function() {
	//update the buckets
	for (var i = 0; i < this.objects.length; i++) {
		var object = this.objects[i];
		if (object.didMove) {
			this.updateBucket(object);			
		}
	}

	var checkCount = 0;

	//check collisions in each bucket!
	for (var i = 0; i < this.buckets.length; i++) {
		var bucket = this.buckets[i];
		checkCount += bucket.checkCollisions();
	}
}

GameScene.prototype.updateBucket = function(object) {
	if (object.collisionType == COLLISION_TYPE_NONE) {
		return;
	}

	this.removeFromBuckets(object);

	for (var i = 0; i < this.buckets.length; i++) {
		var bucket = this.buckets[i];

		var result = false;

		switch (object.collisionType) {
			case COLLISION_TYPE_CIRCLE:
				result = bucket.containsCircle(object.position, object.radius);
				break;

			case COLLISION_TYPE_POINT:
				result = bucket.containsPoint(object.position);
				break;

			case COLLISION_TYPE_POLYGON:
				{
					//first check to see if any of the points are contained in the bucket
					for (var p = 0; p < object.points.length; p++) {
						var point = object.points[p];

						result = bucket.containsPoint(point);

						if (result) {
							break;
						}
					}

					//no points were inside, but still could be in the bucket.  check the line segments themselves!
					for (var p = 0; p < object.points.length; p++) {
						var first = object.points[p];
						var second = object.points[(p + 1) % object.points.length];

						//check against all four edges of the bucket

						//top of bucket
						var intersection = CalculateLineIntersection(
							first.x, 
							first.y, 
							second.x, 
							second.y, 
							bucket.start.x, 
							bucket.start.y, 
							bucket.start.x + bucket.size.x, 
							bucket.start.y);

						if (intersection != null) {
							result = true;
							break;
						}

						//left of bucket
						intersection = CalculateLineIntersection(
							first.x, 
							first.y, 
							second.x,
							second.y,
							bucket.start.x, 
							bucket.start.y, 
							bucket.start.x, 
							bucket.start.y + bucket.size.y);

						if (intersection != null) {
							result = true;
							break;
						}

						//right of bucket
						intersection = CalculateLineIntersection(
							first.x, 
							first.y, 
							second.x, 
							second.y, 
							bucket.start.x + bucket.size.x, 
							bucket.start.y, 
							bucket.start.x + bucket.size.x, 
							bucket.start.y + bucket.size.y);

						if (intersection != null) {
							result = true;
							break;
						}

						//bottom of bucket
						intersection = CalculateLineIntersection(
							first.x, 
							first.y, 
							second.x, 
							second.y, 
							bucket.start.x, 
							bucket.start.y + bucket.size.y, 
							bucket.start.x + bucket.size.x, 
							bucket.start.y + bucket.size.y);

						if (intersection != null) {
							result = true;
							break;
						}
					}
				}

				break;

			default:

				break;
		}

		if (result) {
			bucket.add(object);
		}
	}
}

GameScene.prototype.removeFromBuckets = function(object) {
	for (var i = 0 ; i < this.buckets.length; i++) {
		var bucket = this.buckets[i];
		bucket.remove(object);
	}
}

GameScene.prototype.addObject = function(object) {
	Scene.prototype.addObject.call(this, object);

	//added a new object, so put it in the right bucket!
	this.updateBucket(object);
}

GameScene.prototype.removeObject = function(object) {
	Scene.prototype.removeObject.call(this, object);

	//object removed from scene, so remove it from all buckets as well
	this.removeFromBuckets(object);
}

GameScene.prototype.handleKeyDown = function(key) {
	Scene.prototype.handleKeyDown.call(this, key);
}

GameScene.prototype.handleKeyUp = function(key) {
	Scene.prototype.handleKeyUp.call(this, key);

	switch (key) {
		case 32: 	//spacebar 32
			Game.nextLevel(); //hack for now
			break;
	}
}

