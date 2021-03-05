// Timer: if Player beats a level -> has a temporary "Level 2" message, etc

function handleTimer(){
    if (beatLevel && timer < 50) {
        ctx.fillStyle = 'black';
        ctx.font = '60px Helvetica';
        ctx.fillText('Level ' + currentLevel, 305, 70);

        timer += 1;   
    } else {
        beatLevel = false;
        timer = 0;
    }

    // if (beatEntireGame && timer < 20) {
    //     timer += 1; 
    //     stopGameSoon = true
    // }
}
