# Sword vs Horde

[Play Sword vs Horde!](https://edwinhongcheng.github.io/sword-vs-horde/)

Sword vs Horde is a top-down hack and slash game where the player defends a village from an evil horde of slimes. To progress to the next level, the player must slay a set amount of slimes with the swordsman's flame sword attack.

This game is implemented with Javascript, and uses HTML5 Canvas API to render all visual components and HTML5 Audio element for background music.

## Gameplay

The player controls a swordsman's movements and attack with the keyboard keys. A village is placed at the very center of the map, and the player must guard it from incoming slimes. Slimes will randomly spawn from one of eight spawn points, and will bounce around the screen until they hit the village, the swordsman gets hit by the slime, or the swordsman successfully attacks the slimes. To beat the game, the player must have a constant awareness of the bouncing slimes' trajectories, and perform precise movements to weave through the slimes and slay them before they touch the village.

## Implementation

### Game Rendering

An ```animate``` function is used to render the game, and is constantly looped to enable smooth control of the swordsman, spawn slimes' movements, and update the gamestate whether the a new level has been reached, the game ended, or if the player pauses the game.

```js
function animate() {
    frame++;
    if (!gameOver && !stopGame && !pauseGame) requestAnimationFrame(animate);
    
    // "level_mods.js" - modify level based on Current Level
    levelMod();
    
    now = Date.now();
    elapsed = now - then;
    if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // clears top Canvas -> lets "Slain" score update
        ctx2.clearRect(0, 0, topCanvas.width, topCanvas.height);

        // draw Background
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        drawSprite(
            playerSprite, player.width * player.frameX, player.height * player.frameY, 
            player.width, player.height,
            player.x, player.y, player.width, player.height
        );

        // draw Village
        ctx.drawImage(villageSprite, village.x, village.y, village.width, village.height);

        // draw Enemies
        handleEnemies();
        
        // draw projectiles AKA swordsman's fire attack
        handleProjectiles();
        
        handleGameStatus();
        handleNewLevel();
        
        // game music - Game Over -> pause music
        handleGameMusic();

        // "handleEnemies" happens 1st before game stops -> stops animating AFTER the enemy ia removed
        // if (stopGameSoon) stopGame = true;

        if (!beatEntireGame) {
            movePlayer();
            handlePlayerFrame();
        }

        if (pauseGame) {
            // from "pause_game.js"
            pauseScreen();
        }
    }
}
```

