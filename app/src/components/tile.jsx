import React from 'react';

const Tile = ({ tile, pos }) => {
  const tileValue = tile.isMine ? "💣" : tile.numAdjMines ? tile.numAdjMines : "";

  return (
    <div className="tile" data-pos={pos}>
      <span className="hidden">
        {tileValue}
      </span>
    </div>
  );
};

export default Tile;