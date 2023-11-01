// PredictiveModel.js
import React from 'react';

function PredictiveModel({ fighter1, fighter2 }) {
  // Define weights for each statistic
  const weights = {
    SigLpM: 2,           // Significant Strikes Landed per Minute
    StrAcc: 2,            // Striking Accuracy
    SApM: 1.5,           // Significant Strikes Absorbed per Minute
    StrDef: 1.5,          // Striking Defense
    TDAvg: 1,            // Takedowns Average
    TDAcc: 1,            // Takedown Accuracy
    TDDef: 1,            // Takedown Defense
    SubAvg: 1.5,         // Submission Average
  };

  function calculateFighterPoints(fighter, weights) {
    let totalPoints = 0;
    for (const stat in weights) {
      totalPoints += fighter[stat] * weights[stat];
    }
    return totalPoints;
  }

  function predictFightOutcome(fighter1, fighter2, weights) {
    const fighter1Points = calculateFighterPoints(fighter1, weights);
    const fighter2Points = calculateFighterPoints(fighter2, weights);

    if (fighter1Points > fighter2Points) {
      return `Fighter 1 is predicted to win with ${Math.round((fighter1Points / (fighter1Points + fighter2Points)) * 100)}% confidence.`;
    } else if (fighter2Points > fighter1Points) {
      return `Fighter 2 is predicted to win with ${Math.round((fighter2Points / (fighter1Points + fighter2Points)) * 100)}% confidence.`;
    } else {
      return "It's a toss-up. Both fighters are equally matched.";
    }
  }

  const prediction = predictFightOutcome(fighter1, fighter2, weights);

  return (
    <div>
      <h3>Predictive Model Result:</h3>
      <p>{prediction}</p>
    </div>
  );
}

export default PredictiveModel;