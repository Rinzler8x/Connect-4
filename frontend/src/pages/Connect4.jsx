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