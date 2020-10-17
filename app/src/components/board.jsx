import React from 'react';
import Tile from './tile';

// better thing to use for the indexes here? 

const BoardLayout = ({ board }) => {
  const tiles = board.map((row, idx1) => (
    <div key={idx1} className="row">
      {row.map((tile, idx2) => (
        <Tile tile={tile} key={idx2}/>
      ))}
    </div>
  ));

  return (
    <div className="board">
      {tiles}
    </div>
  );
};

export default BoardLayout;
