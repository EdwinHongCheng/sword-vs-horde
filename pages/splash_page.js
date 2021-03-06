// [WORKS] Top Canvas (Nav Bar)
// [NOTE] depends on "script.js" - which already has defined ctx2

// [WORKS] clears top Canvas -> lets "Slain" score update
ctx2.fillStyle = 'white';
ctx2.font = '40px Helvetica';
ctx2.fillText('Sword vs Horde', 270, 44);




// [WORKS] note: background image needs time to load before drawing it
let intro_bg = new Image();
intro_bg.src = "./images/intro_background.jpg";

intro_bg.onload = function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(intro_bg, 0, 0, 800, 450);

    ctx.fillStyle = 'white';
    ctx.font = '26px Helvetica';
    ctx.fillText('- Press Any Key to Continue -', 240, 490);
}
