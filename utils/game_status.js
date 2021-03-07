function handleGameStatus(){    
    // [TOP CANVAS] ------------------------------------------>

    // [WORKS] Kills / Kills Needed
    ctx2.fillStyle = 'white';
    ctx2.font = '20px Helvetica';
    ctx2.fillText('Slain: ' + score + " / " + winningScore, 676, 36);
    // [WORKS] Current Level Message
    ctx2.fillStyle = 'white';
    ctx2.font = '20px Helvetica';
    ctx2.fillText('Level ' + currentLevel, 10, 36);
    // [WORKS] Pause/Resume Game Message
    ctx2.fillStyle = 'white';
    ctx2.font = '16px Helvetica';
    ctx2.fillText('Pause / Resume Game:', 120, 24);
    ctx2.fillText('Press the F key', 150, 48);
    // [TEST] Music On/Off Message
    ctx2.fillStyle = 'white';
    ctx2.font = '16px Helvetica';
    ctx2.fillText('Music On / Off:', 510, 24);
    ctx2.fillText('Press the G key', 510, 48);


    // [BOTTOM CANVAS] --------------------------------------->
    if (gameOver){

        beatLevel = false;


        // [1. Opaque Bar] opacity bar for "Game Over"
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 20, 800, 100);
        // - set opacity back to 1 after
        ctx.globalAlpha = 1;

        // [2. Opaque Bar] opacity bar for "Try Again"
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 350, 800, 80);
        // - set opacity back to 1 after
        ctx.globalAlpha = 1;

        ctx.fillStyle = 'red';
        // ctx.font = '90px Helvetica';
        ctx.font = '90px Times New Roman';
        ctx.fillText('GAME OVER', 120, 100);
        // [WORKS] Restart Level Message
        ctx.fillStyle = 'white';
        ctx.font = '40px Times New Roman';
        ctx.fillText('- Press Space to Try Again -', 173, 400);

    } else if (score >= winningScore && currentLevel === 3){
        // [WORKS] opacity bar for "You Win"
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 20, 800, 100);
        ctx.globalAlpha = 1;

        // [WORKS] opacity bar for "Restart Game"
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 350, 800, 80);
        ctx.globalAlpha = 1;
        
        
        ctx.fillStyle = 'white';
        ctx.font = '90px Times New Roman';
        ctx.fillText('YOU WIN!', 192, 100);

        ctx.fillStyle = 'white';
        ctx.font = '40px Times New Roman';
        ctx.fillText('- Press Space to Restart Game -', 143, 400);
        
        beatEntireGame = true;

    } else if (score >= winningScore){
        score = 0;
        currentLevel += 1;
        beatLevel = true;
    }
}
