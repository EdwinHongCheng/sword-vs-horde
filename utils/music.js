let gameMusic = new Audio("./music/save-our-planet.mp3");

// [WORKS] Loops Music
gameMusic.addEventListener('ended', function() {
  this.currentTime = 0;
  this.play();
}, false);


// [WORKS] Pause/Play Music
let pauseMusic = false;

window.addEventListener('keydown', function(e) {
  // "G" = keyCode 71
  if (e.keyCode === 71 && currentState === 2 && !gameOver && !pauseGame) {
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
// window.addEventListener('keydown', function(e) {
//   // [KEY] "Y" = 89
//   if (e.keyCode === 89) {
//     gameMusic.currentTime = 0;
//   }
// });

function handleGameMusic() {
  if (gameOver || beatEntireGame) {
    gameMusic.pause();
    pauseMusic = false;
    playingMusic = false;
    gameMusic.currentTime = 0;
  }
}


