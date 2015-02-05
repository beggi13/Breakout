// A generic constructor which accepts an arbitrary descriptor object
function Paddle(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
}

Paddle.prototype.halfWidth = 40;
Paddle.prototype.halfHeight = 5;
Paddle.prototype.cy = 450;
Paddle.prototype.points = 0;
Paddle.prototype.angle = 0;

Paddle.prototype.update = function (du) {

    var lEdge = this.cx - this.halfWidth; // left edge of paddle
    var rEdge = this.cx + this.halfWidth; // right edge of paddle
    
    if (g_keys[this.GO_LEFT] && lEdge > 100) {
        this.cx -= 5 * du;
    } 
    else if (g_keys[this.GO_RIGHT] && rEdge < 100 + g_field.width) {
        this.cx += 5 * du;
    }

    // collision line stays the same though
    if (g_keys[this.ROT_RIGHT] && this.angle > -0.15) {
        this.angle -= 0.02;
    } 
    if (g_keys[this.ROT_LEFT] && this.angle < 0.15) {
        this.angle += 0.02;
    }

    this.color = this.myTurn ? this.mainColor : this.transColor;

};


Paddle.prototype.render = function (ctx) {

    ctx.save();
    ctx.fillStyle = this.color;

    ctx.translate(this.cx, this.cy);
    ctx.rotate(this.angle);
    ctx.translate(-this.cx, -this.cy);

    // (cx, cy) is the centre; must offset it for drawing
    ctx.fillRect(this.cx - this.halfWidth,
                 this.cy - this.halfHeight,
                 this.halfWidth * 2,
                 this.halfHeight * 2);

    ctx.restore();

    
};

Paddle.prototype.flakeCollision = function(type){

    switch(g_colors[type]){

        case this.color : if(this.halfWidth <= 60) this.halfWidth += 2;
        break;

        case g_colors[2] : this.points += 5;
        break;

        case g_colors[3] : if(this.halfWidth >= 5) this.points -= 5;
        break;

        case g_colors[type] : this.halfWidth -= 2; // color of the other paddle
        break;
    }
}


Paddle.prototype.collidesWith = function (prevX, prevY, nextX, nextY, r) {
 
    var paddleEdge = this.cy;
    // Check X coords
    if ((nextY - r < paddleEdge && prevY - r >= paddleEdge) ||
        (nextY + r > paddleEdge && prevY + r <= paddleEdge)) {
        // Check Y coords
        if (nextX + r >= this.cx - this.halfWidth &&
            nextX - r <= this.cx + this.halfWidth &&
            this.myTurn) {

            if( r === 5 ){ // if the ball hits
                g_paddle1.myTurn = !g_paddle1.myTurn;
                g_paddle2.myTurn = !g_paddle2.myTurn;
            }
    
            return true;
        }
    }
    // It's a miss!
    return false;
};

Paddle.prototype.changeTurn = function(){
    this.myTurn = !this.myTurn;
}

Paddle.prototype.reset = function(){
    this.halfWidth = 40;
    this.angle = 0;
}