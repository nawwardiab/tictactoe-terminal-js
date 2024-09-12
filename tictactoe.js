import readlineSync from "readline-sync";
import chalk from "chalk";

// Initialize the board as a 3x3 grid with empty cells
let gameBoard = [
  ["-", "-", "-"],
  ["-", "-", "-"],
  ["-", "-", "-"],
];

// Display the current state of the board
function displayBoard(board) {
  // Convert each row to a string with ' | ' between cells
  const rows = board.map((row) => row.join(" | "));
  // Join rows with a separator between each row
  console.log(rows.join("\n=========\n"));
}

// Get the player's move from the user
function getPlayerMove(player) {
  // Prompt the player for their move
  const move = readlineSync.question(
    `Player ${player}, enter your move (row column): `
  );
  // Split the input into row and column, then convert to 0-based index
  const [row, col] = move.split(" ").map(Number);
  return { row: row - 1, col: col - 1 };
}

// Validate the move to ensure it's within the board and the cell is empty
function isValidMove(board, row, col) {
  return (
    row >= 0 &&
    row < 3 && // Check row index
    col >= 0 &&
    col < 3 && // Check column index
    board[row][col] === "-" // Check if cell is empty
  );
}

// Place the player's marker on the board at the specified location
function placeMarker(board, row, col, marker) {
  board[row][col] = marker;
}

// Check if there is a winning condition on the board
function checkWin(board) {
  // Define all possible winning lines (rows, columns, diagonals)
  const lines = [
    // Rows
    [board[0][0], board[0][1], board[0][2]],
    [board[1][0], board[1][1], board[1][2]],
    [board[2][0], board[2][1], board[2][2]],
    // Columns
    [board[0][0], board[1][0], board[2][0]],
    [board[0][1], board[1][1], board[2][1]],
    [board[0][2], board[1][2], board[2][2]],
    // Diagonals
    [board[0][0], board[1][1], board[2][2]],
    [board[0][2], board[1][1], board[2][0]],
  ];

  // Check each line for a winning condition
  for (const [a, b, c] of lines) {
    if (a !== "-" && a === b && a === c) {
      return a; // Return the winning marker
    }
  }

  return null; // No winner
}

// Check if the board is completely filled
function isBoardFull(board) {
  return board.flat().every((cell) => cell !== "-");
}

// Handle the end of the game by asking if the players want to restart
function handleGameEnd() {
  const restartChoice = readlineSync
    .question("Do you want to restart the game? (yes/no): ")
    .toLowerCase();

  if (restartChoice === "yes") {
    // Reset the board to the initial state
    gameBoard = [
      ["-", "-", "-"],
      ["-", "-", "-"],
      ["-", "-", "-"],
    ];
    return true; // Restart the game
  } else {
    console.log(chalk.yellow("Thanks for playing!"));
    return false; // End the program
  }
}

// Main function to play the game
function playGame() {
  let currentPlayer = "X"; // Start with Player X
  let gameActive = true; // Flag to control the game loop

  while (gameActive) {
    displayBoard(gameBoard); // Show the current board
    const { row, col } = getPlayerMove(currentPlayer); // Get the move from the current player

    if (isValidMove(gameBoard, row, col)) {
      placeMarker(gameBoard, row, col, currentPlayer); // Place the marker on the board

      const winner = checkWin(gameBoard); // Check if there is a winner

      if (winner) {
        displayBoard(gameBoard); // Show the final board
        console.log(chalk.green(`Player ${winner} wins!`)); // Announce the winner
        gameActive = false; // End the game
      } else if (isBoardFull(gameBoard)) {
        displayBoard(gameBoard); // Show the final board
        console.log(chalk.blue("The game is a draw!")); // Announce a draw
        gameActive = false; // End the game
      } else {
        // Switch to the other player
        currentPlayer = currentPlayer === "X" ? "O" : "X";
      }
    } else {
      console.log(chalk.red("Invalid move. Try again.")); // Notify the player of an invalid move
    }
  }

  // Handle the end of the game, either restarting or quitting
  if (handleGameEnd()) {
    playGame(); // Restart the game
  }
}
// Intro & rules function
const displayRules = () => {
  console.log(chalk.gray("\nRules of the Game:"));
  console.log(chalk.gray("1. The game is played on a 3x3 grid."));
  console.log(chalk.gray("2. Player 1 uses 'X' and Player 2 uses 'O'."));
  console.log(
    chalk.gray("3. Players take turns to place their marker on an empty cell.")
  );
  console.log(
    chalk.gray(
      "4. The first player to align three of their markers in a row, column, or diagonal wins."
    )
  );
  console.log(
    chalk.gray(
      "5. The game ends in a draw if all cells are filled and no player has won."
    )
  );
  console.log(
    chalk.gray(
      "6. Enter your move as 'row column' (e.g., '1 1' for the top-left cell)."
    )
  );
  console.log(chalk.gray("\n=========================================\n"));
};

// Start the game
console.log(chalk.blue.bold("Welcome to Tic-Tac-Toe!"));

displayRules(); // Display rules before starting the game
playGame(); // Start the main game function
