const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 500;
let gameOver = false;
let frame = 0;
let enemiesInterval = 100;

const keys = [];

const player = {
    // [NOTE] 1st 2 values below = starting position (ex. 200, 200)
    x: 200,
    y: 300,
    width: 32,
    height: 32,
    frameX: 0,
    frameY: 0,
    speed: 9,
    moving: false,
    facing: "down",
    attacking: false,
    dashed: false,
    // [TEST] hero hitbox
    deadspaceX: 8,
    deadspaceY: 6,
    hitboxX: 16,
    hitboxY: 20
}

// [WORKS] Village
class Village {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.width = 80;
        this.height = 80;
    // [TEST] village hitbox - giving the deadspace "margin" 2px each side
        this.deadspaceX = 2;
        this.deadspaceY = 2;
        this.hitboxX = 76;
        this.hitboxY = 76;
    }
}

const playerSprite = new Image();
playerSprite.src = "./test/swordsman.png";

const background = new Image();
background.src = "./test/background.jpg";

// [TEST] village - can define x + y coordinates
// - NOTE: for later levels -> use an array -> can map thru array to draw all?
let village = new Village(300, 300);
const villageSprite = new Image();
villageSprite.src = "./test/village.png";

// ---------------------------------------------------------------------------->

// [TEMP][TEST] Enemies (c+p from Tower Defense for now)
class Enemy {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.width = 32;
        this.height = 32;
        this.speed = Math.random() * 0.5 + 1;
        this.movement = this.speed;
        this.health = 100;
        // [TEST] enemy hitbox (not sure about values right now tbh)
        this.deadspaceX = 0;
        this.deadspaceY = 0;
        this.hitboxX = 32;
        this.hitboxY = 32;
    }
    update(){
        this.x -= this.movement;
    }
    draw(){
        // ctx.fillStyle = 'red';
        // ctx.beginPath();
        // ctx.arc(this.x, this.y, this.width, 0, Math.PI * 2);
        // ctx.fill();

        // [TEST] ctx.rect(x, y, width, height);
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.closePath();
    }
}

// [TEST] enemies in an array
let enemies = [];
let testDummy = new Enemy(canvas.width, 350);
enemies.push(testDummy);

// [TEST] handle enemies array - remove enemy if attacked?
function handleEnemies(){
    for (let i = 0; i < enemies.length; i++){
        enemies[i].update();
        enemies[i].draw();

        // [WORKS]
        if (collision3(village, enemies[i])) {
            gameOver = true; 
        }

        // *** [TEST] collision3
        if (collision3(player, enemies[i])) {
            gameOver = true;
        }

        // Note: takes enemy out if enemy health = 0
        if (enemies[i] && enemies[i].health <= 0){
            enemies.splice(i, 1);
            i--
        }
    }

    // [TEST] spawn enemy at interval
    if (frame % enemiesInterval === 0) {
        verticalPosition = 100;
        enemies.push(new Enemy(canvas.width, verticalPosition));
    };
};


// [TEST] Sword Attack "Beam" ------------------------------------------------->
// - note: from "Tower Defense" - "Projectiles"

const projectiles = [];

class Projectile {
    constructor(x, y){
        // [WIP][TEST] change "x" + "y" depending on player.facing
        // NOTE: will have to readjust after I get updated spritesheet
        if (player.facing === "right") {
            x += 24;
            y += 0;
            this.width = 16;
            this.height = 32;
        } else if (player.facing === "left") {
            x -= 8;
            y -= 0;
            this.width = 16;
            this.height = 32;
        } else if (player.facing === "up") {
            x += 0;
            y -= 6;
            this.width = 32;
            this.height = 16;
        } else if (player.facing === "down") {
            x += 0;
            y += 26;
            this.width = 32;
            this.height = 16;
        }

        this.x = x;
        this.y = y;
        // this.width = 32;
        // this.height = 32;
        this.speed = 3;
        this.power = 100;
        // [TEST] want to "instantly" remove projectile -> melee attack
        this.remove = false;
    }
    update(){
        // [TEST] want to "instantly" remove projectile -> melee attack
        this.remove = true;
    }
    draw(){
        ctx.fillStyle = 'yellow';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
function handleProjectiles(){
    for (let i = 0; i < projectiles.length; i++){
        projectiles[i].update();
        projectiles[i].draw();
        for (let y = 0; y < enemies.length; y++){
            if (enemies[y] && projectiles[i] && collision(projectiles[i], enemies[y])){
                enemies[y].health -= projectiles[i].power;
                projectiles.splice(i, 1);
                i--;
            }
        };
        if (projectiles[i] && projectiles[i].x > canvas.width){
            projectiles.splice(i, 1);
            i--;
        }

        // [TEST] "instantly" remove projectile -> melee attack
        if (projectiles[i] && projectiles[i].remove){
            projectiles.splice(i, 1);
            i--;
        }
    }
}




// ---------------------------------------------------------------------------->

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
    player.attacking = false; 

    // [TEMP][WORKS] snaps back user to "moving" spritesheet if key up (aka idle)
    if (player.facing === "up") {
        playerSprite.src = "./test/swordsman.png";

        player.frameY = 2;
        player.frameX = 0;
    } else if (player.facing === "left") {
        playerSprite.src = "./test/swordsman.png";

        player.frameY = 3;
        player.frameX = 0;
    } else if (player.facing === "down") {
        playerSprite.src = "./test/swordsman.png";

        player.frameY = 0;
        player.frameX = 0;
    } else if (player.facing === "right") {
        playerSprite.src = "./test/swordsman.png";

        player.frameY = 1;
        player.frameX = 0;
    }
});

