import './pages stylesheets/styleHome.css';
import home_page from "../assets/home_page.jpg";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div className="m-auto">
        <div className="startScreen" style={{ backgroundImage: `url(${home_page})` }}>
          <div id="nameg" style={{ fontFamily: 'Arial' }}>Connect Four</div>
          <Link to="/connect4" className="btn btn-light" style={{ padding: '1em 4em', fontSize: '1.35em', fontFamily: 'Arial' }}>Start</Link>
          <div className="my-2"></div>
          <Link to="/howtoplay" className="btn btn-light" style={{ padding: '1em 2em', fontSize: '1.45em', fontFamily: 'Arial' }}>How to Play</Link>
        </div>
      </div>
    </>
  );
}

export default Home;