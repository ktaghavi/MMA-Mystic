import { useState, useEffect } from 'react';

function PredictionsLibrary() {
  const [userPredictions, setUserPredictions] = useState(null);
  const gradientBackground = {
    background: 'linear-gradient(180deg, #112c49 0%, #010010 100%)',
  };

  useEffect(() => {
    // Fetch the user's predictions from your backend
    fetch('/api/check_session')
      .then((response) => response.json())
      .then((data) => {
          setUserPredictions(data.predictions)
        }
      )
      .catch((error) => console.error('Error fetching user predictions:', error));
  }, []);

  console.log(userPredictions)
  return (
    <div className="min-h-screen" style={gradientBackground}>
      <h2 className="text-white">Your Predictions Library</h2>
      <ul>
        {userPredictions?.map((prediction) => (
          <div className="text-white" key={prediction.id}>
            <li>{prediction.F1_id}: {prediction.F1_win_prob}%</li>
            <li>{prediction.F2_id}: {prediction.F2_win_prob}%</li>
          </div>
        ))}
      </ul>
    </div>
  );  
}

export default PredictionsLibrary;