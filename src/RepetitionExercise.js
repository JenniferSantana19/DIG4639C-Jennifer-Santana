
import React, { useState } from 'react';

function RepetitionExercise({ name }) {
  const [repetitions, setRepetitions] = useState(0);

  const incrementRepetitions = () => {
    setRepetitions(repetitions + 1);
  };

  const resetRepetitions = () => {
    setRepetitions(0);
  };

  return (
    <div>
      <p>Name: {name}</p>
      <p>Repetitions: {repetitions}</p>
      <button onClick={incrementRepetitions}>Increment</button>
      <button onClick={resetRepetitions}>Reset</button>
    </div>
  );
}

export default RepetitionExercise;
