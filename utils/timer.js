// Timer: if Player beats a level -> has a temporary "Level 2" message, etc

function handleTimer(){
    if (beatLevel && timer < 50) {
        ctx.fillStyle = 'black';
        ctx.font = '60px Helvetica';
        ctx.fillText('Level ' + currentLevel, 120, 390);

        timer += 1;
    } else {
        beatLevel = false;
        timer = 0;
    }
}
