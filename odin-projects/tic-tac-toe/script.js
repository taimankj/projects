function Player(name, marker) {
  let wins = 0;

  const getWins = () => wins;
  const addWin = () => wins++;
  const getMarker = () => marker;

  return { name, getMarker, getWins, addWin };
}

function Gameboard() {
  //  [x][y]
  //    x - row position
  //    y - column position
  //  board with index on each spot
  //    [0][0] | [0][1] | [0][2]
  //    [1][0] | [1][1] | [1][2]
  //    [2][0] | [2][1] | [2][2]
  let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  //  rows and cols are used to grab/set board spots
  //  arguments for getBoardPos/setBoardPos will be as such
  //    'TOP', 'LEFT'
  //    'TOP', 'MIDDLE',
  //    'TOP', 'RIGHT',
  //    ...
  //    'BOTTOM', 'RIGHT'
  const rows = {
    TOP: 0,
    MIDDLE: 1,
    BOTTOM: 2,
  };

  const cols = {
    LEFT: 0,
    MIDDLE: 1,
    RIGHT: 2,
  };

  const getBoardPos = (rowPos, colPos) => {
    if (
      Object.getPrototypeOf(rowPos) === Number.prototype &&
      Object.getPrototypeOf(colPos) === Number.prototype
    ) {
      return board[rowPos][colPos];
    }
    return board[rows[rowPos]][cols[colPos]];
  };

  const setBoardPos = (rowPos, colPos, player) => {
    if (board[rows[rowPos]][cols[colPos]] != "") {
      console.log("Spot taken!");
      return;
    }
    board[rows[rowPos]][cols[colPos]] = player;
  };

  const displayBoard = () => {
    for (let i = 0; i < board.length; i++) {
      let currLine = "";

      for (let j = 0; j < board[i].length; j++) {
        let curr = board[i][j];
        let onLastEle = j === board[i].length - 1;
        let isCurrEmpty = Object.getPrototypeOf(curr) === String.prototype;
        currLine += `${!isCurrEmpty ? curr.getMarker() : "[]"} ${!onLastEle ? "|" : ""} `;
      }

      console.log(currLine);
    }
  };

  const resetBoard = () => {
    for (const propRow in rows) {
      for (const propCol in cols) {
        board[rows[propRow]][cols[propCol]] = "";
      }
    }
  };

  return { getBoardPos, setBoardPos, displayBoard, resetBoard, rows, cols };
}

