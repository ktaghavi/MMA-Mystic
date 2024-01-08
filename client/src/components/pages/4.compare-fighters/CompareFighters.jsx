import React, { useState, useEffect } from 'react';
import FighterCard from './FighterCard';
import PredictiveModel from './PredictiveModel';
import Select from 'react-select';

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

  const fighterOptions = fighters.map(fighter => ({
    value: fighter.id,
    label: fighter.name
  }));

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
    <div className="min-h-screen flex justify-center items-center" style={gradientBackground}>
      <div className="container mx-auto p-4 md:p-8 lg:p-12 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl text-center font-bold mb-4">Compare Fighters!</h2>
        <div className="flex flex-col md:flex-row justify-around mb-4">
          <div className="mb-4 md:mb-0">
            <div className="border-2 border-red-600 p-4 rounded">
              <label className="font-bold mb-2">Choose Fighter 1:</label>
              <Select
                value={fighterOptions.find(option => option.value === selectedFighter1)}
                onChange={(option) => setSelectedFighter1(option ? option.value : '')}
                options={fighterOptions}
                placeholder="Select Fighter"
              />
            </div>
            {fighter1 && (
            <div className="FighterCard mt-4">
            <FighterCard fighter={fighter1} />
          </div>
            )}
          <div>
            <div className="border-2 border-blue-600 p-4 rounded">
              <label className="font-bold mb-2">Choose Fighter 2:</label>
              <Select
                value={fighterOptions.find(option => option.value === selectedFighter2)}
                onChange={(option) => setSelectedFighter2(option ? option.value : '')}
                options={fighterOptions}
                placeholder="Select Fighter"
              />
            </div>
            {fighter2 && (
            <div className="FighterCard mt-4">
            <FighterCard fighter={fighter2} />
          </div>
            )}
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <button
            onClick={() => setShowPredictiveModel(!showPredictiveModel)}
            className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
          >
            PREDICT!
          </button>
        </div>

        {showPredictiveModel ? (
          <div className="PredictiveModel mt-4">
            <PredictiveModel fighter1={fighter1} fighter2={fighter2} setPrediction={setPrediction} />
          </div>
        ) : null}

        <div className="flex justify-center mt-4">
          <button
            onClick={savePrediction}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Save Prediction!
          </button>
        </div>
      </div>
    </div>
  </div>
  )};

export default CompareFighters;