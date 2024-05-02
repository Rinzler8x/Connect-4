import { Link } from "react-router-dom";

function Card({ header, title, description, buttonMargin, path }) {

  return (
    <>
      <div className="card border-info text-center" style={{ width: '18rem' }}>
        <div className="card-header">{header}</div>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <Link to={path} className={buttonMargin}>Start</Link>
        </div>
      </div >
    </>
  );

}


function PlayCard() {
  return (
    <>
      <div className="container text-center">
        <div className="row row-cols-1 row-cols-md-3 g-4 ">

          {/* PvP card */}
          <div className="col d-flex justify-content-center">
            <Card
              header={"P v P"}
              title={"Player vs Player"}
              description={"2 players goes head to head."}
              buttonMargin={"btn btn-dark btn-outline-light mt-4"}
              path={"/connect4/?gameMode=pvp"} />
          </div>

          {/* easy card */}
          <div className="col d-flex justify-content-center">
            <Card
              header={"Easy"}
              title={"Player vs AI"}
              description={"Player goes head to head with AI."}
              buttonMargin={"btn btn-dark btn-outline-light"}
              path={"/connect4/?gameMode=easy"} />
          </div>

          {/* hard card */}
          <div className="col d-flex justify-content-center">
            <Card
              header={"Hard"}
              title={"Player vs AI"}
              description={"Player goes head to head with AI."}
              buttonMargin={"btn btn-dark btn-outline-light"}
              path={"/connect4/?gameMode=hard"} />
          </div>
        </div>
      </div>
    </>
  )
}

export default PlayCard;