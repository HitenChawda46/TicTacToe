import { useState } from 'react';
import Square from './Square';
import { calculateWinner } from './helper';

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [boardState, setBoardState] = useState(new Array(9).fill(null));

  function handleClick(index) {
    if (boardState[index] !== null || calculateWinner(boardState)) {
      return;
    }
    const boardStateCopy = [...boardState];
    boardStateCopy[index] = xIsNext ? "X" : "O";
    setXIsNext(!xIsNext);
    setBoardState(boardStateCopy);
  }

  const winner = calculateWinner(boardState);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return <>
    <div className="status">{status}</div>
    <div className="board-row">
      <Square value={boardState[0]} onClick={(event) => handleClick(0)} />
      <Square value={boardState[1]} onClick={(event) => handleClick(1)} />
      <Square value={boardState[2]} onClick={(event) => handleClick(2)} />
    </div>
    <div className="board-row">
      <Square value={boardState[3]} onClick={(event) => handleClick(3)} />
      <Square value={boardState[4]} onClick={(event) => handleClick(4)} />
      <Square value={boardState[5]} onClick={(event) => handleClick(5)} />
    </div>
    <div className="board-row">
      <Square value={boardState[6]} onClick={(event) => handleClick(6)} />
      <Square value={boardState[7]} onClick={(event) => handleClick(7)} />
      <Square value={boardState[8]} onClick={(event) => handleClick(8)} />
    </div>
  </>;
};
