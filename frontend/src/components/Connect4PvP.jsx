import React, { useEffect, useState } from 'react';
import './components stylesheets/styleConnect4AlphaBeta.css';

function Connect4PvP() {
  const [board, setBoard] = useState([]);
  const [topRowButtons, setTopRowButtons] = useState([0, 1, 2, 3, 4, 5, 6]);
  const [winnerMessage, setWinnerMessage] = useState("")

  useEffect(() => {
    handleReset();
  }, []);

  const handleClick = (event) => {
    const buttonValue = event.target.value;
    fetch('http://localhost:8000/api/connect-4/pvp/player-turn', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ value: buttonValue }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Player turn:', data);
        setBoard(data.board);
        if (data.message) {
          setWinnerMessage(data.message);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const handleReset = () => {
    fetch('http://localhost:8000/api/connect-4/pvp/reset-click', {
      method: 'POST',
    })
      .then(response => response.json())
      .then(data => {
        setBoard(data.board);
        setWinnerMessage("");
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <>
      <div className="container">
        <div className="center">
          <div className="d-grid d-md-block">
            {topRowButtons.map((buttonValue, index) => (
              <button
                key={index}
                value={buttonValue}
                onClick={handleClick}
                type="button"
                className="btn btn-secondary me-2"
              >
                Column {buttonValue}
              </button>
            ))}
          </div>
          <div className="board-container">
            {board.map((row, rowIndex) => (
              <div key={rowIndex} className="board-row">
                {row.map((cell, cellIndex) => (
                  <div
                    key={cellIndex}
                    className={`board-cell ${cell === 1 ? 'red' : cell === 2 ? 'yellow' : ''}`}
                  ></div>
                ))}
              </div>
            ))}
          </div>
          <div>
            {winnerMessage && <p>{winnerMessage}</p>}
            <button onClick={handleReset} type="button" className="btn btn-secondary">Reset Game</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Connect4PvP;