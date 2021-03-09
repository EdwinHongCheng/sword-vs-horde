let states = { 
    Menu: 0,
    Instructions: 1,
    Playing: 2
};

let currentState = states.Menu;

window.addEventListener("keydown", function(e) {
    // [Press Space to go to Instructions]
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
        ctx.fillText('Up / Left / Down / Right', 180, 280);
        ctx.fillText(':   W / A / S / D', 400, 280);

        ctx.fillText('Flame Sword Strike', 180, 325);
        ctx.fillText(':   K', 400, 325);

        ctx.fillText('Teleport Dash', 180, 370);
        ctx.fillText(':   L', 400, 370);

        ctx.fillText('Pause / Resume Game', 180, 415);
        ctx.fillText(':   F', 400, 415);



        // [WORKS] opacity bar for "Press Space to Start"
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = 'red';
        ctx.fillRect(0, 462, 800, 38);
        ctx.globalAlpha = 1;

        // ["Press Space to Start" Line]
        ctx.fillStyle = 'white';
        ctx.font = '26px Helvetica';
        ctx.fillText('- Press Space to Start the Battle -', 210, 490);

        // [WORKS] Animate Campfire Function
        animateCampfire()

        // [Old] for 1 Frame of Campfire
        // campfire.onload = function() {
        //     // [NOTE] ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
        //     // - modify dx + dy for position on canvas (current: 540, 200)
        //     ctx.drawImage(campfire, (256 * campfireFrameX), 0, 256, 220, 540, 200, 256, 220);
        // }

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

// [WORKS] Animate Campfire Function ----------------------------------------->
let campfire = new Image();
campfire.src = "./images/campfire.png";
let campfireFrameX = 0;
let campfireTimer = 0;

function animateCampfire() {
    if (currentState === 1) requestAnimationFrame(animateCampfire);
    campfireTimer += 1;

    // [NOTE] campfireTimer % X - can increase X to make fire slower
    if (campfireTimer % 5 === 0) {
        if (campfireFrameX < 9) campfireFrameX += 1;
        else campfireFrameX = 0;

        ctx.clearRect(540, 180, 256, 220);
        // - modify dx + dy for position on canvas (current: 540, 200)
        ctx.drawImage(campfire, (256 * campfireFrameX), 0, 256, 220, 540, 200, 256, 220);
    }
}
