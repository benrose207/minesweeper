import React, { useEffect, useState } from 'react';
import BoardLayout from './board';
import Board from '../utils/board';

// not sure about the way I'm updating the board. Have to pass a new object to useState to 
// re-render board. But that means that it's different than this.board in the Board class.
// Is there a better way? If not, do I really need the Board class at all, vs. just utility functions?

const Game = () => {
  const gameBoard = new Board();
  const [board, updateBoard] = useState(gameBoard.board);
  const [minesFound, updateMinesFound] = useState(0);
  const [tilesRevealed, updateTilesRevealed] = useState(0);

  const updateGame = (tile, flagToggled) => {
    if (flagToggled) {
      handleFlagToggle(tile);
    } else if (!tile.flagged) {
      if (tile.isMine) handleLost();

      const numTilesExplored = gameBoard.exploreTiles(tile, board);
      updateTilesRevealed(tilesRevealed + numTilesExplored);
    }

    updateBoard([...board]);
  }

  const handleFlagToggle = (tile) => {
    tile.flagged = !tile.flagged;
    if (tile.flagged && tile.isMine) updateMinesFound(minesFound + 1);
    if (!tile.flagged && tile.isMine) updateMinesFound(minesFound - 1);
  }

  const handleLost = () => {
    alert('You lose!');
  }

  const won = () => {
    console.log(minesFound, tilesRevealed);
    const allMinesFound = minesFound === gameBoard.numMines;
    const allTilesRevealed = tilesRevealed === (gameBoard.rows * gameBoard.columns) - gameBoard.numMines;
    return allMinesFound || allTilesRevealed;
  }

  useEffect(() => {
    if (won()) alert('You won!');
  })

  return (
    <main>
      <BoardLayout board={board} update={updateGame}/>
    </main>
  )
};

export default Game;
