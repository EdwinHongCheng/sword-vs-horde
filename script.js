// [WIP] vid: 4:19+
const canvas = document.getElementById('canvas1');
const ctx = canvas.getConetxt('2d');
canvas.width = 640;
canvas.height = 640;

const keys = [];

const player = {
    x: 0,
    y: 0,
    width: 16,
    height: 32,
    frameX: 0,
    frameY: 0,
    speed: 9,
    moving: false
}
