function Player(name, marker) {
  let wins = 0;

  const getWins = () => wins;
  const addWin = () => wins++;
  const resetWins = () => {
    wins = 0;
  };
  const getMarker = () => marker;

  return { name, getMarker, getWins, addWin, resetWins };
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
        move.addWin();
        console.log(
          `Win found on ${rowPos} row. Congratulations ${move.name}! Curent Wins: ${move.getWins()}`,
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
        move.addWin();
        console.log(
          `Win found on ${colPos} column. Congratulations ${move.name}! Curent Wins: ${move.getWins()}`,
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
        move.addWin();
        console.log(
          `Win found on left diagonal. Congratulations ${move.name}! Curent Wins: ${move.getWins()}`,
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
        move.addWin();
        console.log(
          `Win found on right diagonal. Congratulations ${move.name}! Curent Wins: ${move.getWins()}`,
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

  const resetGame = (hardReset, playerOne, playerTwo) => {
    ttt.resetBoard();
    if (hardReset) {
      playerOne.resetWins();
      playerTwo.resetWins();
    }
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
