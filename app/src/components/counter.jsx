import React from 'react';

const Counter = ({ minesFound, numMines }) => {
  const minesLeft = numMines - minesFound;
  const formattedNum = minesLeft >= 10 ? minesLeft : `0${minesLeft}`;

  return (
    <div>
      {`${formattedNum} 💣`}
    </div>
  );
};

export default Counter;
