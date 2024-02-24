
import React, { useState } from 'react';
import RepetitionExercise from './components/RepetitionExercise';
import DurationExercise from './components/DurationExercise';

function App() {
  const [exercise, setExercise] = useState(null);

  const handleExerciseSelect = (exerciseName) => {
    setExercise(exerciseName);
  };

  const renderExerciseComponent = () => {
    switch (exercise) {
      case 'Push-ups':
      case 'Sit-ups':
      case 'Squats':
        return <RepetitionExercise name={exercise} />;
      case 'Running':
      case 'Cycling':
      case 'Swimming':
        return <DurationExercise name={exercise} />;
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <h1>Exercise Tracker</h1>
      <div className="exercise-menu">
        <button onClick={() => handleExerciseSelect('Push-ups')}>Push-ups</button>
        <button onClick={() => handleExerciseSelect('Sit-ups')}>Sit-ups</button>
        <button onClick={() => handleExerciseSelect('Squats')}>Squats</button>
        <button onClick={() => handleExerciseSelect('Running')}>Running</button>
        <button onClick={() => handleExerciseSelect('Cycling')}>Cycling</button>
        <button onClick={() => handleExerciseSelect('Swimming')}>Swimming</button>
      </div>
      <div className="exercise-display">
        {exercise && (
          <div>
            <h2>{exercise}</h2>
            {renderExerciseComponent()}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
