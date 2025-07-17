export const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

export const getComputerMove = (squares) => {
  // Simple AI: Look for first empty square
  const emptySquares = squares
    .map((square, index) => ({ square, index }))
    .filter(({ square }) => !square)
    .map(({ index }) => index);

  if (emptySquares.length === 0) return null;

  // Try to win or block opponent from winning
  const player = 'O';
  const opponent = 'X';
  
  // Check for winning move
  for (const move of emptySquares) {
    const boardCopy = [...squares];
    boardCopy[move] = player;
    if (calculateWinner(boardCopy) === player) {
      return move;
    }
  }

  // Check for blocking move
  for (const move of emptySquares) {
    const boardCopy = [...squares];
    boardCopy[move] = opponent;
    if (calculateWinner(boardCopy) === opponent) {
      return move;
    }
  }

  // Take center if available
  if (emptySquares.includes(4)) return 4;

  // Take random corner
  const corners = emptySquares.filter(square => [0, 2, 6, 8].includes(square));
  if (corners.length > 0) {
    return corners[Math.floor(Math.random() * corners.length)];
  }

  // Take random available square
  return emptySquares[Math.floor(Math.random() * emptySquares.length)];
};
