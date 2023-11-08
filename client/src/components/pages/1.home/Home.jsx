import React from 'react';

const Home = () => {
  const gradientBackground = {
    background: 'linear-gradient(180deg, #112c49 0%, #010010 100%)',
  };

  const containerStyle = {
    padding: '9vh',
  };

  const logoStyle = {
    opacity: 0.82, // Set the opacity value you desire (0.7 for 70% opacity)
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={gradientBackground}>
      <div className="home-container" style={containerStyle}>
        <div className="text-center">
          <img src="logo.jpg" alt="Logo" style={logoStyle} />
        </div>
      </div>
    </div>
  );
};

export default Home;