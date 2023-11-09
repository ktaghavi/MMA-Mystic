const Home = () => {
  const gradientBackground = {
    background: 'linear-gradient(180deg, #112c49 0%, #010010 100%)',
  };

  const containerStyle = {
    padding: '2vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
  };

  const logoStyle = {
    opacity: 0.82,
    maxWidth: '100%',
    maxHeight: '90vh', // Adjust this value to fit your content within the viewport
  };

  return (
    <div className="min-h-screen" style={gradientBackground}>
      <div className="home-container" style={containerStyle}>
        <div className="text-center">
          <img src="logo.jpg" alt="Logo" style={logoStyle} />
        </div>
      </div>
    </div>
  );
};

export default Home;