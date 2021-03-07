let gameMusic = new Audio("./music/save-our-planet.mp3");

// [WORKS] Loops Music
gameMusic.addEventListener('ended', function() {
  this.currentTime = 0;
  this.play();
}, false);


// [WORKS] Pause/Play Music (current: Space Bar)
let pauseMusic = false;

window.addEventListener('keydown', function(e) {
  if (e.keyCode === 32) {
    pauseMusic = !pauseMusic;
    if (pauseMusic) {
    gameMusic.pause();
    } else {
      gameMusic.play();
    }
  }
});

// [WORKS] Restart Music - KEY = "Y"
window.addEventListener('keydown', function(e) {
  // [KEY] "Y" = 89
  if (e.keyCode === 89) {
    gameMusic.currentTime = 0;
  }
});
