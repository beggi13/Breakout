
function Flake(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
}

Flake.prototype.radius = 3;
Flake.prototype.vel = 3;

var g_flakes = [];

function flake(cx, cy, type){

	var chance = Math.random();

	if(chance < 0.5){ // 50 : 50 chance
		g_flakes[g_flakes.length] = new Flake({ 
												x : cx, 
												y : cy, 
												type : type 
											});
	}

}

function renderFlakes(ctx){
	for(var i = 0; i < g_flakes.length; ++i){
		g_flakes[i].render(ctx);
	}
}

Flake.prototype.render = function(ctx){
	fillCircle(ctx, this.x, this.y, this.radius, g_colors[this.type]);
}

function updateFlakes(du){
	for(var i = 0; i < g_flakes.length; ++i){
		g_flakes[i].update(du);
		if(g_flakes[i].x < 0){
			g_flakes.splice(i,1);
		}
	}
}

Flake.prototype.update = function(du){
	nextY = this.y + this.vel * du;
	
	if(g_paddle1.collidesWith(this.x, this.y, this.x, nextY, this.radius)){
		this.x = -10;
		g_paddle1.flakeCollision(this.type);
	}
	if(g_paddle2.collidesWith(this.x, this.y, this.x, nextY, this.radius)){
		this.x = -10;
		g_paddle2.flakeCollision(this.type);
	}
	if(this.y > g_field.height + 100){
		this.x = -10;
	}
	this.y = nextY;
}
