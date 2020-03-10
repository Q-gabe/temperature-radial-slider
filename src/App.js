import React from 'react';
import './App.css';
import TemperatureRadialSlider from 'containers/TemperatureRadialSlider';

function App() {
  return (
    <div className="App">
        <h1>Temperature Radial Slider Demo</h1>
        <TemperatureRadialSlider />
        <h3>Built with ♥ by <a href="https://q-gabe.me/">q-gabe</a>.</h3>
    </div>
  );
}

export default App;
