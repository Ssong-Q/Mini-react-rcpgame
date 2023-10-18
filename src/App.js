import { useState } from "react";
import ResetButton from "./ResetButton";
import HandButton from "./HandButton";
import HandIcon from "./HandIcon";
import Score from "./Score";
import Box from "./Box";
import { compareHand, generateRandomHand } from "./utils";
import icResetImg from "./assets/ic-reset.svg";
import "./App.css";

const INITIAL_VALUE = "rock";

function getResult(me, other) {
  const comparison = compareHand(me, other);
  if (comparison > 0) return "승리";
  if (comparison < 0) return "패배";
  return "무승부";
}

function App() {
  const [hand, setHand] = useState(INITIAL_VALUE);
  const [otherHand, setOtherHand] = useState(INITIAL_VALUE);
  const [gameHistory, setGameHistory] = useState([]);
  const [score, setScore] = useState(0);
  const [otherScore, setOtherScore] = useState(0);
  const [bet, setBet] = useState(1);

  const handleButtonClick = (nextHand) => {
    const nextOtherHand = generateRandomHand();
    const nextHistoryItem = getResult(nextHand, nextOtherHand);
    const comparison = compareHand(nextHand, nextOtherHand);
    setHand(nextHand);
    setOtherHand(nextOtherHand);
    setGameHistory([...gameHistory, nextHistoryItem]);
    if (comparison > 0) setScore(score + bet);
    if (comparison < 0) setOtherScore(otherScore + bet);
  };

  const handleClearClick = () => {
    setHand(INITIAL_VALUE);
    setOtherHand(INITIAL_VALUE);
    setGameHistory([]);
    setScore(0);
    setOtherScore(0);
    setBet(1);
  };

  const handleBetChange = (e) => {
    // 여기에 코드를 작성하세요
    let inputValue = +e.target.value;
    if (inputValue > 9) inputValue %= 10;
    if (inputValue < 1) inputValue = 1;
    inputValue = Math.floor(inputValue);
    setBet(inputValue);
  };

  return (
    <div className="App">
      <h1 className="App-heading">가위바위보</h1>
      <ResetButton
        className="App-reset"
        onClick={handleClearClick}
        alt="초기화"
        src={icResetImg}
      />
      <div className="App-scores">
        <Score score={score} person="나"></Score>
        <div className="App-versus">:</div>
        <Score score={otherScore} person="상대"></Score>
      </div>
      <Box className="App-box">
        <div className="App-hands">
          <div className="Hand">
            <HandIcon className="Hand-icon" value={hand} />
          </div>
          <div className="App-versus">VS</div>
          <div className="Hand">
            <HandIcon className="Hand-icon" value={otherHand} />
          </div>
        </div>
        <div className="App-bet">
          <span>배점</span>
          <input
            type="number"
            value={bet}
            min={1}
            max={9}
            onChange={handleBetChange}
          ></input>
          <span>배</span>
        </div>
        <div className="App-history">
          <h2>승부기록</h2>
          <p>{gameHistory.join(", ")}</p>
        </div>
      </Box>
      <HandButton value="rock" onClick={handleButtonClick} />
      <HandButton value="scissor" onClick={handleButtonClick} />
      <HandButton value="paper" onClick={handleButtonClick} />
    </div>
  );
}

export default App;
