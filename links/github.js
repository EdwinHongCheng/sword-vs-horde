// [WORKS] Mini Canvas -> clicking that area -> GitHub
const githubCanvas = document.getElementById('github-canvas');
githubCanvas.addEventListener("click", function(e) {
    console.log("Clicked in the blue box !!!");
    window.open("https://github.com/EdwinHongCheng/sword-vs-horde", '_blank');
})

const ctx3 = githubCanvas.getContext('2d');
let github = new Image();
github.src = "./images/github.png";

github.onload = function() {
    ctx3.drawImage(github, 0, 0, githubCanvas.width, githubCanvas.height);
}
