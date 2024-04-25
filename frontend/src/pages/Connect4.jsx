import { Link } from "react-router-dom";
import Connect4AlphaBeta from "../components/Connect4AlphaBeta";


function Connect4() {
    return (
        <>
            <p>Connect4 Test</p>
            <Link to="/">Home</Link>
            <Connect4AlphaBeta />
        </>
    );
}

export default Connect4