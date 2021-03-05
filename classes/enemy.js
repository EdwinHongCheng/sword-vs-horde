// [TEMP][TEST] Enemies (c+p from Tower Defense for now)


// [NOTE] must change this later, to match script
// - OR make another .js file that contains this
let canvasWidth = 800;
let canvasHeight = 500;

class Enemy {
    constructor(x, y){
        // [NOTE] "x - 17" cuz Enemy hitbox is 16px (so, 16 + 1 = 17)
        this.x = x - 17;
        this.y = y;
        this.width = 16;
        this.height = 16;
        // [WORKS] enemy hitbox (not sure about values right now tbh)
        this.deadspaceX = 0;
        this.deadspaceY = 0;
        this.hitboxX = 16;
        this.hitboxY = 16;

        // this.speed = Math.random() * 0.5 + 1;
        this.speed = 5;
        this.movementX = this.speed;
        this.movementY = this.speed;
        this.health = 100;

    }

    // [WORKS] bounces squares on all 4 sides
    update(){
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
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.closePath();
    }
}


// [TEST] handle enemies array - remove enemy if attacked?
function handleEnemies(){
    for (let i = 0; i < enemies.length; i++){
        enemies[i].update();
        enemies[i].draw();
        

         // * [TURNED OFF FOR TESTING] Collision w Village = Game Over
        // if (collision3(village, enemies[i])) {
        //     gameOver = true; 
        // }

        // * [TURNED OFF FOR TESTING] Collision w Player = Game Over
        // if (collision3(player, enemies[i])) {
        //     gameOver = true;
        // }


        // Note: takes enemy out if enemy health = 0
        if (enemies[i] && enemies[i].health <= 0){
            enemies.splice(i, 1);
            i--
        }
    }

    // [TEST] spawn enemy at interval
    if (frame % enemiesInterval === 0) {
        verticalPosition = 100;

        // [NOTE] this decides spawn point....
        let randomPos= [
            100,
            300
        ];

        let z = randomPos[Math.floor(Math.random() * randomPos.length)]

        // need to refactor enemy class to control direction
        enemies.push(new Enemy(canvas.width, z));
    };
};


// [TEST] enemies in an array
let enemies = [];
