import React, { useState } from 'react';
import './App.css';
import Board from './components/Board';
import { calculateWinner, getComputerMove } from './utils/gameLogic';

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isComputerOpponent, setIsComputerOpponent] = useState(true);
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = (i) => {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);

    // Computer's turn
    if (isComputerOpponent && !xIsNext) {
      setTimeout(() => {
        const computerMove = getComputerMove(newSquares);
        if (computerMove !== null) {
          const nextSquares = newSquares.slice();
          nextSquares[computerMove] = 'O';
          setSquares(nextSquares);
          setXIsNext(true);
        }
      }, 500);
    }
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  const toggleOpponent = () => {
    setIsComputerOpponent(!isComputerOpponent);
    resetGame();
  };

  const winner = calculateWinner(squares);
  const isDraw = !winner && squares.every(square => square !== null);
  
  let status;
  if (winner) {
    status = <span className="win-message">Winner: {winner}</span>;
  } else if (isDraw) {
    status = <span className="win-message">Draw!</span>;
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
    if (isComputerOpponent && !xIsNext) {
      status = 'Computer thinking...';
    }
  }

  return (
    <div className="App">
      <h1 className="game-title">Tic Tac Toe</h1>
      <div className="game-container">
        <div className="game-status">{status}</div>
        <Board squares={squares} onSquareClick={handleClick} />
        <div className="game-controls">
          <button 
            className="control-button primary-button" 
            onClick={toggleOpponent}
          >
            {isComputerOpponent ? 'Play vs Friend' : 'Play vs Computer'}
          </button>
          <button 
            className="control-button accent-button" 
            onClick={resetGame}
          >
            Reset Game
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
