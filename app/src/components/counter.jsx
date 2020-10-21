import React from 'react';

const Counter = ({ minesFound }) => {
  const formattedNum = !minesFound ? 10 : `0${10 - minesFound}`

  return (
    <div>
      {`${formattedNum} 💣`}
    </div>
  );
};

export default Counter;
