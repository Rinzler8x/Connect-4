// import "./pages stylesheets/styleHowToPlay.css";
import how_to_play from "../assets/how_to_play.jpg";
import { Link } from "react-router-dom";


function HowToPlay() {
  return (
    <>
      <div className="d-flex justify-content-center" style={{ width: 'auto', height: '100vh', backgroundImage: `url(${how_to_play})` }}>
        <div className="card text-center" style={{ width: '36rem', height: '32rem', marginTop: '4em', fontSize: '16px', borderRadius: '30px' }}>
          <div className="card-body">
            <h5 className="card-title mb-4"
              style={{
                fontSize: '40px', fontFamily: 'Arial, sans-serif'
              }}>How To Play?</h5>
            < p className="card-text" style={{ fontSize: '20px', fontFamily: 'Arial, sans-serif' }}>- The Connect-4 rules are very simple. <br /><br />- It’s always played with 2 players and in a 7x6 vertically suspended grid.<br /><br />
              - Each turn each player puts a piece of his color inside a column and it will fall, until it reaches the lowest available spot.<br /><br />
              - The one who can put 4 pieces of the same color to form a horizontal, vertical, or diagonal line of four wins.<br /><br />
              - If no one manages to do it then the match ends in a draw</p>
            <Link to="../" className="btn btn-light mt-5" style={{ padding: '1em 2em', fontSize: '1.2em' }}>Back</Link>
          </div>
        </div>
      </div >
    </>
  );
}

export default HowToPlay;