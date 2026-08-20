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

  const setBoardPos = (pos) => {};

  const displayBoard = () => {};

  return { getBoardPos, setBoardPos, displayBoard };
}
