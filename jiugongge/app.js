/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const blockWidth = 200;
const PI = Math.PI;
const PI2 = Math.PI * 2;
const color = {
    red: "#F74456",
    white: "#fff",
    yellow: "#F1DA56",
    blue: "#036FAF"
};

canvas.width = blockWidth * 3;
canvas.height = blockWidth * 3;
/**
 * draw canvas in block
 * @name Draw
 * @function
 */

/**
 * @param  {Object} position block position x,y
 * @param  {String} bgColor block background color
 * @param  {Draw} draw callback function draw canvas in block
 * @param  {Number} time execute times
 */
function drawBlock(position, bgColor, draw, time) {
    ctx.save();
    ctx.translate(position.x * blockWidth, position.y * blockWidth);
    ctx.rect(0, 0, blockWidth, blockWidth);
    ctx.fillStyle = bgColor;
    ctx.fill();
    ctx.translate(100, 100);
    draw();
    ctx.restore();
}

function drawLeftTop() {
    drawBlock(
        { x: 0, y: 0 },
        color.blue,
        () => {
            const stime = parseInt(time / 20);
            ctx.beginPath();
            ctx.arc(0, 0, 30 / ((stime % 3) + 1), 0, PI2);
            ctx.lineWidth = 15;
            ctx.strokeStyle = color.white;
            ctx.stroke();

            for (let i = 0; i < 8; i++) {
                ctx.beginPath();
                ctx.fillStyle = stime % 8 === i ? color.red : color.white;
                ctx.rotate(PI2 / 8);
                if ((i + stime) % 4 === 0) continue;
                ctx.fillRect(60, -4, 20, 10);
            }
        },
        time
    );
}

function drawCenterTop() {
    drawBlock(
        { x: 1, y: 0 },
        color.red,
        () => {
            const stime = parseInt(time / 20);
            ctx.save();
            ctx.scale(0.8, 0.8);
            ctx.translate(-60, -60);
            for (let xtimes = 0; xtimes < 3; xtimes++) {
                ctx.save();
                for (let ytimes = 0; ytimes < 3; ytimes++) {
                    ctx.beginPath();
                    ctx.arc(0, 0, 20, 0, PI2);
                    ctx.fillStyle =
                        (ytimes + xtimes * 2 + stime) % 5 === 0
                            ? color.yellow
                            : color.white;
                    ctx.fill();
                    ctx.translate(0, 60);
                }
                ctx.restore();
                ctx.translate(60, 0);
            }
            ctx.restore();
        },
        time
    );
}

let time = 0;

function drawAll() {
    time = time > 100000 ? 0 : time + 1;
    drawLeftTop();
    drawCenterTop();
    requestAnimationFrame(drawAll);
}

requestAnimationFrame(drawAll);
