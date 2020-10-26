import React from 'react';
import Counter from './counter';
import Timer from './timer';

const GameDetails = ({ minesFound, numMines, gameStatus, restart, updateLevel, level }) => {

  // const [currentlevel, updateLevel] = useState('easy');

  const handleLevelChange = (e) => {
    let approveRestart;
    if (gameStatus.inProgress) {
      approveRestart = window.confirm("Changing the level while the game is in progress will restart the game, and cause your progress to be lost. Are you sure you want to restart?");
    }
    
    if (approveRestart !== false) {
      const newLevel = e.target.value;
      updateLevel(newLevel);
    }
  }

  // const updateGame = useCallback(() => {
  //   updateNumMines(levels[level].numMines);
  //   restart(levels[level].rows, levels[level].cols, levels[level].numMines);
  // }, [level]);

  // useEffect(() => {
  //   updateGameLevel(levels[level]);
  // }, [level]);

  return (
    <div className="game-details">
      <Counter minesFound={minesFound} numMines={numMines}/>
      <button onClick={() => restart(level.rows, level.cols, level.numMines)}>Restart</button>
      <select name="level" onChange={handleLevelChange} defaultValue={level.name}>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <Timer gameStatus={gameStatus} />
    </div>
  );
};

export default GameDetails;
