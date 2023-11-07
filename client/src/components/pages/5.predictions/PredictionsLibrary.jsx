import { useState, useEffect } from 'react';

function PredictionsLibrary({user}) {

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

  const [userPredictions, setUserPredictions] = useState([]);

  console.log(userPredictions)

  return (
    <div>
      <h2>Your Predictions Library</h2>
      <ul>
        {userPredictions.map((prediction) => (
          <div key={prediction.id}>
            <li>{prediction.F1_id}</li>
            <li>{prediction.F1_win_prob}</li>
            <li>{prediction.F2_id}</li>
            <li>{prediction.F2_win_prob}</li>
          </div>
        ))}
      </ul>
    </div>
  );  
}

export default PredictionsLibrary;