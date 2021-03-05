// [TEST] Sword Attack "Beam" ------------------------------------------------->
// - note: from "Tower Defense" - "Projectiles"

let projectiles = [];

// [TEST] global vars for fire sprite -> "changes"
let flameFrameX = 0;

// [TEST] "Projectile" sprites
const attack1 = new Image();
attack1.src = "./images/fire2.png";

class Projectile {
    constructor(x, y){
        // [WORKS] change "x" + "y" depending on player.facing
        if (player.facing === "right") {
            x += 24;
            y += 0;
            this.width = 32;
            this.height = 32;
        } else if (player.facing === "left") {
            x -= 24;
            y -= 0;
            this.width = 32;
            this.height = 32;
        } else if (player.facing === "up") {
            x += 0;
            y -= 26;
            this.width = 32;
            this.height = 32;
        } else if (player.facing === "down") {
            x += 0;
            y += 26;
            this.width = 32;
            this.height = 32;
        }

        this.x = x;
        this.y = y;
        
    
        this.speed = 3;
        this.power = 100;
        // [TEST] want to "instantly" remove projectile -> melee attack
        this.remove = false;

        // [WIP][WORKS] Animation - need to find a way to remove flame
        this.attackType = attack1;
        this.frameX = 0;
        this.frameY = 0;
        this.minFrame = 0;
        this.maxFrame = 3;
        this.spriteWidth = 32;
        this.spriteHeight = 32;
    }
    update(){
        // [TEST] want to "instantly" remove projectile -> melee attack
        
        // [TEST] animation
        if (flameFrameX < this.maxFrame) flameFrameX++;
        else flameFrameX = this.minFrame;

        this.remove = true;
    }
    draw(){
        // ctx.fillStyle = 'yellow';
        // ctx.fillRect(this.x, this.y, this.width, this.height);

        ctx.drawImage(this.attackType, 
            flameFrameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight,
            this.x, this.y, this.width, this.height
        )
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