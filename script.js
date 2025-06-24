const boardElement = document.getElementById("board");
const resetButton = document.getElementById("reset");

let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""]; // Empty board

// Function to create the game grid
function createBoard() {
    boardElement.innerHTML = ""; // Clear existing board
    gameBoard.forEach((cell, index) => {
        const cellDiv = document.createElement("div");
        cellDiv.textContent = cell;
        cellDiv.addEventListener("click", () => handleCellClick(index));
        boardElement.appendChild(cellDiv);
    });
}

// Handle player click on a cell
function handleCellClick(index) {
    if (gameBoard[index] === "" && !checkWinner()) {
        gameBoard[index] = currentPlayer;
        currentPlayer = currentPlayer === "X" ? "O" : "X"; // Switch player
        createBoard(); // Update the board
        checkWinner(); // Check if there's a winner
    }
}

// Check if there's a winner
function checkWinner() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            alert(`${gameBoard[a]} wins!`);
            resetGame();
            return true;
        }
    }

    if (gameBoard.every(cell => cell !== "")) {
        alert("It's a tie!");
        resetGame();
        return true;
    }

    return false;
}

// Reset the game
function resetGame() {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    createBoard();
}

// Initial game setup
createBoard();

// Reset button functionality
resetButton.addEventListener("click", resetGame);
