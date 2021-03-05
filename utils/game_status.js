function handleGameStatus(){    
    // [TOP CANVAS] ------------------------------------------>

    // [TEST] Kills / Kills Needed
    ctx2.fillStyle = 'white';
    ctx2.font = '20px Helvetica';
    ctx2.fillText('Slain: ' + score + " / " + winningScore, 680, 36);


    ctx2.fillStyle = 'white';
    ctx2.font = '20px Helvetica';
    ctx2.fillText('Level ' + currentLevel, 10, 36);


    // [BOTTOM CANVAS] --------------------------------------->
    if (gameOver){
        ctx.fillStyle = 'black';
        ctx.font = '110px Helvetica';
        ctx.fillText('GAME OVER', 120, 390);

    } else if (score >= winningScore && currentLevel === 3){
        ctx.fillStyle = 'black';
        ctx.font = '22px Helvetica';
        ctx.fillText('YOU WIN! CONGRATULATIONS!', 120, 390);
        stopGameSoon = true;

    } else if (score >= winningScore){
        score = 0;
        currentLevel += 1;
        beatLevel = true;
    }
}
