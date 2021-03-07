// [NOTE] can't get to work cuz pixel positions = relative to screen size
// -> current Solution: just use key press + event listener


// [GOAL] use window.eventListener
// when mouse = around area where Volume Icon image is (check X + Y coordinates)
// -> have a hover button effect
// [THEN] clicking in this area -> music pauses / resumes

// [WIP] [ISSUE] resized window = different pixel positions
// -> need to figure out a way to get a "local" key position from canvas


// topCanvas.addEventListener('click', function(e) { 
//     console.log("X: " + e.clientX);
//     console.log("Y: " + e.clientY);

// }, false);
