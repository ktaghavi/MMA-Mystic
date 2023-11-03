import { useState, useEffect } from 'react';

function PredictionsLibrary() {
  const [userPredictions, setUserPredictions] = useState([]);

  useEffect(() => {
    // Fetch the user's predictions from your backend
    fetch('/api/predictions-library') // Replace with your actual API endpoint
      .then((response) => response.json())
      .then((data) => {
        setUserPredictions(data);
      })
      .catch((error) => console.error('Error fetching user predictions:', error));
  }, []);

  return (
    <div>
      <h2>Your Predictions Library</h2>
      <ul>
        {userPredictions.map((prediction, id) => (
          <li key={id}>{prediction}</li>
        ))}
      </ul>
    </div>
  );
}

export default PredictionsLibrary;