/*

Cool stuff:

colors.
2-player, only one can hit the ball each time (swithces with each paddle hit), and the player who can't hit the ball changes to a transparent color.
    Player gets 10 points for each brick that is smashed by him. 
flakes that drop from the bricks when they are smashed (not always, 50:50 chance).
The player who's turn it is (is not transparent) can catch the flakes and: gain 5 points if it's green, loose 5 points if it's yellow,
    get a bigger paddle if it's the same color as his paddle or get a smaller paddle if it's the other player's color.
The paddles can change angle and change the bounce-angle of the ball when it hits. (not perfectly done, but it works ok)
Multiple levels, and easy to make new levels.
FIELD ROTATION. nuff said 





--------------------------------------------------------------------------------------------
Supporting timer-events (via setInterval) *and* frame-events (via requestAnimationFrame)
adds significant complexity to the the code.

I can simplify things a little by focusing on the latter case only (which is the
superior mechanism of the two), so let's try doing that...

The "MAINLOOP" code, inside g_main, is much simplified as a result.

*/

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

var g_canvas = document.getElementById("myCanvas");
var g_ctx = g_canvas.getContext("2d");



/*
0        1         2         3         4         5         6         7         8         9
123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

// ============
// PADDLE STUFF
// ============

// PADDLE 1

var KEY_A = 'A'.charCodeAt(0);
var KEY_D = 'D'.charCodeAt(0);
var KEY_W = 'W'.charCodeAt(0);
var KEY_S = 'S'.charCodeAt(0);

var g_paddle1 = new Paddle({
    cx : 200,
    

    color : g_colors[0],
    mainColor : g_colors[0],
    transColor : 'rgba(255, 0, 0, 0.5)',
    myTurn : true,
    
    GO_LEFT  : KEY_A,
    GO_RIGHT : KEY_D,
    ROT_RIGHT : KEY_S,
    ROT_LEFT : KEY_W
});

// Paddle 2

var KEY_J = 'J'.charCodeAt(0);
var KEY_L = 'L'.charCodeAt(0);
var KEY_I = 'I'.charCodeAt(0);
var KEY_K = 'K'.charCodeAt(0);

var g_paddle2 = new Paddle({
    cx : 400,

    color : g_colors[1],
    mainColor : g_colors[1],
    transColor : 'rgba(0, 0, 255, 0.5)',
    myTurn : false,
    
    GO_LEFT  : KEY_J,
    GO_RIGHT : KEY_L,
    ROT_RIGHT : KEY_K,
    ROT_LEFT : KEY_I
});

// =============
// GATHER INPUTS
// =============

function gatherInputs() {
    // Nothing to do here!
    // The event handlers do everything we need for now.
}

// =================
// UPDATE SIMULATION
// =================

// We take a very layered approach here...
//
// The primary `update` routine handles generic stuff such as
// pausing, single-step, and time-handling.
//
// It then delegates the game-specific logic to `updateSimulation`


// GAME-SPECIFIC UPDATE LOGIC

function updateSimulation(du) {
    
    g_field.update(du);
    g_ball.update(du);
    
    g_paddle1.update(du);
    g_paddle2.update(du);

    g_wall.update(du);

    updateFlakes(du);

}


// =================
// RENDER SIMULATION
// =================

// We take a very layered approach here...
//
// The primary `render` routine handles generic stuff such as
// the diagnostic toggles (including screen-clearing).
//
// It then delegates the game-specific logic to `gameRender`


// GAME-SPECIFIC RENDERING

function renderSimulation(ctx) {

   // g_field.render(ctx);
    
    g_ball.render(ctx);
    
    g_wall.render(ctx);

    renderFlakes(ctx);


// render the 'right' paddle on top of the other one
    if(g_paddle1.myTurn){
        g_paddle2.render(ctx);
        g_paddle1.render(ctx);
    }
    else{
        g_paddle1.render(ctx);
        g_paddle2.render(ctx);
    }

}

// Kick it off
g_main.init();