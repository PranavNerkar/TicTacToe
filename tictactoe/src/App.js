import React, { useEffect, useState } from "react";
import "./App.css";
import Square from "./Squares/Squares";

const renderForm = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
];

const App = () => {
  const [gameState, setGameState] = useState(renderForm);
  const [currentPlayer, setCurrentPlayer] = useState("circle");
  const [finishedState, setFinishedState] = useState(false);

  const checkWinner = () => {
    for (let row = 0; row < gameState.length; row++) {
      if (
        gameState[row][0] === gameState[row][1] &&
        gameState[row][1] === gameState[row][2]
      ) {
        return gameState[row][0];
      } else if (
        gameState[0][row] === gameState[1][row] &&
        gameState[1][row] === gameState[2][row]
      ) {
        return gameState[0][row];
      }
    }

    if (
      gameState[0][0] === gameState[1][1] &&
      gameState[1][1] === gameState[2][2]
    ) {
      return gameState[0][0];
    } else if (
      gameState[0][2] === gameState[1][1] &&
      gameState[1][1] === gameState[2][0]
    ) {
      return gameState[0][2];
    }

    const isDrawMatch = gameState.flat().every((e) => {
      if (e === "circle" || e === "cross") return true;
    });

    if (isDrawMatch) {
      return "draw";
    }
  };

  useEffect(() => {
    const winner = checkWinner();
    if (winner){
      setFinishedState(winner);
    }
  }, [gameState]);

  return (
    <div className="main-div">
      <div className="move-detection">
        <div className="left">You</div>
        <div className="right">Opponent</div>
      </div>
      <div>
        <h1 className="water-back">Tic Tac Toe</h1>
        <div className="square-wrapper">
          {gameState.map((arr, rowIndex) =>
            arr.map((e, colIndex) => {
              return (
                <Square
                  key={rowIndex * 3 + colIndex}
                  id={rowIndex * 3 + colIndex}
                  finishedState={finishedState}
                  setGameState={setGameState}
                  currentPlayer={currentPlayer}
                  setCurrentPlayer={setCurrentPlayer}
                />
              );
            })
          )}
        </div>
      </div>
      <div >
        
        {finishedState && finishedState !== 'draw' && <h1 className="message">{finishedState} won the Game</h1>}
        {finishedState && finishedState === 'draw' && <h1 className="message">It's a Draw</h1>}
       
      </div>
    </div>
  );
};

export default App;
