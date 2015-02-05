
var g_field = {
    x : 100,
    y : 100,
    height : 400,
    width : 400
};


g_field.render = function (ctx){
	fillBox(ctx, 0, 0, g_canvas.width, g_canvas.height);
	fillBox(ctx, this.x, this.y, this.width, this.height, 'white');

	ctx.save();
	ctx.fillStyle = 'yellow';
	ctx.font = 'bold 30px Arial';
	ctx.fillText(g_paddle1.points + ' : ' + g_paddle2.points, 150, 80);
	ctx.restore();

	if(GAMEOVER){

		ctx.save();
		ctx.font = 'bold 40px Arial';
		if(g_paddle1.points > g_paddle2.points){
			ctx.fillStyle = 'red';
			ctx.fillText('Red Player wins!!!', 120, 300);
		}
		else if(g_paddle1.points < g_paddle2.points){
			ctx.fillStyle = 'blue';
			ctx.fillText('Blue Player wins!!!', 120, 300);
		}
		else{
			ctx.fillStyle = 'green';
			ctx.fillText('Nobody wins', 120, 300);
		}
		ctx.restore();

	}
}

g_field.rotate = function(ctx, r){
	
	ctx.save()
	ctx.translate(300, 300);
	ctx.rotate(r);
	ctx.translate(-300, -300);
	ctx.restore;
	overallROTATION += r;

}

var ROTATION = 0;
var overallROTATION = 0;

g_field.update = function(du){

	g_field.rotate(g_ctx, ROTATION * du);

}

g_field.reset = function(){
	ROTATION = 0;
	this.rotate(g_ctx, -overallROTATION);
	overallROTATION = 0;
}