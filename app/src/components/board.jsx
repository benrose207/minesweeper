import React, { useEffect } from 'react';
import Tile from './tile';

// better thing to use for the indexes here? 

const BoardLayout = ({ board }) => {
  const tiles = board.map((row, idx1) => (
    <div key={idx1} className="row">
      {row.map((tile, idx2) => (
        <Tile key={idx2} tile={tile} pos={`${idx1},${idx2}`}/>
      ))}
    </div>
  ));

  const revealTile = (e) => {
    const pos = e.target.dataset.pos.split(',');
    const tile = board[pos[0]][pos[1]];
    tile.revealed = true;

    const tileValue = e.target.firstElementChild;
    if (tileValue.classList.contains('hidden')) {
      tileValue.classList.remove('hidden');
    }
  };

  const setFlag = (e) => {
    e.preventDefault();
    console.log('setting flag');
  };

  useEffect(() => {
    const board = document.querySelector('.board');
    board.addEventListener('click', revealTile);
    board.addEventListener('contextmenu', setFlag);
  })

  return (
    <div className="board">
      {tiles}
    </div>
  );
};

export default BoardLayout;
