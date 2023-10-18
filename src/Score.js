import "./Score.css";

function Score({ score, person }) {
  return (
    <>
      <div className="Score">
        <div className="Score-num">{score}</div>
        <div className="Score-name">{person}</div>
      </div>
    </>
  );
}

export default Score;
