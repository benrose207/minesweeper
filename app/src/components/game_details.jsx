import React from 'react';
import Counter from './counter';
import Timer from './timer';

const GameDetails = ({ minesFound, restart, gameStatus }) => {
  return (
    <div className="game-details">
      <Counter minesFound={minesFound} />
      <button onClick={restart}>Restart</button>
      <Timer gameStatus={gameStatus} />
    </div>
  );
};

export default GameDetails;