const GameControl = (() => {
  let ttt = Gameboard();

  const checkColumnAndRow = (rowPos, colPos, move) => {
    //  checking row from rowPos-LEFT to rowPos-RIGHT
    for (const col in ttt.cols) {
      // grabs the move in the first position to check
      let spot = ttt.getBoardPos(rowPos, `${col}`);

      // checks if the spot is empty and if so, end row check
      if (Object.getPrototypeOf(spot) === String.prototype) {
        break;
      }

      // spot contains a player's move; now we check if the move (player) is different, so we can break early from mismatches (i.e. no win in the row)
      if (spot.getMarker().localeCompare(move.getMarker()) != 0) {
        break;
      }

      // if this is true last position has been reached and nothing went wrong, resulting in a win; so return true
      if (`${col}`.localeCompare("RIGHT") == 0) {
        console.log(
          `Win found on ${rowPos} row. Congratulations ${move.name}!`,
        );
        return true;
      }
    }

    // checking column from TOP-colPos to BOTTOM-colPos
    for (const row in ttt.rows) {
      let spot = ttt.getBoardPos(`${row}`, colPos);
      if (Object.getPrototypeOf(spot) === String.prototype) {
        break;
      }
      if (spot.getMarker().localeCompare(move.getMarker()) != 0) {
        break;
      }
      if (`${row}`.localeCompare("BOTTOM") == 0) {
        console.log(
          `Win found on ${colPos} column. Congratulations ${move.name}!`,
        );
        return true;
      }
    }

    // return false when code reaches here (no wins)
    return false;
  };

  const checkLeftDiagonal = (move) => {
    for (let i = 0; i < 3; i++) {
      let spot = ttt.getBoardPos(i, i);
      if (Object.getPrototypeOf(spot) === String.prototype) {
        break;
      }
      if (spot.getMarker().localeCompare(move.getMarker()) != 0) {
        break;
      }
      if (i == 2) {
        console.log(
          `Win found on left diagonal. Congratulations ${move.name}!`,
        );
        return true;
      }
    }
    return false;
  };

  const checkRightDiagonal = (move) => {
    for (let i = 0; i < 3; i++) {
      let spot = ttt.getBoardPos(i, 3 - (i + 1));
      if (Object.getPrototypeOf(spot) === String.prototype) {
        break;
      }
      if (spot.getMarker().localeCompare(move.getMarker()) != 0) {
        break;
      }
      if (i == 2) {
        console.log(
          `Win found on right diagonal. Congratulations ${move.name}!`,
        );
        return true;
      }
    }
    return false;
  };

  const checkCenter = (move) => {
    return checkLeftDiagonal(move) ? true : checkRightDiagonal(move);
  };

  const checkWinner = (rowPos, colPos) => {
    let winFound = false;
    const move = ttt.getBoardPos(rowPos, colPos);

    //  check if move is empty and if empty, return winFound (false)
    if (Object.getPrototypeOf(move) === String.prototype) {
      return winFound;
    }

    //  wherever a move may be made, the row and col of that spot will be checked for a win
    //  depending on the spot both or only one diagonal may be checked
    //    spot is the center - check both diagonals
    //    spot is a corner
    //      spot is a top-left or bottom-right corner
    //      spot is a top-right or bottom-left corner
    winFound = checkColumnAndRow(rowPos, colPos, move);
    if (winFound) {
      return winFound;
    }

    const rowIndex = ttt.rows[rowPos];
    const colIndex = ttt.cols[colPos];
    // check if move is on center (checks left and right diagonal - \ and /)
    if (rowIndex * colIndex == 1) {
      return checkCenter(move);
    }

    // check if move is on top-left or bottom-right corner (checks left diagonal - \)
    if (rowIndex + colIndex == 0 || rowIndex + colIndex == 4) {
      return checkLeftDiagonal(move);
    }

    // check if move is on top-right or bottom-left corner (checks right diagonal - /)
    if (rowIndex + colIndex == 2) {
      return checkRightDiagonal(move);
    }

    // no diagonal check applies and no wins found on the column or row
    // so return false
    return false;
  };

  const resetGame = () => {
    ttt.resetBoard();
  };

  return {
    setBoardPos: ttt.setBoardPos,
    displayBoard: ttt.displayBoard,
    checkWinner,
    resetGame,
    checkColumnAndRow,
  };
})();

// Test
const me = Player("keoni", "x");
const npc = Player("npc", "o");
// ========================================
// PLAYER TESTS
// ========================================

console.log("===== PLAYER TESTS =====");

console.log(me.name); // keoni
console.log(me.getMarker()); // x
console.log(me.getWins()); // 0

me.addWin();

console.log(me.getWins()); // 1

me.addWin();

console.log(me.getWins()); // 2

// ========================================
// NO WIN YET
// ========================================

console.log("\n===== NO WIN TEST =====");

GameControl.resetGame();

GameControl.setBoardPos("TOP", "LEFT", me);
GameControl.displayBoard();

console.log("Winner:", GameControl.checkWinner("TOP", "LEFT")); // false

// ========================================
// TOP ROW WIN
// ========================================

console.log("\n===== TOP ROW WIN =====");

GameControl.resetGame();

GameControl.setBoardPos("TOP", "LEFT", me);
GameControl.displayBoard();

GameControl.setBoardPos("MIDDLE", "LEFT", npc);
GameControl.displayBoard();

GameControl.setBoardPos("TOP", "MIDDLE", me);
GameControl.displayBoard();

