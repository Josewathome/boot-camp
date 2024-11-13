// game.js

let canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 500;

let birdY = 250;
let gravity = 3;
let jump = -7;
let pipeSpeed = 5;
let pipeGap = 120;
let pipes = [];
let score = 0;
let isGameOver = false;

// Settings modal elements
let settingsBtn = document.getElementById('settingsBtn');
let settingsModal = document.getElementById('settingsModal');
let closeBtn = document.querySelector('.close');
let gravitySlider = document.getElementById('gravitySlider');
let speedSlider = document.getElementById('speedSlider');
let gapSlider = document.getElementById('gapSlider');
let applySettingsBtn = document.getElementById('applySettings');

// Show settings modal
settingsBtn.onclick = function () {
    settingsModal.style.display = 'block';
};

// Hide settings modal
closeBtn.onclick = function () {
    settingsModal.style.display = 'none';
};

window.onclick = function (event) {
    if (event.target === settingsModal) {
        settingsModal.style.display = 'none';
    }
};

// Apply settings from modal
applySettingsBtn.onclick = function () {
    gravity = parseInt(gravitySlider.value);
    pipeSpeed = parseInt(speedSlider.value);
    pipeGap = parseInt(gapSlider.value);
    settingsModal.style.display = 'none';
};

// Draw the bird
function drawBird() {
    ctx.fillStyle = "yellow";
    ctx.fillRect(50, birdY, 30, 30);  // Bird dimensions
}

// Draw pipes
function drawPipes() {
    ctx.fillStyle = "green";
    pipes.forEach(pipe => {
        ctx.fillRect(pipe[0], 0, 80, pipe[1] - pipeGap / 2);  // Upper pipe
        ctx.fillRect(pipe[0], pipe[1] + pipeGap / 2, 80, canvas.height - pipe[1]);  // Lower pipe
    });
}

// Update game state
function updateGame() {
    if (isGameOver) return;

    // Bird falls due to gravity
    birdY += gravity;

    // Move pipes and check if we need a new one
    pipes.forEach(pipe => pipe[0] -= pipeSpeed);
    if (pipes.length === 0 || pipes[pipes.length - 1][0] < 250) {
        let pipeHeight = Math.floor(Math.random() * (300 - 100 + 1) + 100);
        pipes.push([canvas.width, pipeHeight]);
    }

    // Remove pipes that move out of screen
    pipes = pipes.filter(pipe => pipe[0] > -80);

    // Collision detection
    pipes.forEach(pipe => {
        if (pipe[0] < 80 && pipe[0] > 20) {
            if (birdY < pipe[1] - pipeGap / 2 || birdY > pipe[1] + pipeGap / 2) {
                isGameOver = true;
            }
        }
    });
    if (birdY < 0 || birdY > canvas.height) {
        isGameOver = true;
    }

    // Update score
    score++;
    document.getElementById('score').textContent = `Score: ${Math.floor(score / 10)}`;

    // Redraw the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBird();
    drawPipes();
}

// Control: Click anywhere to make the bird flap
canvas.addEventListener('click', flap);
document.addEventListener('keydown', function (e) {
    if (e.code === 'Space') flap();
});

function flap() {
    if (!isGameOver) birdY += jump;
}

// Run the game loop
setInterval(updateGame, 30);
