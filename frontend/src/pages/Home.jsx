import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import './pages stylesheets/styleHome.css';
import PlayCard from "../components/PlayCard";
function Home() {
    return (
        <>
            <NavBar />

            <div className="container text-center">
                <div className="row">
                    <div className="col"><PlayCard header={"P v P"} title={"Player vs Player"} description={"2 players goes head to head."} />
                    </div>
                    <div className="col"><PlayCard header={"Easy"} title={"Player vs Computer"} description={"Player goes head to head with computer."} />
                    </div>
                    <div className="col"><PlayCard header={"Hard"} title={"Player vs Computer"} description={"Player goes head to head with computer."} /></div>
                </div>
            </div>
        </>
    );
}

export default Home;