GameControl.setBoardPos("MIDDLE", "MIDDLE", npc);
GameControl.displayBoard();

GameControl.setBoardPos("TOP", "RIGHT", me);
GameControl.displayBoard();

console.log("Winner:", GameControl.checkWinner("TOP", "RIGHT")); // true

// ========================================
// MIDDLE ROW WIN
// ========================================

console.log("\n===== MIDDLE ROW WIN =====");

GameControl.resetGame();

GameControl.setBoardPos("MIDDLE", "LEFT", npc);
GameControl.displayBoard();

GameControl.setBoardPos("TOP", "LEFT", me);
GameControl.displayBoard();

GameControl.setBoardPos("MIDDLE", "MIDDLE", npc);
GameControl.displayBoard();

GameControl.setBoardPos("TOP", "MIDDLE", me);
GameControl.displayBoard();

GameControl.setBoardPos("MIDDLE", "RIGHT", npc);
GameControl.displayBoard();

console.log("Winner:", GameControl.checkWinner("MIDDLE", "RIGHT")); // true

// ========================================
// BOTTOM ROW WIN
// ========================================

console.log("\n===== BOTTOM ROW WIN =====");

GameControl.resetGame();

GameControl.setBoardPos("BOTTOM", "LEFT", me);
GameControl.displayBoard();

GameControl.setBoardPos("TOP", "LEFT", npc);
GameControl.displayBoard();

GameControl.setBoardPos("BOTTOM", "MIDDLE", me);
GameControl.displayBoard();

GameControl.setBoardPos("TOP", "MIDDLE", npc);
GameControl.displayBoard();

GameControl.setBoardPos("BOTTOM", "RIGHT", me);
GameControl.displayBoard();

console.log("Winner:", GameControl.checkWinner("BOTTOM", "RIGHT")); // true

// ========================================
// LEFT COLUMN WIN
// ========================================

console.log("\n===== LEFT COLUMN WIN =====");

GameControl.resetGame();

GameControl.setBoardPos("TOP", "LEFT", me);
GameControl.displayBoard();

GameControl.setBoardPos("TOP", "MIDDLE", npc);
GameControl.displayBoard();

GameControl.setBoardPos("MIDDLE", "LEFT", me);
GameControl.displayBoard();

GameControl.setBoardPos("MIDDLE", "MIDDLE", npc);
GameControl.displayBoard();

GameControl.setBoardPos("BOTTOM", "LEFT", me);
GameControl.displayBoard();

console.log("Winner:", GameControl.checkWinner("BOTTOM", "LEFT")); // true

// ========================================
// MIDDLE COLUMN WIN
// ========================================

console.log("\n===== MIDDLE COLUMN WIN =====");

GameControl.resetGame();

GameControl.setBoardPos("TOP", "MIDDLE", npc);
GameControl.displayBoard();

GameControl.setBoardPos("TOP", "LEFT", me);
GameControl.displayBoard();

GameControl.setBoardPos("MIDDLE", "MIDDLE", npc);
GameControl.displayBoard();

GameControl.setBoardPos("MIDDLE", "LEFT", me);
GameControl.displayBoard();

GameControl.setBoardPos("BOTTOM", "MIDDLE", npc);
GameControl.displayBoard();

console.log("Winner:", GameControl.checkWinner("BOTTOM", "MIDDLE")); // true

// ========================================
// RIGHT COLUMN WIN
// ========================================

console.log("\n===== RIGHT COLUMN WIN =====");

GameControl.resetGame();

GameControl.setBoardPos("TOP", "RIGHT", me);
GameControl.displayBoard();

GameControl.setBoardPos("TOP", "LEFT", npc);
GameControl.displayBoard();

GameControl.setBoardPos("MIDDLE", "RIGHT", me);
GameControl.displayBoard();

GameControl.setBoardPos("MIDDLE", "LEFT", npc);
GameControl.displayBoard();

