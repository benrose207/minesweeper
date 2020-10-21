import React, { useEffect, useState } from 'react';

const Timer = ({ gameStatus }) => {
  const [time, updateTime] = useState('00:00');

  const formatTime = (sec, min) => {
    const newSec = sec < 10 ? `0${sec}` : sec;
    const newMin = min < 10 ? `0${min}` : min;

    return `${newMin}:${newSec}`;
  }

  // does this install and remove the setInterval on every re-render?
  // why does this reset the time to 00 when the game is over but not restarted? Only happens when playing multiple games. On page refresh, the first game works perfectly.

  useEffect(() => {
    if (gameStatus.restarted) updateTime('00:00');

    let intervalId;
    if (gameStatus.inProgress) {
      intervalId = setInterval(() => {
        updateTime(prevTime => {
          let [min, sec] = prevTime.split(':').map(el => parseInt(el));
  
          if (sec < 59) {
            sec++;
          } else if (sec === 59) {
            sec = 0;
            min++
          }
  
          return formatTime(sec, min);
        });
      }, 1000);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [gameStatus]);

  return (
    <div>{time}</div>
  );
};

export default Timer;
