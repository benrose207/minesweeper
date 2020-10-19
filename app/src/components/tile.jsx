import React from 'react';

const Tile = ({ tile, pos, update }) => {
  let tileContent = "";

  if (tile.revealed && tile.isMine) {
    tileContent = "💣";
  } else if (tile.revealed && tile.numAdjMines > 0) {
    tileContent = tile.numAdjMines;
  } else if (tile.flagged) {
    tileContent = "🚩";
  }

  const handleClick = (e) => {
    e.preventDefault();
    let flagToggled = false;
    if (e.type === 'contextmenu') flagToggled = true;
    update(tile, flagToggled);
  }

  return (
    <div
      className={`tile ${tile.revealed ? "revealed" : ""}`}
      data-pos={pos}
      onClick={handleClick}
      onContextMenu={handleClick}>
      <span>
        {tileContent}
      </span>
    </div>
  );
};

export default Tile;