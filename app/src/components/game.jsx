import React, { useState } from 'react';
import BoardLayout from './board';
import Board from '../utils/board';


const Game = () => {
  const gameBoard = new Board();
  const [board, updateBoard] = useState(gameBoard.board);

  const updateGame = (tile, flagToggled) => {
    if (flagToggled) {
      tile.flagged = !tile.flagged;
    } else if (!tile.flagged) {
      tile.revealed = true;
      gameBoard.exploreTiles(tile, board);
    }

    updateBoard([...board]);
  }

  return (
    <main>
      <BoardLayout board={board} update={updateGame}/>
    </main>
  )
};

export default Game;
