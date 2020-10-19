import Tile from './tile';

export default class Board {
  constructor() {
    this.numMines = 10;
    this.rows = 8;
    this.columns = 8;

    this.board = new Array(this.rows).fill(null).map(() => new Array(this.columns));
    this.adjCoords = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [1, 0],
      [1, -1],
      [1, 1],
      [0, -1],
      [0, 1]];

    this.addTiles();
    this.placeMines();
  }

  addTiles() {
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[0].length; j++) {
        this.board[i][j] = new Tile([i, j]);
      }
    }
  }

  findNeighboringTiles(pos) {
    const neighbors = [];
    const [x, y] = pos;

    this.adjCoords.forEach(coord => {
      const newCoord = [coord[0] + x, coord[1] + y];
      if (this.validPos(newCoord)) neighbors.push(this.board[newCoord[0]][newCoord[1]]);
    });

    return neighbors;
  }

  validPos(pos) {
    return pos[0] >= 0 && pos[0] < this.rows && pos[1] >= 0 && pos[1] < this.columns;
  }

  updateAdjacentCounts(pos) {
    const neighbors = this.findNeighboringTiles(pos);
    neighbors.forEach(neighbor => {
      if (!neighbor.isMine) neighbor.incrementCount();
    })
  }

  placeMines() {
    let mineCount = 0;

    while (mineCount < this.numMines) {
      const randomX = Math.floor(Math.random() * this.rows);
      const randomY = Math.floor(Math.random() * this.columns);
      const randomTile = this.board[randomX][randomY];

      if (!randomTile.isMine) {
        randomTile.placeMine();
        this.updateAdjacentCounts([randomX, randomY])
        mineCount++;
      }
    };
  }

  exploreTiles(tile, board) {
    if (tile.isMine || tile.numAdjMines > 0) return;
    const queue = [tile];

    while (queue.length) {
      const currTile = queue.shift();
      if (currTile.numAdjMines > 0) continue;

      for (const coord of this.adjCoords) {
        const newX = coord[0] + currTile.pos[0];
        const newY = coord[1] + currTile.pos[1];
        if (!this.validPos([newX, newY])) continue;

        const newTile = board[newX][newY];
        if (!newTile.isMine && !newTile.revealed && !newTile.flagged) {
          newTile.revealed = true;
          queue.push(newTile);
        }
      };
    }
  }
}