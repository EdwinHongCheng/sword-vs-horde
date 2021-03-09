# Sword vs Horde

[Play Sword vs Horde!](https://edwinhongcheng.github.io/sword-vs-horde/)

Sword vs Horde is a top-down hack-and-slash game where the player defends a village from an evil horde of slimes. To progress to the next level, the player must slay a set amount of slimes with the swordsman's flame sword attack.

This game is implemented with JavaScript, and uses HTML5 Canvas API to render all visual components and HTML5 Audio element for background music.

![SvH_intro_screenshot](https://github.com/EdwinHongCheng/sword-vs-horde/blob/main/demo_files/intro_screenshot2.png)

## Gameplay

The player controls a swordsman's movements and attack with the keyboard keys. A village is placed at the very center of the map, and the player must guard it from incoming slimes. Slimes will randomly spawn from one of eight spawn points. They'll bounce around the screen until they hit the village, the swordsman gets hit by them, or the swordsman successfully slays them. 

To beat the game, the player must have a constant awareness of the bouncing slimes' trajectories, and perform precise movements to weave through the slimes and slay them before they touch the village.

![SvH_gameplay_gif](https://github.com/EdwinHongCheng/sword-vs-horde/blob/main/demo_files/svh_gameplay.gif)

## Implementation

### Game Rendering

An ```animate``` function is used to render the game, and is constantly looped to enable smooth control of the swordsman, spawn slimes' movements, and update the gamestate whether the a new level has been reached, the game ended, or if the player pauses/resumes the game.

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

### Level Up
After clearing the current level, a ```handleNewLevel``` function is used temporarily render a "Level X" message on-screen, and reset the current score back to zero. 

```js
function handleNewLevel(){
    if (beatLevel && timer < 40) {

        // opacity bar for "Level X" text
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 16, 800, 70);
        ctx.globalAlpha = 1;

        ctx.fillStyle = 'white';
        ctx.font = '60px Times New Roman';
        ctx.fillText('Level ' + currentLevel, 305, 70);

        timer += 1;
        if (score > 0) score = 0;

    } else {
        beatLevel = false;
        timer = 0;
    }
}
```

This is used alongside the function ```levelMod```, which sets a winning score, enemy spawn interval, and enemy movement speed for each level. For levels 4 and 5, the ```enemyType``` array is reset and refilled to remove the red slimes, and to add in different-colored slimes to signify the drastic increase in difficulty.

```js
function levelMod() {
    if (currentLevel === 0) {
        winningScore = 5;
        enemiesInterval = 50;
        enemySpeed = 4;
        
    } else if (currentLevel === 1) {
        winningScore = 10;
        enemiesInterval = 50;
        enemySpeed = 5;

    } else if (currentLevel === 2) {
        winningScore = 20;
        enemiesInterval = 40;

    } else if (currentLevel === 3) {
        winningScore = 30;
        enemiesInterval = 20;

    // Level 4 will alternate between 2 new colors + increased speed
    } else if (currentLevel === 4) {
        winningScore = 40;
        enemiesInterval = 20;
        enemyTypes = [];
        enemyTypes.push(blueSlime);
        enemyTypes.push(graySlime);
        enemySpeed = 6;

    // [FINAL LEVEL] Green Slimes - camoflage + the fastest
    } else if (currentLevel === 5) {
        winningScore = 50;
        enemiesInterval = 20;
        enemyTypes = [];
        enemyTypes.push(greenSlime);
        enemySpeed = 7;
    }
}
```

## Future Improvements

### Enemies with Unique Abilities
Currently, enemies spawn faster and move quicker as the level increases. To add more gameplay variety, enemies with different abilities can be added in the game, such as bigger slimes which split off into smaller slimes when defeated.

### Endless Level Mode
"Sword vs Horde" only has 5 levels, so an alternate endless level mode could be implemented. 

For this mode, the player attempts to slay as many slimes as possible before being overrun by them. Enemy spawn rate and movement speed will be increased after a set amount of time or set amount of slimes slain. Also, boss enemies could periodically appear for an extra challenge.
