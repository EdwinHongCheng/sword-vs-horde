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
        console.log("Instructions Page Now")

    } else if (currentState === 1) {
        currentState = states.Playing;
        console.log("Time to Play!")
        // [CAN EDIT] larger number = more FPS = faster
        startAnimating(20);
    }
});
