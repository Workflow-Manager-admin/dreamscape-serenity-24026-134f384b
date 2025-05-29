import React from 'react';
import './App.css';
import MainContainer from './components/MainContainer';

// PUBLIC_INTERFACE
function App() {
  // Render MainContainer as the only child for the main app UI
  return (
    <div className="app">
      <MainContainer />
    </div>
  );
}

export default App;