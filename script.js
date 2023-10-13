//your code here
const gameContainer = document.getElementById("gameContainer");
const scoreBoard = document.createElement("div");
scoreBoard.classList.add("scoreBoard");
scoreBoard.textContent = "Score: 0";
document.body.appendChild(scoreBoard);

let snake = [{ row: 20, col: 1 }];
let direction = "right";
let food = generateFood();
let score = 0;

function generateFood() {
    const foodPixel = document.createElement("div");
    foodPixel.classList.add("food");
    const randomRow = Math.floor(Math.random() * 40);
    const randomCol = Math.floor(Math.random() * 40);
    foodPixel.id = `pixel:${randomRow}-${randomCol}`;
    gameContainer.appendChild(foodPixel);
    return { row: randomRow, col: randomCol };
}

function updateGame() {
    const head = { ...snake[0] };

    switch (direction) {
        case "up":
            head.row--;
            break;
        case "down":
            head.row++;
            break;
        case "left":
            head.col--;
            break;
        case "right":
            head.col++;
            break;
    }

    snake.unshift(head);

    if (head.row === food.row && head.col === food.col) {
        score += 10;
        scoreBoard.textContent = `Score: ${score}`;
        gameContainer.removeChild(document.getElementById(`pixel:${food.row}-${food.col}`));
        food = generateFood();
    } else {
        snake.pop();
    }

    if (head.row < 0 || head.row >= 40 || head.col < 0 || head.col >= 40) {
        clearInterval(gameInterval);
        alert("Game Over!");
    }

    // Update the game container to reflect the changes in the snake's position
    renderGame();
}

function renderGame() {
    gameContainer.innerHTML = "";

    snake.forEach((segment, index) => {
        const segmentPixel = document.createElement("div");
        segmentPixel.classList.add("snakeBodyPixel");
        segmentPixel.id = `pixel:${segment.row}-${segment.col}`;
        gameContainer.appendChild(segmentPixel);
    });

    const foodPixel = document.createElement("div");
    foodPixel.classList.add("food");
    foodPixel.id = `pixel:${food.row}-${food.col}`;
    gameContainer.appendChild(foodPixel);
}

document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowUp":
            if (direction !== "down") direction = "up";
            break;
        case "ArrowDown":
            if (direction !== "up") direction = "down";
            break;
        case "ArrowLeft":
            if (direction !== "right") direction = "left";
            break;
        case "ArrowRight":
            if (direction !== "left") direction = "right";
            break;
    }
});

const gameInterval = setInterval(updateGame, 100);
