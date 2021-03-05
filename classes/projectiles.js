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