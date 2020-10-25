import React from 'react';
import Game from './components/game';
import ColorToggle from './components/color_toggle';
import './assets/stylesheets/index.css';

function App() {

  return (
    <main>
      <h1>Minesweeper</h1>
      <Game />
      <ColorToggle />
    </main>
  );
}

export default App;
