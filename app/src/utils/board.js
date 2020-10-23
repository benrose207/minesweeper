import Tile from './tile';

const ADJCOORDS = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [1, 0],
  [1, -1],
  [1, 1],
  [0, -1],
  [0, 1]
];

const addTiles = (board) => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      board[i][j] = new Tile([i, j]);
    };
  };
};

const findNeighboringTiles = (pos, board) => {
  const neighbors = [];
  const [x, y] = pos;
  const rows = board.length;
  const cols = board[0].length;

  ADJCOORDS.forEach(coord => {
    const newCoord = [coord[0] + x, coord[1] + y];
    if (validPos(newCoord, rows, cols)) neighbors.push(board[newCoord[0]][newCoord[1]]);
  });

  return neighbors;
};

const validPos = (pos, rows, cols) => {
  return pos[0] >= 0 && pos[0] < rows && pos[1] >= 0 && pos[1] < cols;
};

const updateAdjacentCounts = (pos, board) => {
  const neighbors = findNeighboringTiles(pos, board);
  neighbors.forEach(neighbor => {
    if (!neighbor.isMine) neighbor.incrementCount();
  });
};

const placeMines = (board, numMines) => {
  let mineCount = 0;

  while (mineCount < numMines) {
    const randomX = Math.floor(Math.random() * board.length);
    const randomY = Math.floor(Math.random() * board[0].length);
    const randomTile = board[randomX][randomY];

    if (!randomTile.isMine) {
      randomTile.placeMine();
      updateAdjacentCounts([randomX, randomY], board);
      mineCount++;
    }
  };
};

export const createBoard = (rows, columns, numMines) => {
  const board = new Array(rows).fill(null).map(() => new Array(columns));
  addTiles(board);
  placeMines(board, numMines);
  return board;
};

export const exploreTiles = (tile, board) => {
  if (tile.revealed) return 0;
  
  let numTilesExplored = 1;
  tile.revealed = true;

  if (tile.isMine || tile.numAdjMines > 0) return numTilesExplored;
  const queue = [tile];

  while (queue.length) {
    const currTile = queue.shift();
    if (currTile.numAdjMines > 0) continue;

    for (const coord of ADJCOORDS) {
      const newX = coord[0] + currTile.pos[0];
      const newY = coord[1] + currTile.pos[1];
      if (!validPos([newX, newY], board.length, board[0].length)) continue;

      const newTile = board[newX][newY];
      if (!newTile.isMine && !newTile.revealed && !newTile.flagged) {
        newTile.revealed = true;
        numTilesExplored++;
        queue.push(newTile);
      }
    };
  }

  return numTilesExplored;
};

export const revealBoard = (board) => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      const tile = board[i][j];
      tile.revealed = true;
    };
  };
};