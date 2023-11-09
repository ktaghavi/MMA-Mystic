import React, { useState, useEffect } from 'react';
import FighterCard from './FighterCard';
import PredictiveModel from './PredictiveModel';

function CompareFighters({ user }) {
  const [fighters, setFighters] = useState([]);
  const [selectedFighter1, setSelectedFighter1] = useState('');
  const [selectedFighter2, setSelectedFighter2] = useState('');
  const [showPredictiveModel, setShowPredictiveModel] = useState(false);
  const [prediction, setPrediction] = useState({ F1_win_prob: 0.0, F2_win_prob: 0.0 });

  const gradientBackground = {
    background: 'linear-gradient(180deg, #112c49 0%, #010010 100%)',
  };

  useEffect(() => {
    // Fetch the list of fighters from your backend
    fetch('/api/fighter_roster')
      .then((response) => response.json())
      .then((data) => {
        setFighters(data);
      })
      .catch((error) => console.error('Error fetching fighters:', error));
  }, []);

  const fighterOptions = fighters.map((fighter) => (
    <option key={fighter.id} value={fighter.id}>
      {fighter.name}
    </option>
  ));

  // Function to get the selected fighter data
  const getSelectedFighterData = (fight_id) => {
    return fighters.find((fighter) => {
      return fighter.id === parseInt(fight_id);
    });
  };

  const fighter1 = getSelectedFighterData(selectedFighter1);
  const fighter2 = getSelectedFighterData(selectedFighter2);

  const savePrediction = () => {
    const predictionData = {
      user_id: user.id,
      F1_id: fighter1.name,
      F2_id: fighter2.name,
      F1_win_prob: prediction.F1_win_prob,
      F2_win_prob: prediction.F2_win_prob,
    };

    fetch('/api/predictions-library', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(predictionData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.error('Error saving prediction:', error));
  };

  return (
    <div className="min-h-screen" style={gradientBackground}>
      <div className="w-full p-4 md:p-8 lg:p-12 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl text-center mb-4">Compare Fighters!</h2>
        <div className="flex flex-row justify-around">
          <div>
            <div className="border-2 border-red-600">
              <label>Choose Fighter 1:</label>
              <select
                value={selectedFighter1}
                onChange={(e) => setSelectedFighter1(e.target.value)}
              >
                <option value="">Select Fighter</option>
                {fighterOptions}
              </select>
            </div>
            {fighter1 && <FighterCard fighter={fighter1} />}
          </div>

          <div>
            <div className="border-2 border-blue-600 w-fit">
              <label>Choose Fighter 2:</label>
              <select
                value={selectedFighter2}
                onChange={(e) => setSelectedFighter2(e.target.value)}
              >
                <option value="">Select Fighter</option>
                {fighterOptions}
              </select>
            </div>
            {fighter2 && <FighterCard fighter={fighter2} />}
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setShowPredictiveModel(!showPredictiveModel)}
            className="bg-pink-500 p-2 rounded"
          >
            PREDICT!
          </button>
        </div>
        {showPredictiveModel ? (
          <PredictiveModel fighter1={fighter1} fighter2={fighter2} setPrediction={setPrediction} />
        ) : null}
        <div className="flex justify-center mt-4">
          <button onClick={savePrediction} className="bg-green-500 p-2 rounded">
            Save Prediction!
          </button>
        </div>
      </div>
    </div>
  );
}

export default CompareFighters;