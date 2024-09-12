# Tic Tac Toe

Sure! Here’s a structured `README.md` for your Tic-Tac-Toe project:

---

# Tic-Tac-Toe

Welcome to **Tic-Tac-Toe**, a classic 2-player game where you take turns to place your marker ('X' or 'O') on a 3x3 board. The game ends when one player gets three markers in a row, column, or diagonal, or if the board is full and there’s no winner.

## Project Overview

In **Tic-Tac-Toe**, the game involves:

- **Board Representation**: A 3x3 grid where players place their markers. The board updates after each move.
- **Player Interaction**: Players alternate turns, entering their move as row and column coordinates.
- **Move Validation**: Ensures moves are within the board limits and that the cell is empty before placing a marker.
- **Winning Condition**: Checks for a winning condition after each move. The game identifies if a player has achieved three markers in a row, column, or diagonal.
- **Draw Condition**: The game checks if the board is full and announces a draw if no winner is found.
- **Game Status**: Displays the board and relevant messages after each move, indicating if a player wins or if the game ends in a draw.
- **Restart Option**: After a game concludes, players can choose to restart or quit.

## Game Setup

To set up and run **Tic-Tac-Toe**, follow these steps:

1. **Clone the Repository**:

   ```bash
   git clone git@github.com:nawwardiab/tictactoe-terminal-js.git
   ```

2. **Navigate to the Project Directory**:

   ```bash
   cd tic-tac-toe
   ```

3. **Install the Required Dependencies**:

   ```bash
   npm install readline-sync
   ```

4. **Start the Game**:

   ```bash
   node index.js
   ```

5. **Follow the Prompts**: Enter your moves in the format "row column" to play the game.

## Game Examples

Here’s how the game might look in action:

1. **Starting the Game**:

   ```
   Welcome to Tic-Tac-Toe!

   Player X, it's your turn.
   Enter your move (row column): 1 1
   ```

2. **During the Game**:

   ```
   Current Board:
   - | - | -
   =========
   - | - | -
   =========
   - | - | -

   Player X, it's your turn.
   Enter your move (row column): 2 2

   Current Board:
   - | - | -
   =========
   - | X | -
   =========
   - | - | -
   ```

3. **Game End**:

   ```
   Current Board:
   X | - | -
   =========
   X | O | O
   =========
   X | - | -

   Player X wins!

   Do you want to restart the game? (yes/no):
   ```

---
