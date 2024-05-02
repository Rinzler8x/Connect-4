import { useLocation } from "react-router-dom";
import Connect4AlphaBeta from "../components/Connect4AlphaBeta";
import Connect4PvP from "../components/Connect4PvP";
import NavBar from "../components/NavBar";
import Connect4MinMax from "../components/Connect4MinMax";

function Connect4() {

    const location = useLocation();

    const useQuery = () => {
        return new URLSearchParams(location.search);
    }

    const query = useQuery();
    const gameMode = query.get('gameMode');

    return (
        <>
            <NavBar />
            if(gameMode === 'pvp'){
                console.log("pvp")
                // <Connect4PvP />
            }

            if(gameMode === 'easy'){
                console.log("easy")
                // <Connect4MinMax />
            }

            if(gameMode === 'hard'){
                console.log("hard")
                // <Connect4AlphaBeta />
            }
        </>
    );
}

export default Connect4