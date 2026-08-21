function Player(name, marker) {
  let wins = 0;

  const getWins = () => wins;
  const addWin = () => wins++;
  const getMarker = () => marker;

  return { name, getMarker, getWins, addWin };
}

function Gameboard() {
  // [x][y]
  //    x - row position
  //    y - column position
  let board = [new Array(3), new Array(3), new Array(3)];

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
    board[rows[rowPos]][cols[colPos]] = player;
  };

  const displayBoard = () => {
    console.log(
      `${board[rows["TOP"]][cols["LEFT"]].getMarker()} | ${board[rows["TOP"]][cols["MIDDLE"]].getMarker()} | ${board[rows["TOP"]][cols["RIGHT"]].getMarker()}`,
    );
    console.log(
      `${board[rows["MIDDLE"]][cols["LEFT"]].getMarker()} | ${board[rows["MIDDLE"]][cols["MIDDLE"]].getMarker()} | ${board[rows["MIDDLE"]][cols["RIGHT"]].getMarker()}`,
    );
    console.log(
      `${board[rows["BOTTOM"]][cols["LEFT"]].getMarker()} | ${board[rows["BOTTOM"]][cols["MIDDLE"]].getMarker()} | ${board[rows["BOTTOM"]][cols["RIGHT"]].getMarker()}`,
    );
  };

  return { getBoardPos, setBoardPos, displayBoard };
}

const GameControl = (() => {
  let { getBoardPos, setBoardPos, displayBoard } = Gameboard();

  const checkWinner = () => {};

  const resetGame = () => {};

  return { setBoardPos, displayBoard, checkWinner, resetGame };
})();

// Test
const me = Player("keoni", "x");
const npc = Player("npc", "o");

GameControl.setBoardPos("TOP", "LEFT", me);
GameControl.setBoardPos("TOP", "MIDDLE", npc);
GameControl.setBoardPos("TOP", "RIGHT", me);

GameControl.setBoardPos("MIDDLE", "LEFT", npc);
GameControl.setBoardPos("MIDDLE", "MIDDLE", me);
GameControl.setBoardPos("MIDDLE", "RIGHT", npc);

GameControl.setBoardPos("BOTTOM", "LEFT", npc);
GameControl.setBoardPos("BOTTOM", "MIDDLE", me);
GameControl.setBoardPos("BOTTOM", "RIGHT", me);

GameControl.displayBoard();
