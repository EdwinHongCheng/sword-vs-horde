// [TEST] works w script.js - animate()
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

    // [WORKS] Level 4 will alternate between 2 new colors + increased speed
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
