import React from 'react';

const Board = ({ squares, onSquareClick }) => {
  const renderSquare = (i) => {
    return (
      <button 
        className="square" 
        onClick={() => onSquareClick(i)}
        disabled={squares[i]}
      >
        {squares[i]}
      </button>
    );
  };

  return (
    <div className="game-board">
      {[...Array(9)].map((_, i) => renderSquare(i))}
    </div>
  );
};

export default Board;
