function handleGameStatus(){    
    // [TOP CANVAS] ------------------------------------------>

    // [TEST] Kills / Kills Needed
    ctx2.fillStyle = 'white';
    ctx2.font = '20px Helvetica';
    ctx2.fillText('Slain: ' + score + " / " + winningScore, 676, 36);


    ctx2.fillStyle = 'white';
    ctx2.font = '20px Helvetica';
    ctx2.fillText('Level ' + currentLevel, 10, 36);


    // [BOTTOM CANVAS] --------------------------------------->
    if (gameOver){

        beatLevel = false;

        ctx.fillStyle = 'red';
        ctx.font = '90px Helvetica';
        ctx.fillText('GAME OVER', 120, 100);

    } else if (score >= winningScore && currentLevel === 3){
        ctx.fillStyle = 'black';
        ctx.font = '90px Helvetica';
        ctx.fillText('YOU WIN!', 192, 100);
        
        beatEntireGame = true;

    } else if (score >= winningScore){
        score = 0;
        currentLevel += 1;
        beatLevel = true;
    }
}
