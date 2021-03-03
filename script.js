const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 500;

const keys = [];

const player = {
    // [NOTE] 1st 2 values below = starting position (ex. 200, 200)
    x: 200,
    y: 300,
    width: 16,
    height: 32,
    frameX: 0,
    frameY: 0,
    speed: 9,
    moving: false,
    // [TEST] attacking - facing direction - determines attack animation
    facing: "down",
    attacking: false
}

const playerSprite = new Image();

playerSprite.src = "./test/swordsman_moving.png";

const background = new Image();
// [NOTE] change back to background.jpg later
background.src = "./test/background.jpg";

// s = source X, Y, width, height
// d = destination X, Y, width, height
function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

// Note: uses "keys" array (on line 6)
window.addEventListener("keydown", function(e) {
    // [NOTE] "e.keycode" ("e.keys" DOES NOT WORK)
    keys[e.keyCode] = true;
    player.moving = true;
});

window.addEventListener("keyup", function(e) {
    delete keys[e.keyCode];
    player.moving = false;
});

function movePlayer() {
    // [Up] "W"
    if (keys[87] && player.y > 0) {
        playerSprite.src = "./test/swordsman_moving.png";
        player.width = 16;
        player.y -= player.speed;
        player.frameY = 2;
        player.moving = true;
        player.facing = "up";
        console.log(player.facing);
    }
    // [Left] "A"
    if (keys[65] && player.x > 0 + (player.width / 2)) {
        playerSprite.src = "./test/swordsman_moving.png";
        player.width = 16;
        player.x -= player.speed;
        player.frameY = 3;
        player.moving = true;
        player.facing = "left";
    }
    // [Down] "S"
    if (keys[83] && player.y < canvas.height - player.height) {
        playerSprite.src = "./test/swordsman_moving.png";
        player.width = 16;
        player.y += player.speed;
        player.frameY = 0;
        player.moving = true;
        player.facing = "down";
    }
    // [Right] "D"
    if (keys[68] && player.x < canvas.width - player.width) {
        playerSprite.src = "./test/swordsman_moving.png";
        player.width = 16;
        player.x += player.speed;
        player.frameY = 1;
        player.moving = true;
        player.facing = "right";
    }
    // [TEST] Attack Animation - sorta works, cut spritesheet tho
    if (keys[79]) {
        player.attacking = true;
        player.width = 32;
        if (player.facing === "down") {
            player.frameY = 0;
        } else if (player.facing === "up") {
            player.frameY = 1;
        } else if (player.facing === "left") {
            player.frameY = 3;
        } else if (player.facing === "right") {
            player.frameY = 2;
        }
        playerSprite.src = "./test/swordsman_attacking.png";
    }
}

function handlePlayerFrame() {
    if (player.frameX < 3 && player.moving) player.frameX++
    else player.frameX = 0;
}

let fps, fpsInterval, startTime, now, then, elapsed;

function startAnimating(fps) {
    fpsInterval = 1000/fps;
    then = Date.now();
    startTime = then;
    animate();
}

function animate() {
    requestAnimationFrame(animate);
    now = Date.now();
    elapsed = now - then;
    if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        drawSprite(
            playerSprite, player.width * player.frameX, player.height * player.frameY, 
            player.width, player.height,
            player.x, player.y, player.width, player.height
        );
        movePlayer();
        handlePlayerFrame();
    }
}

// [NOTE] change argument - larger number = more FPS = faster
startAnimating(20);
