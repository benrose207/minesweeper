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
        this.board[i][j] = new Tile();
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
}