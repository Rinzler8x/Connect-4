import { Link } from "react-router-dom";
import './components stylesheets/styleNavBar.css';

function NavBar() {
    return (
        <>
            <nav className="navbar navbar-expand-lg fixed-top bg-body-tertiary p-0" data-bs-theme="dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Connect 4</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
                        <div className="tabs">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0 text-center">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/connect4">P L A Y</Link>
                                </li>
                                {/* <li className="nav-item">
                            <Link className="nav-link" to="/about">About</Link>
                            </li> */}
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default NavBar;