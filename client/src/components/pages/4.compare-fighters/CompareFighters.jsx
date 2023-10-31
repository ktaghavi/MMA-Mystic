import React, { useState, useEffect } from 'react';
import FighterCard from './FighterCard';

function CompareFighters() {
  const [fighters, setFighters] = useState([]);
  const [selectedFighter1, setSelectedFighter1] = useState('');
  const [selectedFighter2, setSelectedFighter2] = useState('');

  useEffect(() => {
    // Fetch the list of fighters from your backend
    fetch('/api/fighter_roster')
      .then((response) => response.json())
      .then((data) => {
        setFighters(data);
      })
      .catch((error) => console.error('Error fetching fighters:', error));
  }, []);

  console.log(fighters)

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

  console.log(selectedFighter1)

  console.log(fighter1)

  return (
    <>
    <p className='m-auto bg-purple-300 w-fit text-lg'>Compare Fighters!</p>
    <div className='flex flex-row justify-around'>
      <div className='border-2 border-red-600'>
        <label>Choose Fighter 1:</label>
        <select value={selectedFighter1} onChange={(e) => setSelectedFighter1(e.target.value)}>
          <option value="">Select Fighter 1</option>
          {fighterOptions}
        </select>
        {fighter1 && (
        <div>
          <FighterCard fighter={fighter1} />
        </div>
      )}
      </div>
      <div >
        <div className='border-2 border-blue-600'>
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
    </>
  );
}

export default CompareFighters;