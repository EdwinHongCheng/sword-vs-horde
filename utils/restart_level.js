// [TEST] Restart Current Level

// [WORKS] hit space after Game Over to Replay Level
window.addEventListener("keydown", function(e) {
    // Key = Space
    if (e.keyCode === 32 && currentState === 2 && gameOver) {
        restartLevel();
    }
});



// [TEST] Beating Entire Game: Space Bar to Go Back to Level 1
// - NOTE: winningScore must match script.js "winningScore" for Level 1
window.addEventListener("keydown", function(e) {
    // Key = Space
    if (e.keyCode === 32 && currentState === 2 && beatEntireGame) {
        currentLevel = 1;
        frame = 0;
        timer = 0;
        // beatLevel = true -> invoke "Level 1" on-screen message
        beatLevel = true;
        score = 0;
        winningScore = 10;
        enemiesInterval = 50;

        // [TEST] new additions to reset game correctly ------>
        enemySpeed = 5
        enemyTypes = [];
        enemyTypes.push(redSlime);
        // -------------------------->

        restartLevel();
    }
});



function restartLevel() {
    gameOver = false;
    stopGame = false;
    beatEntireGame = false;
    pauseGame = false;

    // [TEST] reset player position
    player.x = 400 - 16;
    player.y = 300;
    player.frameX = 0;
    player.frameY = 0;
    player.moving = false;
    player.facing = "down";
    player.attacking = false;
    player.dashed = false;

    // [WORKS] delete all enemies, even those that hit the Village
    for (let i = 0; i < enemies.length; i++) {
        if (enemies[i]){
            enemies.splice(i, 1);
            i--;
        }
    }

    // [WORKS] restarts the level
    beatLevel = true;
    handleNewLevel();

    startAnimating(20);
}
