/// [WIP] need to make Splash Page + Instructions Page
// -> add it to the "window.addEventListener" below

let states = { 
    Menu: 0,
    Instructions: 1,
    Playing: 2
};

let currentState = states.Menu;


// [NOTE] make it so click only works once
window.addEventListener("keydown", function(e) {
    // [TEST Space to got to Instructions]
    if (currentState === 0 && e.keyCode === 32) {
        currentState = states.Instructions;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = 'white';

        ctx.font = '30px Helvetica';
        ctx.fillText('- Instructions -', 305, 60);
        ctx.font = '20px Helvetica';
        // [Blurb]
        ctx.fillText('Protect the village from the evil slime horde!', 180, 110);
        ctx.fillText('Vanquish them all with thy trusty flame sword!', 180, 155);
        // ctx.fillText('Do not attempt to run back home.', 20, 180);
        // ctx.fillText('The battle waits for you alone.', 20, 220);

        // [Controls]
        ctx.font = '30px Helvetica';
        ctx.fillText('- Controls -', 326, 230);

        ctx.font = '20px Helvetica';
        ctx.fillText('Up / Left / Down / Right :   W / A / S / D', 180, 280);
        ctx.fillText('Flame Sword Strike :   K', 180, 325);
        ctx.fillText('Teleport Dash :   L', 180, 370);
        ctx.fillText('Pause / Resume Game :   F', 180, 415);


        // [WORKS] opacity bar for "Press Space to Start"
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = 'red';
        ctx.fillRect(0, 462, 800, 38);
        ctx.globalAlpha = 1;

        // ["Press Space to Start" Line]
        ctx.fillStyle = 'white';
        ctx.font = '26px Helvetica';
        ctx.fillText('- Press Space to Start the Battle -', 210, 490);


        let campfire = new Image();
        campfire.src = "./images/campfire.png";

        campfire.onload = function() {
            // [NOTE] ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
            // - modify dx + dy for position on canvas (current: 540, 180)
            ctx.drawImage(campfire, 0, 0, 256, 280, 540, 180, 256, 280);
        }

        // [WORKS] Space to Start Game
    } else if (currentState === 1 && e.keyCode === 32) {
        // [removed][WORKS] applies "display: none" to my GitHub icon
        // document.getElementById("github-canvas").style.display = "none";
        // document.getElementById("github-canvas").style.left = "50%";

        // [Current] 20 FPS = pretty good imo
        startAnimating(20);

        currentState = states.Playing;
    }
});
