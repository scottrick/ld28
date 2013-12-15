//hack to load different levels

var spacing = 24;

var loadSplash = function(scene) {
	var stars = [
		 ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
		 , 1, 1, 1,  , 1, 1, 1,  ,  , 1,  ,  , 1, 1,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
		 , 1,  ,  ,  ,  , 1,  ,  , 1,  , 1,  , 1,  , 1,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
		 , 1, 1, 1,  ,  , 1,  ,  , 1, 1, 1,  , 1, 1,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
		 ,  ,  , 1,  ,  , 1,  ,  , 1,  , 1,  , 1,  , 1,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
		 , 1, 1, 1,  ,  , 1,  ,  , 1,  , 1,  , 1,  , 1,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
		 ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 
		 ,  ,  ,  ,  , 1, 1, 1,  ,  , 1,  ,  , 1,  ,  , 1,  , 1,  ,  , 1,  , 1, 1, 1, 1,  , 1,  ,  , 1,  ,
		 ,  ,  ,  ,  , 1,  ,  ,  , 1,  , 1,  , 1, 1,  , 1,  , 1, 1,  , 1,  , 1,  ,  , 1,  , 1, 1,  , 1,  ,
		 ,  ,  ,  ,  , 1,  ,  ,  , 1, 1, 1,  , 1, 1, 1, 1,  , 1, 1, 1, 1,  , 1,  ,  , 1,  , 1, 1, 1, 1,  ,
		 ,  ,  ,  ,  , 1,  ,  ,  , 1,  , 1,  , 1,  , 1, 1,  , 1,  , 1, 1,  , 1,  ,  , 1,  , 1,  , 1, 1,  ,
		 ,  ,  ,  ,  , 1, 1, 1,  , 1,  , 1,  , 1,  ,  , 1,  , 1,  ,  , 1,  , 1, 1, 1, 1,  , 1,  ,  , 1,  ,
		 ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
		 ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
		 ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
		 ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
		 ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
		 ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
		 ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
		 ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
		 ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
		 ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
		 ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
		 ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
		 ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
	];

	for (var i = 0; i < stars.length; i++) {
		var value = stars[i];

		if (value == null) {
			continue;
		}

		var xPos = i % 33;
		var yPos = Math.floor(i / 33);

		switch (value) {
			case 1:
			{
				//its a star!  so add it to the scene...
				var star = new Star(new Vector(16 + xPos * spacing, 12 + yPos * spacing));
				scene.addObject(star);
			}
				break;
		}
	}
}