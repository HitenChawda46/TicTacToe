import { useState } from 'react';
import Board from './Board';
import { calculateWinner } from './helper';

export default function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [gameState, setGameState] = useState([new Array(9).fill(null)]);

  function handleClick(index) {
    if (currentSquares[index] !== null || calculateWinner(currentSquares)) {
      return;
    }
    const nextGameState = currentSquares.slice();
    nextGameState[index] = xIsNext ? "X" : "O";
    console.log("nextGameState", nextGameState);
    setXIsNext(!xIsNext);
    setGameState([...gameState, nextGameState]);
  }

  function jumpTo(index) {
    const newGameState = gameState.slice(0, index + 1).map(item => [...item]);
    setGameState(newGameState);
    setXIsNext(!!(newGameState.length % 2))
  }

  const currentSquares = gameState[gameState.length - 1];

  const winner = calculateWinner(currentSquares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  const moves = gameState.map((state, index) => {
    let description;
    if (index > 0) {
      description = "Go to move #" + index;
    } else {
      description = "Go to game start";
    }
    return <li key={index}>
      <button onClick={() => jumpTo(index)}>{description}</button>
    </li>;
  });

  return <>
    <div className="status">{status}</div>
    <Board boardState={currentSquares} handleClick={handleClick} />
    <ul>
      {moves}
    </ul>
  </>;
};
