let gameMusic = new Audio("./music/save-our-planet.mp3");

// [WORKS] Loops Music
gameMusic.addEventListener('ended', function() {
  this.currentTime = 0;
  this.play();
}, false);

// ----------------------->

// [WIP] Goal: have a "button" in Top Canvas -> click pauses/plays music

// [WORKS] Pause/Play Music
let pauseMusic = false;

window.addEventListener('keydown', function(e) {
  // "T" = keyCode 84
  if (e.keyCode === 84) {
    pauseMusic = !pauseMusic;
    if (pauseMusic) {
    gameMusic.pause();
    } else {
      gameMusic.play();
    }
  }
});

// [WIP] Goal: use Restart
// - Game Over/Beat Game -> pause Music + reset current time
// - Restart Level -> play music again

// [WORKS] Restart Music - KEY = "Y"
window.addEventListener('keydown', function(e) {
  // [KEY] "Y" = 89
  if (e.keyCode === 89) {
    gameMusic.currentTime = 0;
  }
});