function movePlayer() {
    // [Up] "W"
    if (keys[87] && player.y > 0) {
        playerSprite.src = "./test/swordsman.png";
        player.y -= player.speed;
        player.frameY = 2;
        player.moving = true;
        player.facing = "up";
    }
    // [Left] "A"
    if (keys[65] && player.x > 0 + (player.width / 2)) {
        playerSprite.src = "./test/swordsman.png";
        player.x -= player.speed;
        player.frameY = 3;
        player.moving = true;
        player.facing = "left";
    }
    // [Down] "S"
    if (keys[83] && player.y < canvas.height - player.height) {
        playerSprite.src = "./test/swordsman.png";
        player.y += player.speed;
        player.frameY = 0;
        player.moving = true;
        player.facing = "down";
    }
    // [Right] "D"
    if (keys[68] && player.x < canvas.width - player.width) {
        playerSprite.src = "./test/swordsman.png";
        player.x += player.speed;
        player.frameY = 1;
        player.moving = true;
        player.facing = "right";
    }

    // [WORKS] Flash Step
    // key: "L"
    if (keys[76]) {
        if (player.facing === "up" && !player.attacking && !player.dashed) {
            if (player.y - (10 * player.speed) > 0)
            player.y -= 10 * player.speed;
            player.dashed = true;
        } else if (player.facing === "left" && !player.attacking && !player.dashed) {
            if (player.x - (10 * player.speed) > 0 + (player.width / 2)) {
                player.x -= 10 * player.speed;
                player.dashed = true;
            }
        } else if (player.facing === "down" && !player.attacking && !player.dashed) {
            if (player.y + (10 * player.speed) < canvas.height - player.height) {
                player.y += 10 * player.speed;
                player.dashed = true;
            } 
        } else if (player.facing === "right" && !player.attacking && !player.dashed) {
            if (player.x + (10 * player.speed) < canvas.width - player.width) {
                player.x += 10 * player.speed;
                player.dashed = true;
            }
        } else {
            player.dashed = false;
        }
    }


    // [TEMP] [TEST] Attack Animation - sorta works, cut spritesheet tho
    // key: "K"
    if (keys[75]) {
        player.attacking = true;
        player.width = 32;
        if (player.facing === "down") {
            player.frameY = 4;
            if (projectiles.length === 0) { 
                projectiles.push(new Projectile(player.x, player.y));
            }
        } else if (player.facing === "up") {
            player.frameY = 5;
            if (projectiles.length === 0) { 
                projectiles.push(new Projectile(player.x, player.y));
            }
        } else if (player.facing === "left") {
            player.frameY = 7;
            if (projectiles.length === 0) { 
                projectiles.push(new Projectile(player.x, player.y));
            }
        } else if (player.facing === "right") {
            player.frameY = 6;
            if (projectiles.length === 0) { 
                projectiles.push(new Projectile(player.x, player.y));
            }
        }
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
    frame++;
    if (!gameOver) requestAnimationFrame(animate);

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

        // [WORKS] draw Village
        ctx.drawImage(villageSprite, village.x, village.y, village.width, village.height);

        // [WORKS] draw Enemies
        handleEnemies();

        // [WORKS] draw projectiles
        handleProjectiles();


        // [WORKS] Game Over if Player touches Village
        // if (collision(player, village)) {
        //     gameOver = true;
        // }

        // *** [TEST]
        if (collision2(village, player)) {
            gameOver = true;
        }

        movePlayer();
        handlePlayerFrame();
    }
}

// [NOTE] arg = FPS
// - larger number = more FPS = faster
startAnimating(20);


// [WORKS] utilities (from Tower Defense)
function collision(first, second) {
if( !(first.x > second.x + second.width ||
    first.x + first.width < second.x ||
    first.y > second.y + second.height ||
    first.y + first.height < second.y)) {
        return true;
    };
}

// [TEST] hitbox collision: using "deadspaceX/Y" + "hitboxX/Y"
// note: only 2nd will test out hero's hitboxes
function collision2(first, second) {
    // 1st test: if "first" = on right side of hitbox
if( !(first.x > second.x + second.deadspaceX + second.hitboxX ||
    // 2nd test: if "first" = on left side of hitbox
    first.x + first.width < second.x + second.deadspaceX ||
    // 3rd test: if "first" = below hitbox
    first.y > second.y + second.deadspaceY + second.hitboxY ||
    // 4th test: if "first" = above hitbox
    first.y + first.height < second.y + second.deadspaceY)) {
        return true;
    };
}

// [TEST] both args has deadspace + hitbox X + Y
function collision3(first, second) {
    // [Good] 1st test: if "first" = on right side of second's hitbox
if( !(first.x + first.deadspaceX > second.x + second.deadspaceX + second.hitboxX ||
    // [Good] 2nd test: if "first" = on left side of second's hitbox
    first.x + first.deadspaceX + first.hitboxX < second.x + second.deadspaceX ||
    // [Test] 3rd test: if "first" = below second's hitbox
    first.y + first.deadspaceY > second.y + second.deadspaceY + second.hitboxY ||
    // [Test] 4th test: if "first" = above second's hitbox
    first.y + first.deadspaceY + first.hitboxY < second.y + second.deadspaceY)) {
        return true;
    };
}

