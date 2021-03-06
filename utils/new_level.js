// Timer: if Player beats a level -> has a temporary "Level 2" message, etc

function handleNewLevel(){
    if (beatLevel && timer < 40) {
        ctx.fillStyle = 'black';
        ctx.font = '60px Times New Roman';
        ctx.fillText('Level ' + currentLevel, 305, 70);

        timer += 1;
        if (score > 0) score = 0;

    } else {
        beatLevel = false;
        timer = 0;
    }
}
