import { useEffect, useState } from "react";

function PredictiveModel({ fighter1, fighter2, setPrediction }) {
  // Define weights for each statistic
  const [predictionString, setPredictionString] = useState("")
  const weights = {
    SLpM: 2,             // Significant Strikes Landed per Minute
    Str_Acc: 2,          // Striking Accuracy
    SApM: 0.5,           // Significant Strikes Absorbed per Minute
    Str_Def: 0.5,        // Striking Defense
    TD_Avg: 3,           // Takedowns Average
    TD_Acc: 2,           // Takedown Accuracy
    TD_Def: 2,           // Takedown Defense
    Sub_Avg: 1,          // Submission Average
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
    const F1Prediction = Math.round((fighter1Points / (fighter1Points + fighter2Points)) * 100)
    const F2Prediction = Math.round((fighter2Points / (fighter1Points + fighter2Points)) * 100)
    setPrediction({F1_win_prob: F1Prediction, F2_win_prob: F2Prediction})

    if (fighter1Points > fighter2Points) {
      return `${fighter1.name} is predicted to win with ${F1Prediction} % confidence.`;
    } else if (fighter2Points > fighter1Points) {

      return `${fighter2.name} is predicted to win with ${F2Prediction}% confidence.`;
    } else {
      return "It's a toss-up. Both fighters are equally matched.";
    }
  }
  useEffect(()=>{
    setPredictionString(predictFightOutcome(fighter1, fighter2, weights))

  },[])

  return (
    <div>
      <h3>Predictive Model Result:</h3>
      <p>{predictionString}</p>
    </div>
  );
}

export default PredictiveModel;