GameControl.setBoardPos("BOTTOM", "RIGHT", me);
GameControl.displayBoard();

console.log("Winner:", GameControl.checkWinner("BOTTOM", "RIGHT")); // true

// ========================================
// LEFT DIAGONAL WIN
// TOP-LEFT -> CENTER -> BOTTOM-RIGHT
// ========================================

console.log("\n===== LEFT DIAGONAL WIN =====");

GameControl.resetGame();

GameControl.setBoardPos("TOP", "LEFT", me);
GameControl.displayBoard();

GameControl.setBoardPos("TOP", "MIDDLE", npc);
GameControl.displayBoard();

GameControl.setBoardPos("MIDDLE", "MIDDLE", me);
GameControl.displayBoard();

GameControl.setBoardPos("MIDDLE", "LEFT", npc);
GameControl.displayBoard();

GameControl.setBoardPos("BOTTOM", "RIGHT", me);
GameControl.displayBoard();

console.log("Winner:", GameControl.checkWinner("BOTTOM", "RIGHT")); // true

// ========================================
// RIGHT DIAGONAL WIN
// TOP-RIGHT -> CENTER -> BOTTOM-LEFT
// ========================================

console.log("\n===== RIGHT DIAGONAL WIN =====");

GameControl.resetGame();

GameControl.setBoardPos("TOP", "RIGHT", npc);
GameControl.displayBoard();

GameControl.setBoardPos("TOP", "LEFT", me);
GameControl.displayBoard();

GameControl.setBoardPos("MIDDLE", "MIDDLE", npc);
GameControl.displayBoard();

GameControl.setBoardPos("MIDDLE", "LEFT", me);
GameControl.displayBoard();

GameControl.setBoardPos("BOTTOM", "LEFT", npc);
GameControl.displayBoard();

console.log("Winner:", GameControl.checkWinner("BOTTOM", "LEFT")); // true

// ========================================
// CENTER MOVE DIAGONAL TEST
// ========================================

console.log("\n===== CENTER DIAGONAL TEST =====");

GameControl.resetGame();

GameControl.setBoardPos("TOP", "LEFT", me);
GameControl.setBoardPos("MIDDLE", "MIDDLE", me);
GameControl.setBoardPos("BOTTOM", "RIGHT", me);

GameControl.displayBoard();

console.log("Winner:", GameControl.checkWinner("MIDDLE", "MIDDLE")); // true

// ========================================
// SPOT ALREADY TAKEN
// ========================================

console.log("\n===== SPOT TAKEN TEST =====");

GameControl.resetGame();

GameControl.setBoardPos("TOP", "LEFT", me);
GameControl.displayBoard();

GameControl.setBoardPos("TOP", "LEFT", npc);
// Expected console:
// Spot taken!

GameControl.displayBoard();

// TOP LEFT should still be x

// ========================================
// DRAW / FULL BOARD WITH NO WIN
// ========================================

console.log("\n===== DRAW TEST =====");

GameControl.resetGame();

GameControl.setBoardPos("TOP", "LEFT", me);
GameControl.displayBoard();

GameControl.setBoardPos("TOP", "MIDDLE", npc);
GameControl.displayBoard();

GameControl.setBoardPos("TOP", "RIGHT", me);
GameControl.displayBoard();

GameControl.setBoardPos("MIDDLE", "LEFT", me);
GameControl.displayBoard();

GameControl.setBoardPos("MIDDLE", "MIDDLE", npc);
GameControl.displayBoard();

GameControl.setBoardPos("MIDDLE", "RIGHT", npc);
GameControl.displayBoard();

GameControl.setBoardPos("BOTTOM", "LEFT", npc);
GameControl.displayBoard();

GameControl.setBoardPos("BOTTOM", "MIDDLE", me);
GameControl.displayBoard();

GameControl.setBoardPos("BOTTOM", "RIGHT", me);
GameControl.displayBoard();

console.log("Winner:", GameControl.checkWinner("BOTTOM", "RIGHT")); // false
