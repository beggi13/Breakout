
function Wall(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
}


Wall.prototype.render = function (ctx){

	for(var X = 0; X < this.bricks[0].length; X++){

		for(var Y = 0; Y < this.bricks.length; Y++){

			if(this.bricks[Y][X] >= 0){
				// 40 = brick width, 20 = brick height
				fillBox(ctx, this.xPos + X * 40, this.yPos + Y * 20, 40-1, 20-1, g_colors[ this.bricks[Y][X] ]);
			}
		}
	}
}

intercept = function(x1, y1, x2, y2, x3, y3, x4, y4) {
  var denom = ((y4-y3) * (x2-x1)) - ((x4-x3) * (y2-y1));
  if (denom != 0) {
    var ua = (((x4-x3) * (y1-y3)) - ((y4-y3) * (x1-x3))) / denom;
    if ((ua >= 0) && (ua <= 1)) {
      var ub = (((x2-x1) * (y1-y3)) - ((y2-y1) * (x1-x3))) / denom;
      if ((ub >= 0) && (ub <= 1)) {
       
        return true; // hit
      }
    }
  }
  return false;
}


Wall.prototype.collidesWithBrick = function (prevX, prevY, nextX, nextY) {

	var coll = [false, false];

	for(var X = 0; X < this.bricks[0].length; X++){

		for(var Y = 0; Y < this.bricks.length; Y++){

			var topY = this.yPos + (Y * 20);
			var bottomY = this.yPos + (Y * 20) + 20;
			var leftX = this.xPos + (X * 40);
			var rightX = this.xPos + (X * 40) + 40;

			var bottom = 		intercept(prevX, prevY, nextX, nextY, 	leftX, bottomY, rightX, bottomY);
			var top = 			intercept(prevX, prevY, nextX, nextY, 	leftX, topY, rightX, topY);
			var left = 			intercept(prevX, prevY, nextX, nextY, 	leftX, topY, leftX, bottomY);
			var right = 		intercept(prevX, prevY, nextX, nextY, 	rightX, topY, rightX, bottomY);

			if((bottom || top || left || right) && this.bricks[Y][X] >= 0){
				
				if(bottom || top){
					coll[1] = true;
				}
				if(left || right){
					coll[0] = true;
				}

				flake(leftX + 20, bottomY, this.bricks[Y][X]);
				this.bricks[Y][X] = -1;
				this.bricksLeft--;

			}
			// ugly, but this fixes the angle transformation a bit, still not perfect
			if(!(prevX > leftX && prevX < rightX && prevY > bottomY && prevY < topY)){
				if(prevX > leftX && prevX < rightX){
					coll[0] = false;
				}
				if(prevY > bottomY && prevY < topY){
					coll[1] = false;
				}
			}
		}
	}
	return coll;
}

var GAMEOVER = false;

Wall.prototype.update = function(du){

	this.bricksLeft = 0;
	for(var X = 0; X < this.bricks[0].length; X++){
		for(var Y = 0; Y < this.bricks.length; Y++){
			if(this.bricks[Y][X] >= 0){
				this.bricksLeft++;
			}
		}
	}
	console.log(this.bricksLeft);

	if(this.bricksLeft <= this.beginRotateRight){
		ROTATION = Math.PI * -0.001;
	}
	if(this.bricksLeft <= this.beginRotateLeft){
		ROTATION = Math.PI * 0.001;
	}

	if(this.bricksLeft <= 0){
		
		if(g_levels[this.nextLevel]){
			g_wall = g_levels[this.nextLevel];
			g_field.reset();
			g_ball.reset();
		}
		else{
			GAMEOVER = true;
		}
		g_paddle1.reset();
		g_paddle2.reset();
	}
}
