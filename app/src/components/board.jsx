import React from 'react';
import Tile from './tile';

// better thing to use for the indexes here? -- maybe interpolate as string?

const BoardLayout = ({ board, update }) => {
  const tiles = board.map((row, idx1) => (
    <div key={idx1} className="row">
      {row.map((tile, idx2) => (
        <Tile key={idx2} tile={tile} pos={`${idx1},${idx2}`} update={update}/>
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
