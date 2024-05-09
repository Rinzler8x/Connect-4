import React, { useEffect, useState } from 'react';
import './components stylesheets/styleConnect4AlphaBeta.css';
// import game_page from '../assets/game_page.jpeg';
import game_page from "../assets/home_page.jpg";

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
        setWinnerMessage(data.message);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <>
      <div className='d-flex justify-content-center' style={{ width: '100vw', height: '100vh', backgroundImage: `url(${game_page})` }}>
        {/* <div className='spacer'></div> */}
        <div className="game-container" style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '85vh',
          backgroundColor: 'white',
          border: '1px solid #ccc',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          padding: '400px 0 400px 0',
          width: '80%',
          maxWidth: '900px',
          margin: 'auto'
        }}>
          <div className="text-center">
            <div className="d-grid d-md-block">
              {topRowButtons.map((buttonValue, index) => (
                <button
                  key={index}
                  value={buttonValue}
                  onClick={handleClick}
                  type="button"
                  className="btn btn-secondary mx-3 "
                  style={{ margin: '0 21px 0 21px'}}
                >
                  {/* Column {buttonValue} */}
                  Drop
                </button>
              ))}
            </div>
            <div className="board-container">
              {board.map((row, rowIndex) => (
                <div key={rowIndex} className="board-row">
                  {row.map((cell, cellIndex) => (
                    <div key={cellIndex} className='board-cell'>
                      <div
                        className={`circle ${cell === 1 ? 'red' : cell === 2 ? 'yellow' : ''}`}
                      ></div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div>
              {winnerMessage && <p style={{ color: 'black', padding: '20px 0 0 0', fontFamily: 'Arial' }}>{winnerMessage}</p>}
              <button onClick={handleReset} type="button" className="btn btn-secondary mt-3">Reset Game</button>
            </div>
          </div>
        </div>
      </div >
    </>
  );
}

export default Connect4PvP;
