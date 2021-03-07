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
            ctx.fillText('Resume Game:   F', 250, 240); 
            ctx.fillText('Movement:   W / A / S / D', 250, 280); 
            ctx.fillText('Attack:   K     Dash:   L', 250, 320);

            // [WORKS] pause music if pausing game (also: script.js - startAnimating())
            pauseMusic = true;
            gameMusic.pause();
        } else if (!pauseGame) {
            startAnimating(20);
        }
    }
});
