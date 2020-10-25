import React from 'react';
import Tile from './tile';

const BoardLayout = ({ board, update }) => {
  const tiles = board.map((row, idx1) => (
    <div key={idx1} className="row">
      {row.map((tile, idx2) => (
        <Tile key={idx2} tile={tile} pos={`${idx1},${idx2}`} update={update}/>
      ))}
    </div>
  ));

  const handleClick = (e) => {
    e.preventDefault();

    let flagToggled = false;
    if (e.type === 'contextmenu') flagToggled = true;

    const pos = e.target.dataset.pos || e.target.parentElement.parentElement.dataset.pos;
    const [x, y] = pos.split(',');
    const tile = board[x][y];

    update(tile, flagToggled);
  }

  return (
    <div className="board" onClick={handleClick} onContextMenu={handleClick}>
      {tiles}
    </div>
  );
};

export default BoardLayout;
