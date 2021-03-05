const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 500;
let gameOver = false;
let frame = 0;

// [TEST]
let score = 0;

// * [CAN EDIT] enemiesInterval  - 
let enemiesInterval = 50;

const background = new Image();
background.src = "./images/background.png";
// background.src = "./images/background.jpg";



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
    if (!gameOver) requestAnimationFrame(animate);

    now = Date.now();
    elapsed = now - then;
    if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

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

        movePlayer();
        handlePlayerFrame();
    }
}

// *** [CAN EDIT] arg = FPS -> larger number = more FPS = faster
startAnimating(20);
