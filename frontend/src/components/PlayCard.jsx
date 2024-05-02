import { Link } from "react-router-dom";

function PlayCard({ header, title, description }) {

  return (
    <>
      <div className="card border-info mb-3 text-center" style={{ maxWidth: '18rem' }}>
        <div className="card-header">{header}</div>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <Link to="/connect4" className="btn btn-dark btn-outline-light">Start</Link>
        </div>
      </div>
    </>
  );

}

export default PlayCard;