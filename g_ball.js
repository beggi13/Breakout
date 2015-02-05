// ==========
// BALL STUFF
// ==========

// BALL STUFF

var g_ball = {
    cx: 300,
    cy: 300,
    radius: 5,

    xVel: 5,
    yVel: 4
};

g_ball.update = function (du) {
    // Remember my previous position
    var prevX = this.cx;
    var prevY = this.cy;
    
    // Compute my provisional new position (barring collisions)
    var nextX = prevX + this.xVel * du;
    var nextY = prevY + this.yVel * du;

    // Bounce off the paddles
    if (g_paddle1.collidesWith(prevX, prevY, nextX, nextY, this.radius)){
        this.yVel *= -1;
        this.xVel += g_paddle1.angle * 10;
    }
    if(g_paddle2.collidesWith(prevX, prevY, nextX, nextY, this.radius)){
        this.yVel *= -1;
        this.xVel += g_paddle2.angle * 10;
    }

    ////////////////////////////////////////////////////////////////////////////////////////

    var tmp = g_wall.collidesWithBrick(prevX, prevY, nextX, nextY, this.radius);
    if(tmp[1]){
        this.yVel *= -1;
        if(!g_paddle1.myTurn) g_paddle1.points += 10;
        if(!g_paddle2.myTurn) g_paddle2.points += 10;
    }
    if(tmp[0]){
        this.xVel *= -1;
        if(!g_paddle1.myTurn) g_paddle1.points += 10;
        if(!g_paddle2.myTurn) g_paddle2.points += 10;
    }

    ////////////////////////////////////////////////////////////////////////////////////////
    
    // Bounce off top and bottom edges
    if (nextY < 100 ||                             // top edge
        nextY > 100 + g_field.height) {            // bottom edge
        this.yVel *= -1;
    }
    // Bounce off side edges
    if(nextX < 100 ||                              // right edge
        nextX > 100 + g_field.height){             // left edge
        this.xVel *= -1;
    }

    // Reset if we fall off the left or right edges
    // ...by more than some arbitrary `margin`
    //
    var margin = 20 * this.radius;
    if (nextX < 100 - margin || 
        nextX > 100 + g_field.width + margin ||
        nextY < 100 - margin ||
        nextY > 100 + g_field.height + margin) {
        this.reset();
    }

    // *Actually* update my position 
    // ...using whatever velocity I've ended up with
    //
    this.cx += this.xVel * du;
    this.cy += this.yVel * du;
};

g_ball.reset = function () {
    this.cx = 300;
    this.cy = 300;
    this.xVel = 5;
    this.yVel = 4;
};

g_ball.render = function (ctx) {
    fillCircle(ctx, this.cx, this.cy, this.radius, 'green');
};