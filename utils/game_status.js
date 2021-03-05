function handleGameStatus(){    
    // [TEST] Kills / Kills Needed
    ctx.fillStyle = 'white';
    ctx.font = '20px Helvetica';
    ctx.fillText('Slain: ' + score + " / " + winningScore, 650, 35);

    if (gameOver){
        ctx.fillStyle = 'black';
        ctx.font = '110px Helvetica';
        ctx.fillText('GAME OVER', 120, 390);
    } else if (score >= winningScore){
        ctx.fillStyle = 'black';
        ctx.font = '60px Helvetica';
        ctx.fillText('YOU WIN with ' + score + ' points!', 130, 370);
        stopGameSoon = true;
    }
}
