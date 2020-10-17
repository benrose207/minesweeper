import Tile from './tile';

export default class Board {
  constructor() {
    this.numBombs = 10;
    this.rows = 8;
    this.columns = 8;

    this.board = new Array(this.rows).fill(null).map(() => new Array(this.columns));
    this.addTiles();
    this.placeBombs();
  }

  addTiles() {
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[0].length; j++) {
        this.board[i][j] = new Tile();
      }
    }
  }

  placeBombs() {
    let bombCount = 0;

    while (bombCount < this.numBombs) {
      const randomX = Math.floor(Math.random() * this.rows);
      const randomY = Math.floor(Math.random() * this.columns);
      const randomTile = this.board[randomX][randomY];

      if (!randomTile.bomb) {
        randomTile.bomb = true;
        bombCount++;
      }
    };
    console.log(this.board);
  }
}