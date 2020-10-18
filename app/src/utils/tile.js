export default class Tile {
  constructor() {
    this.isMine = false;
    this.numAdjMines = 0;
    this.revealed = false;
    this.flagged = false;
  }

  placeMine() {
    this.isMine = true;
  }

  incrementCount() {
    this.numAdjMines++;
  }
}