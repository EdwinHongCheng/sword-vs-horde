const player = {
    // [NOTE] 1st 2 values below = starting position (ex. 200, 200)
    x: 400 - 16,
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
    // [WORKS] hero hitbox
    deadspaceX: 8,
    deadspaceY: 6,
    hitboxX: 16,
    hitboxY: 20
}

const playerSprite = new Image();
playerSprite.src = "./images/swordsman.png";

function handlePlayerFrame() {
    if (player.frameX < 3 && player.moving) player.frameX++
    else player.frameX = 0;
}


const keys = [];



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
        player.frameY = 2;
        player.frameX = 0;
    } else if (player.facing === "left") {
        player.frameY = 3;
        player.frameX = 0;
    } else if (player.facing === "down") {
        player.frameY = 0;
        player.frameX = 0;
    } else if (player.facing === "right") {
        player.frameY = 1;
        player.frameX = 0;
    }
});

function movePlayer() {
    // [Up] "W"
    if (keys[87] && player.y > 0) {
        player.y -= player.speed;
        player.frameY = 2;
        player.moving = true;
        player.facing = "up";
    }
    // [Left] "A"
    if (keys[65] && player.x > 0 + (player.width / 2)) {
        player.x -= player.speed;
        player.frameY = 3;
        player.moving = true;
        player.facing = "left";
    }
    // [Down] "S"
    if (keys[83] && player.y < canvas.height - player.height) {
        player.y += player.speed;
        player.frameY = 0;
        player.moving = true;
        player.facing = "down";
    }
    // [Right] "D"
    if (keys[68] && player.x < canvas.width - player.width) {
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