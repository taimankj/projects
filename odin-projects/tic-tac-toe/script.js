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

  const getBoardPos = (pos) => {};

  const setBoardPos = (rowPos, colPos, marker) => {
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

    board[rows[rowPos]][cols[colPos]] = marker;
  };

  const displayBoard = () => {
    console.log(`${board[0][0]} | ${board[0][1]} | ${board[0][2]}`);
    console.log(`----------`);
    console.log(`${board[1][0]} | ${board[1][1]} | ${board[1][2]}`);
    console.log(`----------`);
    console.log(`${board[2][0]} | ${board[2][1]} | ${board[2][2]}`);
  };

  return { getBoardPos, setBoardPos, displayBoard };
}
