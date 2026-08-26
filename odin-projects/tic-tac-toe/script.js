// Game
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
  //    'TOP', 'CENTER',
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
    CENTER: 1,
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
  let players = {};

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

  const checkBoardFilled = () => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let curr = ttt.getBoardPos(i, j);
        if (Object.getPrototypeOf(curr) === String.prototype) {
          return false;
        }
      }
    }
    return true;
  };

  const resetGame = (hardReset, playerOne, playerTwo) => {
    ttt.resetBoard();
    if (hardReset) {
      playerOne.resetWins();
      playerTwo.resetWins();
    }
  };

  const addPlayer = (player, marker) => {
    players[player] = new Player(player, marker);
    players["npc"] = new Player("npc", marker === "x" ? "o" : "x");
  };

  const getPlayer = (player) => players[player];

  return {
    setBoardPos: ttt.setBoardPos,
    displayBoard: ttt.displayBoard,
    checkWinner,
    resetGame,
    addPlayer,
    getPlayer,
    checkBoardFilled,
  };
})();

function loadTicTacToe(name, playerMarker) {
  const container = document.querySelector(".container");
  const playerName = document.querySelector("#player-name");

  GameControl.addPlayer(name, playerMarker);

  container.style["display"] = "grid";
  playerName.innerText = name;
}

function getNPCMoveSet(randomMove) {
  switch (randomMove) {
    case 1:
      return { row: "TOP", column: "LEFT" };
    case 2:
      return { row: "TOP", column: "CENTER" };
    case 3:
      return { row: "TOP", column: "RIGHT" };
    case 4:
      return { row: "MIDDLE", column: "LEFT" };
    case 5:
      return { row: "MIDDLE", column: "CENTER" };
    case 6:
      return { row: "MIDDLE", column: "RIGHT" };
    case 7:
      return { row: "BOTTOM", column: "LEFT" };
    case 8:
      return { row: "BOTTOM", column: "CENTER" };
    case 9:
      return { row: "BOTTOM", column: "RIGHT" };
  }
}

function getCell(boardCells, row, column) {
  let returnCell;

  boardCells.forEach((cell) => {
    if (cell.className.includes(row) && cell.className.includes(column)) {
      returnCell = cell;
    }
  });

  return returnCell;
}

function makeMove(row, column, player, cell) {
  cell.className += ` ${player.name}`;
  cell.innerText += ` ${player.getMarker()}`;
  GameControl.setBoardPos(row, column, player);
  return GameControl.checkWinner(row, column);
}

function npcMakeMove(npc, player, boardCells) {
  let moveMade = false;
  let didWin;
  while (!moveMade) {
    let randomMove = Math.floor(Math.random() * 9) + 1;
    let { row, column } = getNPCMoveSet(randomMove);
    let cell = getCell(boardCells, row, column);
    if (
      cell.className.includes(`${npc.name}`) ||
      cell.className.includes(`${player.name}`)
    ) {
      continue;
    }
    didWin = makeMove(row, column, npc, cell);
    moveMade = true;
  }
  return didWin;
}

function resetGameHTML(board) {
  board.forEach((cell) => {
    let className = cell.className.split(" ");
    let removedPlayer = className.slice(0, 3).join(" ");
    cell.className = removedPlayer;
    cell.innerText = "";
  });
}
document.querySelector("#play").addEventListener("click", (e) => {
  e.preventDefault();

  // Collect and set player info
  const choices = document.querySelectorAll('input[type="radio"]');
  const name = document.querySelector("#name").value;
  let playerMarker;
  choices.forEach((e) => {
    if (e.checked) {
      playerMarker = e.value;
    }
  });

  document.querySelector("body").removeChild(document.querySelector("form"));

  loadTicTacToe(name, playerMarker);

  // if player.getMarker() is 'o', have npc make a move
  if (GameControl.getPlayer(name).getMarker() === "o") {
    npcMakeMove(GameControl.getPlayer("npc"), GameControl.getPlayer(name));
  }

  // set event listeners for board game
  setUpGame(GameControl.getPlayer(name), GameControl.getPlayer("npc"));
});

// add event listener for all board cells
// when a board cell is clicked, player has made their move
// check for wins
// if there is a win end game and soft reset the game
// if there is no win, have npc make the next move
function setUpGame(player, npc) {
  const boardCells = document.querySelectorAll(".cell");
  const playerWins = document.querySelector("#player-wins");
  const npcWins = document.querySelector("#npc-wins");
  boardCells.forEach((cell) => {
    cell.addEventListener("click", (e) => {
      const curr = e.target;
      const row = curr.className.split(" ")[1];
      const column = curr.className.split(" ")[2];
      let didWin;

      if (
        curr.className.includes(`${player.name}`) ||
        curr.className.includes(`${npc.name}`)
      ) {
        alert("Spot taken! Choose another spot.");
        return;
      }

      didWin = makeMove(row, column, player, curr);
      if (didWin) {
        alert(`${player.name} wins!`);
        playerWins.innerText = `${player.getWins()}`;
        GameControl.resetGame(false, null, null);
        resetGameHTML(boardCells);
      } else {
        didWin = npcMakeMove(npc, player, boardCells);
        if (didWin) {
          alert(`${npc.name} wins!`);
          npcWins.innerText = `${npc.getWins()}`;
          GameControl.resetGame(false, null, null);
          resetGameHTML(boardCells);
        }
      }
    });
  });
}
