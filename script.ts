enum Player {
    None = "",
    X = "X",
    O = "O",
}

let currentPlayer: Player = Player.X;
let board: Player[] = [Player.None, Player.None, Player.None, Player.None, Player.None, Player.None, Player.None, Player.None, Player.None];
let gameWon: boolean = false;

function initBoard(): void {
    const boardElement = document.getElementById("board");
    if (boardElement) {
        for (let i = 0; i < 3; i++) {
            const row = document.createElement("div");
            row.classList.add("row");
            for (let j = 0; j < 3; j++) {
                const cell = document.createElement("div");
                cell.classList.add("cell");
                cell.setAttribute("data-index", (i * 3 + j).toString());
                cell.addEventListener("click", () => handleCellClick(i * 3 + j));
                row.appendChild(cell);
            }
            boardElement.appendChild(row);
        }
    }
}

function handleCellClick(index: number): void {
    if (gameWon || board[index] !== Player.None) return;

    board[index] = currentPlayer;
    renderBoard();

    if (checkWin()) {
        gameWon = true;
        document.getElementById("status")!.textContent = `Player ${currentPlayer} wins!`;
        return;
    }

    if (checkDraw()) {
        document.getElementById("status")!.textContent = "It's a draw!";
        return;
    }

    currentPlayer = currentPlayer === Player.X ? Player.O : Player.X;
    document.getElementById("status")!.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin(): boolean {
    const winConditions: number[][] = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (const condition of winConditions) {
        const [a, b, c] = condition;
        if (board[a] !== Player.None && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }

    return false;
}

function checkDraw(): boolean {
    return board.every(cell => cell !== Player.None);
}

function renderBoard(): void {
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell, index) => {
        cell.textContent = board[index];
    });
}

function restartGame(): void {
    currentPlayer = Player.X;
    board = [Player.None, Player.None, Player.None, Player.None, Player.None, Player.None, Player.None, Player.None, Player.None];
    gameWon = false;
    document.getElementById("status")!.textContent = `Player ${currentPlayer}'s turn`;
    renderBoard();
}

initBoard();
document.getElementById("status")!.textContent = `Player ${currentPlayer}'s turn`;
document.getElementById("restartButton")!.addEventListener("click", restartGame);
