import React, { useEffect, useState } from 'react';
import './components stylesheets/styleConnect4AlphaBeta.css';
// import game_page from "../assets/home_page.jpg";
import game_page from '../assets/game_page1.jpg';


function Connect4AlphaBeta() {
    const [board, setBoard] = useState([]);
    const [topRowButtons, setTopRowButtons] = useState([0, 1, 2, 3, 4, 5, 6]);
    const [winnerMessage, setWinnerMessage] = useState("")

    useEffect(() => {
        handleReset();
    }, []);

    const handleClick = (event) => {
        const buttonValue = event.target.value;
        fetch('http://localhost:8002/api/connect-4/alpha-beta/player-turn', {
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
                if (data.turn == 1 && data.game_over == 0) {
                    callAiTurn();
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    const handleReset = () => {
        fetch('http://localhost:8002/api/connect-4/alpha-beta/reset-click', {
            method: 'POST',
        })
            .then(response => response.json())
            .then(data => {
                setBoard(data.board);
                setWinnerMessage(data.message);
                if (data.turn == 1) {
                    setTimeout(() => {
                        callAiTurn();
                    }, 500);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    const callAiTurn = () => {
        setTimeout(() => {
            fetch('http://localhost:8002/api/connect-4/alpha-beta/ai-turn')
                .then(response => response.json())
                .then(data => {
                    console.log('AI turn:', data);
                    setBoard(data.board);
                    if (data.message) {
                        setWinnerMessage(data.message);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }, 0);
    };

    return (
        <>
            <div className='d-flex justify-content-center' style={{ width: '100vw', height: '100vh', backgroundImage: `url(${game_page})`, position: 'absolute', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="game-container" style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '85vh',
                    backgroundColor: 'white',
                    border: '1px solid #ccc',
                    borderRadius: '65px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    padding: '350px 0 330px 0',
                    width: '80%',
                    maxWidth: '750px',
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
                                    className="btn btn-secondary"
                                    style={{ margin: '0 10px 0 10px', fontFamily: 'Arial'}}
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
                            <button onClick={handleReset} type="button" className="btn btn-secondary mt-3" style={{fontFamily: 'Arial'}}>Reset Game</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Connect4AlphaBeta;
