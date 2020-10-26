import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createBoard, exploreTiles, revealBoard } from '../utils/board';
import BoardLayout from './board';
import GameDetails from './game_details';
import levels from '../utils/levels';

const Game = () => {
  // const [numMines, updateNumMines] = useState(10);
  const [level, updateLevel] = useState('easy');
  const [board, updateBoard] = useState(createBoard(levels[level].rows, levels[level].cols, levels[level].numMines));
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

  const restart = (rows, cols, numMines) => {
    updateMinesFound(0);
    updateTilesRevealed(0);
    gameOverMessage.current = null;

    const newBoard = createBoard(rows, cols, numMines);
    updateBoard(newBoard);
    updateGameStatus({ inProgress: false, restarted: true});
  }

  const won = useCallback(() => {
    const allMinesFound = minesFound === levels[level].numMines;
    const allTilesRevealed = tilesRevealed === (board.length * board[0].length) - levels[level].numMines;
    return allMinesFound || allTilesRevealed;
  }, [minesFound, tilesRevealed, board, level]);

  const updateGameLevel = useCallback(() => {
    const currentLevel = levels[level];
    restart(currentLevel.rows, currentLevel.cols, currentLevel.numMines);
  }, [level]);
  
  useEffect(() => {
    if (won() && gameStatus.inProgress) handleWon();
    // updateGameLevel();
  }, [gameStatus, won, handleWon, updateGameLevel]);

  return (
    <>
      <GameDetails
        minesFound={minesFound}
        numMines={levels[level].numMines}
        gameStatus={gameStatus}
        restart={restart}
        updateLevel={updateLevel}
        level={levels[level]}
      />
      <BoardLayout board={board} update={updateGame} />
      <p className="gameover-message">{gameOverMessage.current}</p>
    </>
  )
};

export default Game;
