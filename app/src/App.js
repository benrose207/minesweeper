import React from 'react';
import logo from './logo.svg';
import './assets/stylesheets/App.css';
import Board from './utils/board';

function App() {
  const board = new Board();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hi this is Ben
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
