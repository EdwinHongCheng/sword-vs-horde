/// [WIP] need to make Splash Page + Instructions Page
// -> add it to the "window.addEventListener" below

let states = { 
    Menu: 0,
    Instructions: 1,
    Playing: 2
};

let currentState = states.Menu;


// [NOTE] make it so click only works once
window.addEventListener("keydown", function() {
    if (currentState === 0) {
        currentState = states.Instructions;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = 'white';

        ctx.font = '30px Helvetica';
        ctx.fillText('Instructions', 324, 50);
        ctx.font = '22px Helvetica';
        // [Blurb]
        ctx.fillText('Protect the village from the evil slime horde!', 20, 100);
        ctx.fillText('Vanquish them all with thy trusty flame sword!', 20, 140);
        ctx.fillText('Do not attempt to run back home.', 20, 180);
        ctx.fillText('The battle waits for you alone.', 20, 220);
        // [Controls]

        ctx.font = '30px Helvetica';
        ctx.fillText('Buttons', 348, 270);

        ctx.font = '22px Helvetica';
        ctx.fillText('Up / Left / Down / Right :   W / A / S / D', 20, 330);
        ctx.fillText('Flame Sword Strike :   K', 20, 370);
        ctx.fillText('Teleport Dash :   L', 20, 410);

        // ["Press Any Key to Start" Line]
        ctx.font = '26px Helvetica';
        ctx.fillText('- Press Any Key to Start the Battle -', 210, 490);


        let campfire = new Image();
        campfire.src = "./images/campfire.png";

        campfire.onload = function() {
            ctx.drawImage(campfire, 0, 0, 256, 280, 520, 160, 256, 280);
        }

    } else if (currentState === 1) {
        // [Current] 20 FPS = pretty good imo
        startAnimating(20);

        currentState = states.Playing;
    }
});
