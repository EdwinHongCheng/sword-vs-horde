// [WORKS] utilities (from Tower Defense)
function collision(first, second) {
if( !(first.x > second.x + second.width ||
    first.x + first.width < second.x ||
    first.y > second.y + second.height ||
    first.y + first.height < second.y)) {
        return true;
    };
}

// [TEST] hitbox collision: using "deadspaceX/Y" + "hitboxX/Y"
// note: only 2nd will test out hero's hitboxes
function collision2(first, second) {
    // 1st test: if "first" = on right side of hitbox
if( !(first.x > second.x + second.deadspaceX + second.hitboxX ||
    // 2nd test: if "first" = on left side of hitbox
    first.x + first.width < second.x + second.deadspaceX ||
    // 3rd test: if "first" = below hitbox
    first.y > second.y + second.deadspaceY + second.hitboxY ||
    // 4th test: if "first" = above hitbox
    first.y + first.height < second.y + second.deadspaceY)) {
        return true;
    };
}

// [WORKS] both args has deadspace + hitbox X + Y
function collision3(first, second) {
    // [Good] 1st test: if "first" = on right side of second's hitbox
if( !(first.x + first.deadspaceX > second.x + second.deadspaceX + second.hitboxX ||
    // [Good] 2nd test: if "first" = on left side of second's hitbox
    first.x + first.deadspaceX + first.hitboxX < second.x + second.deadspaceX ||
    // [Good] 3rd test: if "first" = below second's hitbox
    first.y + first.deadspaceY > second.y + second.deadspaceY + second.hitboxY ||
    // [Good] 4th test: if "first" = above second's hitbox
    first.y + first.deadspaceY + first.hitboxY < second.y + second.deadspaceY)) {
        return true;
    };
}