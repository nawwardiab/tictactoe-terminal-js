import readlineSync from "readline-sync";
import chalk from "chalk";

// Initialize the board as a 3x3 grid with empty cells
let gameBoard = [
  ["-", "-", "-"],
  ["-", "-", "-"],
  ["-", "-", "-"],
];

// Player names and scores
let playerNames = {};
let playerScores = { X: 0, O: 0 };

// Display the current state of the board
function displayBoard(board) {
  const rows = board.map((row) => row.join(" | "));
  console.log(rows.join("\n=========\n"));
}

// Get player names
function getPlayerNames() {
  playerNames.X = readlineSync.question(
    chalk.cyan("Enter the name of Player 1 (X): ")
  );
  if (gameMode === "p") {
    playerNames.O = readlineSync.question(
      chalk.cyan("Enter the name of Player 2 (O): ")
    );
  } else {
    playerNames.O = "Computer"; // Assign a default name for Player 2 in computer mode
  }
}

// Get the game mode
function getGameMode() {
  const mode = readlineSync.question(
    chalk.magenta(
      "Do you want to play against another player or against the computer? (p/c): "
    )
  );
  return mode.toLowerCase();
}

// Get the player's move from the user
function getPlayerMove(player) {
  const move = readlineSync.question(
    chalk.yellow(`${playerNames[player]}, enter your move (row column): `)
  );
  const [row, col] = move.split(" ").map(Number);
  return { row: row - 1, col: col - 1 };
}

// Function for computer to make a move
function getComputerMove() {
  let row, col;
  do {
    row = Math.floor(Math.random() * 3);
    col = Math.floor(Math.random() * 3);
  } while (!isValidMove(gameBoard, row, col));
  console.log(chalk.magenta(`Computer chooses move: ${row + 1} ${col + 1}`));
  return { row, col };
}

// Validate the move to ensure it's within the board and the cell is empty
function isValidMove(board, row, col) {
  return row >= 0 && row < 3 && col >= 0 && col < 3 && board[row][col] === "-";
}

// Place the player's marker on the board at the specified location
function placeMarker(board, row, col, marker) {
  board[row][col] = marker;
}

// Check if there is a winning condition on the board
function checkWin(board) {
  const lines = [
    [board[0][0], board[0][1], board[0][2]],
    [board[1][0], board[1][1], board[1][2]],
    [board[2][0], board[2][1], board[2][2]],
    [board[0][0], board[1][0], board[2][0]],
    [board[0][1], board[1][1], board[2][1]],
    [board[0][2], board[1][2], board[2][2]],
    [board[0][0], board[1][1], board[2][2]],
    [board[0][2], board[1][1], board[2][0]],
  ];

  for (const [a, b, c] of lines) {
    if (a !== "-" && a === b && a === c) {
      return a;
    }
  }

  return null;
}

// Check if the board is completely filled
function isBoardFull(board) {
  return board.flat().every((cell) => cell !== "-");
}

// Handle the end of the game by asking if the players want to restart
function handleGameEnd(winner) {
  if (winner) {
    console.log(chalk.green(`${playerNames[winner]} wins!`));
    playerScores[winner]++;
  } else if (isBoardFull(gameBoard)) {
    console.log(chalk.blue("The game is a draw!"));
  }

  console.log(
    chalk.yellow(
      `Current Scores: ${playerNames.X} (X) - ${playerScores.X}, ${playerNames.O} (O) - ${playerScores.O}`
    )
  );

  const restartChoice = readlineSync
    .question(chalk.cyan("Do you want to restart the game? (y/n): "))
    .toLowerCase();

  if (restartChoice === "y") {
    gameBoard = [
      ["-", "-", "-"],
      ["-", "-", "-"],
      ["-", "-", "-"],
    ];
    return true;
  } else {
    console.log(chalk.yellow("Thanks for playing!"));
    return false;
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

// Main function to play the game
function playGame(gameMode) {
  let currentPlayer = "X";
  let gameActive = true;

  while (gameActive) {
    displayRules(); // Display rules at the start of each turn
    displayBoard(gameBoard); // Show the current board

    let row, col;
    if (gameMode === "c" && currentPlayer === "O") {
      // Computer's turn
      ({ row, col } = getComputerMove());
    } else {
      // Player's turn
      const move = getPlayerMove(currentPlayer);
      row = move.row;
      col = move.col;
    }

    if (isValidMove(gameBoard, row, col)) {
      placeMarker(gameBoard, row, col, currentPlayer); // Place the marker on the board

      const winner = checkWin(gameBoard); // Check if there is a winner

      if (winner) {
        console.clear(); // Clear the console
        displayRules(); // Display rules again after game end
        displayBoard(gameBoard); // Show the final board
        handleGameEnd(winner); // Handle end of game
        gameActive = false; // End the game
      } else if (isBoardFull(gameBoard)) {
        console.clear(); // Clear the console
        displayRules(); // Display rules again after game end
        displayBoard(gameBoard); // Show the final board
        handleGameEnd(null); // Handle end of game
        gameActive = false; // End the game
      } else {
        // Switch to the other player
        currentPlayer = currentPlayer === "X" ? "O" : "X";
      }
    } else {
      console.clear(); // Clear the console before showing invalid move message
      displayRules(); // Display rules to ensure visibility
      console.log(chalk.red("Invalid move. Try again.")); // Notify the player of an invalid move
    }
  }

  // Handle the end of the game, either restarting or quitting
  if (handleGameEnd()) {
    playGame(gameMode); // Restart the game
  }
}

// Start the game
console.log(chalk.blue.bold("Welcome to Tic-Tac-Toe!"));

// Display rules once before starting
displayRules();

// Get game mode
const gameMode = getGameMode();

// Get player names
getPlayerNames();

// Start the main game function
playGame(gameMode);
