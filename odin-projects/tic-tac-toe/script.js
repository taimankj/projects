function Player(name = "NPC") {
  let wins = 0;

  const getWins = () => wins;
  const addWin = () => wins++;

  return { name, getWins, addWin };
}

function Gameboard() {
  // [x][y]
  //    x - row position
  //    y - column position
  let board = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

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

  const setBoardPos = (rowPos, colPos, marker) => {
    board[rows[rowPos]][cols[colPos]] = marker;
  };

  const displayBoard = () => {
    console.log(
      `${board[rows["TOP"]][cols["LEFT"]]} | ${board[rows["TOP"]][cols["MIDDLE"]]} | ${board[rows["TOP"]][cols["RIGHT"]]}`,
    );
    console.log(
      `${board[rows["MIDDLE"]][cols["LEFT"]]} | ${board[rows["MIDDLE"]][cols["MIDDLE"]]} | ${board[rows["MIDDLE"]][cols["RIGHT"]]}`,
    );
    console.log(
      `${board[rows["BOTTOM"]][cols["LEFT"]]} | ${board[rows["BOTTOM"]][cols["MIDDLE"]]} | ${board[rows["BOTTOM"]][cols["RIGHT"]]}`,
    );
  };

  return { getBoardPos, setBoardPos, displayBoard };
}
