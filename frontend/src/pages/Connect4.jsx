import { useLocation } from "react-router-dom";
import Connect4AlphaBeta from "../components/Connect4AlphaBeta";
import Connect4PvP from "../components/Connect4PvP";
import NavBar from "../components/NavBar";
import Connect4MinMax from "../components/Connect4MinMax";
import PlayCards from "../components/PlayCards";
import home_page from "../assets/home_page.jpg";

function Connect4() {
    return (
        <>
            <div className="d-flex justify-content-center" style={{ width: '100vw', height: '100vh', backgroundImage: `url(${home_page})` }}>
                <PlayCards />
            </div>
        </>
    );
}

export default Connect4;