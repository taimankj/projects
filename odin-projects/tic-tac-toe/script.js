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

  const getBoardPos = (rowPos, colPos) => board[rows[rowPos]][cols[colPos]];

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
  };

  const resetGame = () => {
    resetBoard();
  };

  return {
    setBoardPos: ttt.setBoardPos,
    displayBoard: ttt.displayBoard,
    checkWinner,
    resetGame,
  };
})();

// Test
const me = Player("keoni", "x");
const npc = Player("npc", "o");
