import { Link } from "react-router-dom";
import './components stylesheets/styleNavBar.css';

function NavBar() {
    return (
        <>
            <nav className="navbar bg-dark fixed-top border-bottom border-body " data-bs-theme="dark">
                <div className="container-fluid">
                    <Link className="navbar-brand tabs" to="/">
                        {/* <img src="/docs/5.3/assets/brand/bootstrap-logo.svg" alt="Logo" width="30" height="24" className="d-inline-block align-text-top" /> */}
                        Connect 4
                    </Link>
                </div>
            </nav>
        </>
    );
}

export default NavBar;