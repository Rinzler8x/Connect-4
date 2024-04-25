import { Link } from "react-router-dom";


function Home() {
    return(
        <>
            <p>Home Test</p>
            <Link to="/about">About</Link>
            <Link to="/connect4">Connect 4</Link>
        </>
    );
}

export default Home;