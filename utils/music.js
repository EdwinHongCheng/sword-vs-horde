let gameMusic = new Audio("./music/save-our-planet.mp3");

// [WORKS] Loops Music
gameMusic.addEventListener('ended', function() {
  this.currentTime = 0;
  this.play();
}, false);


// [WORKS] Pause/Play Music
window.addEventListener('keydown', function(e) {
  // "G" = keyCode 71
  if (e.keyCode === 71 && currentState === 2 && !gameOver && !pauseGame) {
    gameMusic.muted = !gameMusic.muted;
  }
});

// [WORKS] Restart Music
function handleGameMusic() {
  if (gameOver || beatEntireGame) {
    gameMusic.pause();
    pauseMusic = false;
    playingMusic = false;
    gameMusic.currentTime = 0;
  }
}


