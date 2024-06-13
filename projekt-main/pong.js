const canvas = document.getElementById("pongCanvas");
const ctx = canvas.getContext("2d");

// Ball
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    speed: 5,
    dx: 5,
    dy: 5
};

// Paddle
const paddleWidth = 10;
const paddleHeight = 100;

const player = {
    x: 0,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    dy: 0
};

const computer = {
    x: canvas.width - paddleWidth,
    y: canvas.height / 2 - paddleHeight / 10,
    width: paddleWidth,
    height: paddleHeight,
    dy: 0
};

// Draw the ball
function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.closePath();
}

// Draw paddles
function drawPaddle(x, y, width, height) {
    ctx.fillStyle = "#fff";
    ctx.fillRect(x, y, width, height);
}

// Move paddles
function movePaddles() {
    player.y += player.dy;
    computer.y += computer.dy;

    // Prevent paddles from going out of bounds
    if (player.y < 0) {
        player.y = 0;
    } else if (player.y + player.height > canvas.height) {
        player.y = canvas.height - player.height;
    }

    if (computer.y < 0) {
        computer.y = 0;
    } else if (computer.y + computer.height > canvas.height) {
        computer.y = canvas.height - computer.height;
    }
}

// Move ball
function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Ball collision with top and bottom walls
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.dy *= -1;
    }

    // Ball collision with paddles
    if (
        (ball.x - ball.radius < player.x + player.width && ball.y > player.y && ball.y < player.y + player.height) ||
        (ball.x + ball.radius > computer.x && ball.y > computer.y && ball.y < computer.y + computer.height)
    ) {
        ball.dx *= -1;
    }

    // Reset ball if it goes out of bounds
    if (ball.x - ball.radius < 0) {
        resetBall();
    } else if (ball.x + ball.radius > canvas.width) {
        resetBall();
    }
}

// Reset ball to center
function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = 5 * (Math.random() > 0.5 ? 1 : -1);
    ball.dy = 5 * (Math.random() > 0.5 ? 1 : -1);
}

// Update the game
function update() {
    movePaddles();
    moveBall();
}

// Draw everything
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle(player.x, player.y, player.width, player.height);
    drawPaddle(computer.x, computer.y, computer.width, computer.height);
}

// Game loop
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Control the player paddle
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") {
        player.dy = -6;
    } else if (e.key === "ArrowDown") {
        player.dy = 6;
    }
});

document.addEventListener("keyup", (e) => {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        player.dy = 0;
    }
});

// Start the game
resetBall();
gameLoop();
