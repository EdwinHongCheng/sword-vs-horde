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