// [WORKS] Pause/Resume Game

window.addEventListener("keydown", function(e) {
    // Key = F
    if (e.keyCode === 70 && currentState === 2 && !gameOver) {
        pauseGame = !pauseGame;

        // [NOTE] duped this code in animate() -> works consistently now
        if (pauseGame) {
            // [WORKS] opacity for Pause Screen
            ctx.globalAlpha = 0.6;
            ctx.fillStyle = 'black';
            ctx.fillRect(225, 150, 350, 200);
            // set opacity back to 1 after
            ctx.globalAlpha = 1;
            
            ctx.fillStyle = 'white';
            ctx.font = '20px Helvetica';
            ctx.fillText('- Paused -', 352, 190);
            ctx.fillText('Resume Game:', 250, 240);
            ctx.fillText('    F', 398, 240);  
            ctx.fillText('Movement:', 250, 280);
            ctx.fillText('    W / A / S / D', 398, 280);
            ctx.fillText('Attack:   K', 250, 320);
            ctx.fillText('Dash:   L', 420, 320);

            // [WORKS] pause music if pausing game (also: script.js - startAnimating())
            pauseMusic = true;
            gameMusic.pause();
        } else if (!pauseGame) {
            startAnimating(20);
        }
    }
});
