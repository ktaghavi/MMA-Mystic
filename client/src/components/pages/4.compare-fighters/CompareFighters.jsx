import React, { useState, useEffect } from 'react';
import FighterCard from './FighterCard';
import PredictiveModel from './PredictiveModel';
import useUserStore from "../../../hooks/usersStore";

function CompareFighters() {
  const [fighters, setFighters] = useState([]);
  const [selectedFighter1, setSelectedFighter1] = useState('');
  const [selectedFighter2, setSelectedFighter2] = useState('');
  const [showPredictiveModel, setShowPredictiveModel] = useState(false);
  const [prediction, setPrediction] = useState({F1_win_prob:0.0, F2_win_prob:0.0});
  const { user, updateUser } = useUserStore();

  console.log(prediction);

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
      return fighter.id === parseInt(fight_id)
    });
  };

  const fighter1 = getSelectedFighterData(selectedFighter1);
  const fighter2 = getSelectedFighterData(selectedFighter2);

  const savePrediction = () => {
    const predictionData = {
      user_id: user.id,
      F1_id: fighter1.id,
      F2_id: fighter2.id,
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
      .then((data) => {console.log(data)
      })
      .catch((error) => console.error('Error saving prediction:', error));
  };

  return (
    <>
      <p className='m-auto bg-purple-300 w-fit text-lg'>Compare Fighters!</p>
      <div className='flex flex-row justify-around'>
        <div >
          <div className='border-2 border-red-600'>
            <label>Choose Fighter 1:</label>
            <select value={selectedFighter1} onChange={(e) => setSelectedFighter1(e.target.value)}>
              <option value="">Select Fighter</option>
              {fighterOptions}
            </select>
          </div>
          {fighter1 && (
            <div>
              <FighterCard fighter={fighter1} />
            </div>
          )}
        </div>

        <div >
          <div >
            <div className='border-2 border-blue-600 w-fit'>
              <label >Choose Fighter 2:</label>
              <select value={selectedFighter2} onChange={(e) => setSelectedFighter2(e.target.value)}>
                <option value="">Select Fighter</option>
                {fighterOptions}
              </select>
            </div>
            {fighter2 && (
              <div>
                <FighterCard fighter={fighter2} />
              </div>
            )}
          </div>

        </div>
      </div>
      <div className=''>
        <button onClick={()=> setShowPredictiveModel(!showPredictiveModel)}  className='w-fit bg-pink-500'>PREDICT!</button>
        {showPredictiveModel ? <PredictiveModel fighter1={fighter1} fighter2={fighter2} setPrediction = {setPrediction}/> : null}
        <button onClick={savePrediction} className='w-fit bg-green-500'>
          Save Prediction!
        </button>
      </div>
    </>
  );
}

export default CompareFighters;

