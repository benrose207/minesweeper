import React from 'react';

const Tile = ({ tile, pos, update }) => {
  let tileBack = "";
  let tileFront = "";

  if (tile.revealed && tile.isMine) {
    tileBack = "💣";
  } else if (tile.revealed && tile.numAdjMines > 0) {
    tileBack = tile.numAdjMines;
  }
  
  if (tile.flagged) {
    tileFront = "🚩";
  }

  return (
    <div
      className={`tile ${tile.revealed ? "revealed" : ""}`}
      data-pos={pos}
    >
      <div className={`tile-content-container${tile.revealed ? " is-flipped" : ""}`}>
        <span className="tile-content tile-content--front">{tileFront}</span>
        <span className="tile-content tile-content--back">{tileBack}</span>
      </div>
    </div>
  );
};

export default Tile;