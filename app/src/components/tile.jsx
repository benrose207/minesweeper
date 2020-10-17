import React from 'react';

const Tile = ({ tile }) => {
  const tileValue = tile.isMine ? "💣" : "";

  return (
    <div>{tileValue}</div>
  );
};

export default Tile;