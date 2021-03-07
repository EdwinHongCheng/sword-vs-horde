let canvasWidth = 800;
let canvasHeight = 500;

// [TEST] enemy sprites
const enemyTypes = [];
const enemy1 = new Image();
enemy1.src = "./images/enemy.png";
enemyTypes.push(enemy1);

class Enemy {
    constructor(x, y){
        // [NOTE] "x - 17" cuz Enemy hitbox is 16px (so, 16 + 1 = 17)
        this.x = x;
        this.y = y;
        this.width = 32;
        this.height = 32;
        // [WORKS] enemy hitbox (not sure about values right now tbh)
        this.deadspaceX = 8;
        this.deadspaceY = 8;
        this.hitboxX = 16;
        this.hitboxY = 16;

        // this.speed = Math.random() * 0.5 + 1;
        this.speed = 5;
        this.movementX = this.speed;
        this.movementY = this.speed;
        this.health = 100;

        // [TEST]
        this.enemyType = enemyTypes[0];
        this.frameX = 0;
        this.frameY = 0;
        this.minFrame = 0;
        this.maxFrame = 3;
        this.spriteWidth = 32;
        this.spriteHeight = 32;
    }

    // [WORKS] Bounces squares on all 4 sides
    update(){
        // [TEST] animation
        if (this.frameX < this.maxFrame) this.frameX++;
        else this.frameX = this.minFrame;


        // [NOTE] checks X sides (left + right walls)
        if (this.x <= 0 || this.x + this.width >= canvasWidth) {
            this.movementX *= -1;
            this.x -= this.movementX;
        } else {
            this.x -= this.movementX;
        }

        // [NOTE] checks Y sides (top + down walls)
        if (this.y <= 0 || this.y + this.height >= canvasHeight) {
            this.movementY *= -1;
            this.y -= this.movementY;
        } else {
            this.y -= this.movementY;
        }
    }

    draw(){
        // [TEST] ctx.rect(x, y, width, height);        
        // ctx.fillStyle = "red";
        // ctx.fillRect(this.x, this.y, this.width, this.height);

        // ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh)
        ctx.drawImage(this.enemyType, 
            this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight,
            this.x, this.y, this.width, this.height
        )
    }
}


// [TEST] handle enemies array - remove enemy if attacked?
function handleEnemies(){
    for (let i = 0; i < enemies.length; i++){
        enemies[i].update();
        enemies[i].draw();

         // * [TURNED OFF FOR TESTING] Collision w Village = Game Over
        if (enemies[i] && collision3(village, enemies[i])) {
            gameOver = true; 
        }

        // * [TURNED OFF FOR TESTING] Collision w Player = Game Over
        if (enemies[i] && collision3(player, enemies[i])) {
            gameOver = true;
        }

        // [TEST] take enemy out if player just beat a level
        // - this doesn't increment score
        if (beatLevel || beatEntireGame)  {
            enemies.splice(i, 1);
            i--;
        }

        // Note: takes enemy out if enemy health = 0
        if (enemies[i] && enemies[i].health <= 0){
            score += 1;
            enemies.splice(i, 1);
            i--;
        }
    }

    // [TEST] spawn enemy at interval
    // - decide Spawn Point here (WIP)
    if (frame % enemiesInterval === 0 && !beatLevel && !beatEntireGame) {
        verticalPosition = 100;

        // [NOTE] canvas.width = 800; canvas.height = 500;

        // [NOTE] Enemy = 32x32 -> using +/- 33 px
        let randomPosPair = [
            // Spawns at Right side
            [800 - 33, 167],
            [800 - 33, 333],
            // Spawns at Left side
            [0, 167],
            [0, 333],
            // Spawns at Top
            [267, 0],
            [533, 0],
            // Spawns at Bottom
            [267, 500 - 33],
            [533, 500 - 33],
        ]

        let posXY1 = randomPosPair[Math.floor(Math.random() * randomPosPair.length)]
        enemies.push(new Enemy(...posXY1));

        // [EXTRA ENEMY] NOTE: too hard tho

        // let posXY2 = randomPosPair[Math.floor(Math.random() * randomPosPair.length)]
        // enemies.push(new Enemy(...posXY2));
    };
};

// [NOTE]
let enemies = [];
