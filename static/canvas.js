var movement = {
    up: false,
    down: false,
    left: false,
    right: false
  }

document.addEventListener('keydown', function(event) {
    switch (event.keyCode) {
      case 65: // A
        movement.left = true;
        break;
      case 87: // W
        movement.up = true;
        break;
      case 68: // D
        movement.right = true;
        break;
      case 83: // S
        movement.down = true;
        break;
    }
});
document.addEventListener('keyup', function(event) {
switch (event.keyCode) {
    case 65: // A
    movement.left = false;
    break;
    case 87: // W
    movement.up = false;
    break;
    case 68: // D
    movement.right = false;
    break;
    case 83: // S
    movement.down = false;
    break;
}
});
document.addEventListener('click', function(evt){
    console.log('click', evt);
});

var player = {x:300, y:300};
var FPS = 30;
var canvas = document.getElementById('canvas');
canvas.width  = 800;
canvas.height = 600;
var context = canvas.getContext('2d');
var interval = 1000/FPS;
var lastTime = 0;
var currentTime = null;
var delta = 0;

function gameLoop() {
    //setInterval(gameLoop, interval);
    requestAnimationFrame(gameLoop);

    currentTime = (new Date()).getTime();
    delta = (currentTime-lastTime);
    //console.log('player', player);

    gameUpdate(delta);
    gameRender(delta);
}

function gameUpdate(dt) {
    if (movement.left) {
        player.x -= 5;
    }
    if (movement.up) {
        player.y -= 5;
    }
    if (movement.right) {
        player.x += 5;
    }
    if (movement.down) {
        player.y += 5;
    }


}

function  gameRender(dt){
    if(dt > interval) {
        context.clearRect(0, 0, 800, 600);
        context.fillStyle = 'green';
    // for (var id in players) {
        //var player = players[id];
        context.beginPath();
        context.arc(player.x, player.y, 10, 0, 2 * Math.PI);
        context.fill();
    //}
        lastTime = currentTime - (dt % interval);
    }
}

// Init
gameLoop();