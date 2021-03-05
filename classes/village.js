class Village {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.width = 32;
        this.height = 44;
    // [WORKS] village hitbox 
    // - giving the deadspace "margin" "X/Y" px each side
        this.deadspaceX = 1;
        this.deadspaceY = 3;
        this.hitboxX = 30;
        this.hitboxY = 38;
    }
}

// [TEST] village - can define x + y coordinates
// - NOTE: for later levels -> use an array -> can map thru array to draw all?
let village = new Village(400 - 16, 250 - 22);
const villageSprite = new Image();
villageSprite.src = "./images/village2.png";