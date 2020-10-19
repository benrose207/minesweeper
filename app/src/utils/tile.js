export default class Tile {
  constructor(pos) {
    this.isMine = false;
    this.numAdjMines = 0;
    this.revealed = false;
    this.flagged = false;
    this.pos = pos;
  }

  placeMine() {
    this.isMine = true;
  }

  incrementCount() {
    this.numAdjMines++;
  }
}