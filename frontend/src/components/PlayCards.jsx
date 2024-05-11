import { Link } from "react-router-dom";
import pvpImage from '../assets/pvp.png';
import pveImage from '../assets/pve.png';

function Card({ header, title, description, path, icon }) {
  return (
    <>
      <div className="card border-info text-center" style={{ width: '20rem' }}>
        <div className="card-header" style={{ fontFamily: 'Arial' }}>{header}</div>
        <img src={icon} className="card-img-top my-2 mx-auto" alt="image" style={{ width: '256px', height: '256px' }} />
        <div className="card-body border-top">
          <h5 className="card-title mt-3" style={{ fontFamily: 'Arial' }}>{title}</h5>
          <p className="card-text" style={{ fontFamily: 'Arial' }}>{description}</p>
          <Link to={path} className="btn btn-dark btn-outline-light mt-3" style={{ fontFamily: 'Arial' }}>Start</Link>
        </div>
      </div >
    </>
  );
}


function PlayCards() {
  return (
    <>
      <div className="container text-center">
        <div className="row row-cols-1 row-cols-md-3 g-4 ">

          {/* PvP card */}
          <div className="col d-flex justify-content-center my-3">
            <Card
              header={"P v P"}
              title={"Player vs Player"}
              description={"2 players go head to head."}
              path={"/connect4pvp"}
              icon={pvpImage} />
          </div>

          {/* easy card */}
          <div className="col d-flex justify-content-center my-3">
            <Card
              header={"Easy"}
              title={"Player vs AI"}
              description={"Player goes head to head with AI."}
              path={"/connect4minmax"}
              icon={pveImage} />
          </div>

          {/* hard card */}
          <div className="col d-flex justify-content-center my-3">
            <Card
              header={"Hard"}
              title={"Player vs AI"}
              description={"Player goes head to head with AI."}
              path={"/connect4alphabeta"}
              icon={pveImage} />
          </div>
        </div >
      </div>
    </>
  );
}

export default PlayCards;