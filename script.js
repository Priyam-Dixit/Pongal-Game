// script.js
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const paddleWidth = 10, paddleHeight = 80;
let ballX = canvas.width / 2, ballY = canvas.height / 2;
let ballSpeedX = 5, ballSpeedY = 5;
let paddle1Y = canvas.height / 2 - paddleHeight / 2;
let paddle2Y = canvas.height / 2 - paddleHeight / 2;
const paddleSpeed = 6;

function drawRect(x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

function drawBall(x, y, radius, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
}

function update() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    
    if (ballY <= 0 || ballY >= canvas.height) {
        ballSpeedY = -ballSpeedY;
    }
    
    if (ballX <= paddleWidth && ballY > paddle1Y && ballY < paddle1Y + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }
    if (ballX >= canvas.width - paddleWidth && ballY > paddle2Y && ballY < paddle2Y + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }
    
    if (ballX < 0 || ballX > canvas.width) {
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
        ballSpeedX = -ballSpeedX;
    }

    // AI for right paddle (follows ball)
    let paddleCenter = paddle2Y + paddleHeight / 2;
    if (paddleCenter < ballY - 10) {
        paddle2Y += paddleSpeed;
    } else if (paddleCenter > ballY + 10) {
        paddle2Y -= paddleSpeed;
    }
}

function draw() {
    drawRect(0, 0, canvas.width, canvas.height, "black");
    drawRect(0, paddle1Y, paddleWidth, paddleHeight, "white");
    drawRect(canvas.width - paddleWidth, paddle2Y, paddleWidth, paddleHeight, "white");
    drawBall(ballX, ballY, 10, "white");
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowUp" && paddle1Y > 0) paddle1Y -= paddleSpeed;
    if (event.key === "ArrowDown" && paddle1Y < canvas.height - paddleHeight) paddle1Y += paddleSpeed;
});

gameLoop();