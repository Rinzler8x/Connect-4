import { useLocation } from "react-router-dom";
import Connect4AlphaBeta from "../components/Connect4AlphaBeta";
import Connect4PvP from "../components/Connect4PvP";
import NavBar from "../components/NavBar";
import Connect4MinMax from "../components/Connect4MinMax";

function Connect4() {

    const location = useLocation();

    const query = new URLSearchParams(location.search);
    const gameMode = query.get('gameMode');

    return (
        <>
            <NavBar />
            {gameMode === 'pvp' && <Connect4PvP />}
            {gameMode === 'easy' && <Connect4MinMax />}
            {gameMode === 'hard' && <Connect4AlphaBeta />}
        </>
    );
}

export default Connect4