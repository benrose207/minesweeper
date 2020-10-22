import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createBoard, exploreTiles, revealBoard } from '../utils/board';
import BoardLayout from './board';
import Counter from './counter';
import Timer from './timer';

const Game = () => {
  const [board, updateBoard] = useState(createBoard(8, 8, 10));
  const [minesFound, updateMinesFound] = useState(0);
  const [tilesRevealed, updateTilesRevealed] = useState(0);
  const [gameStatus, updateGameStatus] = useState({ inProgress: false, restarted: false });
  const gameOverMessage = useRef(null);

  const updateGame = (tile, flagToggled) => {
    if (!gameStatus.inProgress) updateGameStatus({ inProgress: true, restarted: false });

    if (flagToggled) {
      handleFlagToggle(tile);
    } else if (!tile.flagged) {
      if (tile.isMine) handleLost();

      const numTilesExplored = exploreTiles(tile, board);
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
    updateGameStatus({...gameStatus, inProgress: false});
    gameOverMessage.current = "Try again!";
    revealBoard(board);
  }

  const handleWon = useCallback(() => {
    updateGameStatus({ ...gameStatus, inProgress: false });
    gameOverMessage.current = "Congrats, you won!";
  }, [gameStatus]);

  const restart = () => {
    updateMinesFound(0);
    updateTilesRevealed(0);
    gameOverMessage.current = null;

    const newBoard = createBoard(8, 8, 10);
    updateBoard(newBoard);
    updateGameStatus({ inProgress: false, restarted: true});
  }

  const won = useCallback(() => {
    const allMinesFound = minesFound === 10;
    const allTilesRevealed = tilesRevealed === (board.length * board[0].length) - 10;
    return allMinesFound || allTilesRevealed;
  }, [minesFound, tilesRevealed, board])
  
  useEffect(() => {
    if (won() && gameStatus.inProgress) handleWon();
  }, [gameStatus, won, handleWon]);

  return (
    <>
      <div className="game-details">
        <Counter minesFound={minesFound}/>
        <button onClick={restart}>Restart</button>
        <Timer gameStatus={gameStatus} />
      </div>
      <BoardLayout board={board} update={updateGame} />
      <p className="gameover-message">{gameOverMessage.current}</p>
    </>
  )
};

export default Game;
