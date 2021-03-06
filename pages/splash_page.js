// [NOTE] Instructions Page in "gamestate.js"

// [WORKS] Top Canvas (Nav Bar)
// [NOTE] depends on "script.js" - which already has defined ctx2

// [WORKS] clears top Canvas -> lets "Slain" score update
ctx2.fillStyle = 'white';
ctx2.font = '40px Times New Roman';
ctx2.fillText('Sword vs Horde', 270, 44);


// [WORKS] note: background image needs time to load before drawing it
let intro_bg = new Image();
intro_bg.src = "./images/intro_background.jpg";

intro_bg.onload = function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(intro_bg, 0, 0, 800, 450);

    // [WORKS] opacity bar for "Press Space to Continue"
    ctx.globalAlpha = 0.5;
    ctx.fillStyle = 'red';
    ctx.fillRect(0, 462, 800, 38);
    ctx.globalAlpha = 1;

    ctx.fillStyle = 'white';
    ctx.font = '26px Helvetica';
    ctx.fillText('- Press Space to Continue -', 240, 490);
}
