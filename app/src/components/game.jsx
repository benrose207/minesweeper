import React from 'react';
import BoardLayout from './board';
import Board from '../utils/board';


const Game = () => {
  const board = new Board();

  return (
    <main>
      <BoardLayout board={board.board}/>
    </main>
  )
};

export default Game;
