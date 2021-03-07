let gameMusic = new Audio("./music/save-our-planet.mp3");

// [WORKS] loop music
gameMusic.addEventListener('ended', function() {
  this.currentTime = 0;
  this.play();
}, false);
