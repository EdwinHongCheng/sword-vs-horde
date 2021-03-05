class Village {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.width = 80;
        this.height = 80;
    // [TEST] village hitbox - giving the deadspace "margin" 2px each side
        this.deadspaceX = 2;
        this.deadspaceY = 2;
        this.hitboxX = 76;
        this.hitboxY = 76;
    }
}

// [TEST] village - can define x + y coordinates
// - NOTE: for later levels -> use an array -> can map thru array to draw all?
let village = new Village(300, 300);
const villageSprite = new Image();
villageSprite.src = "./images/village.png";