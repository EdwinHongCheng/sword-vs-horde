// [WORKS] Top Canvas (Nav Bar)
const topCanvas = document.getElementById('top-canvas')
const ctx2 = topCanvas.getContext('2d');
topCanvas.width = 800;
topCanvas.height = 60;


// [WORKS] Different Levels
let currentLevel = 0;

// [MAIN CANVAS]
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 500;


let gameOver = false;
let stopGame = false;
let beatEntireGame = false;

// [WORKS] Pause/Resume functionality
let pauseGame = false;


// *** [WIP] current Level 1 settings
let frame = 0;
let timer = 0;
// [NOTE] beatLevel = true -> can have "new_level.js" invoke "Level 1" message
let beatLevel = true;
let score = 0;
// [NOTE] these vars are defined soon by "levelMod()" (level_mods.js)
let winningScore;
let enemiesInterval;
let enemySpeed;


const background = new Image();
background.src = "./images/grass2.png";

// [WIP][Image works] Volume Icon Image
// const volumeIcon = new Image();
// volumeIcon.src = "./images/volumeIcon.png";


// [WORKS] Music Pause/Play
let playingMusic = false;

// ---------------------------------------------------------------------------->

// s = source X, Y, width, height
// d = destination X, Y, width, height
function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

let fps, fpsInterval, startTime, now, then, elapsed;

function startAnimating(fps) {
    if (!playingMusic) {
        // [WORKS] sets Music Volume (even after replaying/muting/pausing)
        gameMusic.volume = 0.4;
        gameMusic.play();
        playingMusic = true;
    // [WORKS] resumes music after pausing screen (works w "pause_game.js")
    } else if (pauseMusic) {
        gameMusic.play();
        pauseMusic = false;
    }

    fpsInterval = 1000/fps;
    then = Date.now();
    startTime = then;
    animate();
}

function animate() {
    frame++;
    if (!gameOver && !stopGame && !pauseGame) requestAnimationFrame(animate);

    // [WORKS] from "level_mods.js" - modify level based on Current Level
    levelMod();

    now = Date.now();
    elapsed = now - then;
    if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // [WORKS] clears top Canvas -> lets "Slain" score update
        ctx2.clearRect(0, 0, topCanvas.width, topCanvas.height);



        // [Cant Figure Out][WIP] Music "Button"
        // ctx2.fillStyle = 'white';
        // ctx2.font = '14px Helvetica';
        // ctx2.fillText('Music On / Off:', 540, 18);
        // ctx2.drawImage(volumeIcon, 580, 24, 30, 30)


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

        // * [WORKS - BUT DONT WANT] Current: turned off Village touches player = Game Over
        // if (collision3(village, player)) {
        //     gameOver = true;
        // }

        // [WORKS]
        handleGameStatus();

        // [WORKS]
        handleNewLevel();

        // [TEST] game music - Game Over -> pause music
        handleGameMusic();

        // [WORKS] doing this so "handleEnemies" happens 1st before game stops
        // -> stops animating AFTER the enemy = removed
        // if (stopGameSoon) stopGame = true;

        if (!beatEntireGame) {
            movePlayer();
            handlePlayerFrame();
        }

        if (pauseGame) {
            // [WORKS] opacity for Pause Screen (duped ver of "pause_game.js")
            ctx.globalAlpha = 0.6;
            ctx.fillStyle = 'black';
            ctx.fillRect(225, 150, 350, 200);
            // set opacity back to 1 after
            ctx.globalAlpha = 1;
            
            ctx.fillStyle = 'white';
            ctx.font = '20px Helvetica';
            ctx.fillText('- Paused -', 352, 190);
            ctx.fillText('Resume Game:', 250, 240);
            ctx.fillText('F', 420, 240);  
            ctx.fillText('Movement:', 250, 280);
            ctx.fillText('W / A / S / D', 420, 280);
            ctx.fillText('Attack:   K', 250, 320);
            ctx.fillText('Dash:   L', 420, 320);
        }
    }
}
