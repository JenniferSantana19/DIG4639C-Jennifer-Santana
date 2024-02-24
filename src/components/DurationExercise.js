// components/DurationExercise/index.js
import React, { useState, useEffect } from 'react';

function DurationExercise({ name }) {
  const [timer, setTimer] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [running]);

  const startTimer = () => {
    setRunning(true);
  };

  const resetTimer = () => {
    setRunning(false);
    setTimer(0);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      <p>Name: {name}</p>
      <p>Duration: {formatTime(timer)}</p>
      {!running ? <button onClick={startTimer}>Start</button> : <button onClick={resetTimer}>Reset</button>}
    </div>
  );
}

export default DurationExercise;
