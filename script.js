// [WORKS] Top Canvas (Nav Bar)
const topCanvas = document.getElementById('top-canvas')
const ctx2 = topCanvas.getContext('2d');
topCanvas.width = 800;
topCanvas.height = 60;


// [WORKS] Different Levels
let currentLevel = 1;

// [MAIN CANVAS]
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 500;


let gameOver = false;
let stopGameSoon = false;
let stopGame = false;
let beatEntireGame = false;


// *** [WIP] current Level 1 settings
let frame = 0;
let timer = 0;
// [TEST] beatLevel = true -> can have "timer.js" invoke "Level 1" message
let beatLevel = true;
let score = 0;
let winningScore = 10;
let enemiesInterval = 50;


const background = new Image();
background.src = "./images/background.png";



// ---------------------------------------------------------------------------->

// s = source X, Y, width, height
// d = destination X, Y, width, height
function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

let fps, fpsInterval, startTime, now, then, elapsed;

function startAnimating(fps) {
    fpsInterval = 1000/fps;
    then = Date.now();
    startTime = then;
    animate();
}

function animate() {
    frame++;
    if (!gameOver && !stopGame) requestAnimationFrame(animate);

    if (currentLevel === 2) {
        winningScore = 20;
        enemiesInterval = 40;
    }

    if (currentLevel === 3) {
        winningScore = 30;
        enemiesInterval = 20;
    }

    now = Date.now();
    elapsed = now - then;
    if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // [WORKS] clears top Canvas -> lets "Slain" score update
        ctx2.clearRect(0, 0, topCanvas.width, topCanvas.height);

        // [Draw Background]
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);


        drawSprite(
            playerSprite, player.width * player.frameX, player.height * player.frameY, 
            player.width, player.height,
            player.x, player.y, player.width, player.height
        );

        // [WORKS] draw Village
        ctx.drawImage(villageSprite, village.x, village.y, village.width, village.height);

        // [WORKS] draw Enemies
        handleEnemies();

        // [WORKS] draw projectiles
        handleProjectiles();

        // * [WORKS]
        if (collision3(village, player)) {
            gameOver = true;
        }

        // [TEST]
        handleGameStatus();

        // [TEST]
        handleTimer();

        // [WORKS] doing this so "handleEnemies" happens 1st before game stops
        // -> stops animating AFTER the enemy = removed
        // if (stopGameSoon) stopGame = true;

        if (!beatEntireGame) {
            movePlayer();
            handlePlayerFrame();
        }
    }
}
