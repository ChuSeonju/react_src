import './App.css';
import HandButton from './HandButton';
import HandIcon from './HandIcon';
import Button from './Button';
import { useState } from 'react';
import { compareHand, generateRandomHand } from './Utils';

const INITIAL_VALUE = 'rock';

function getResult(me, other) {
  const comparison = compareHand(me, other);
  if (comparison > 0) return '승리';
  if (comparison < 0) return '패배';
  return '무승부';
}

function App() {
  const [hand, setHand] = useState(INITIAL_VALUE);
  const [otherHand, setOtherHand] = useState(INITIAL_VALUE);
  const [gameHistory, setGameHistory] = useState([]);
  const [score, setScore] = useState(0);  // 나의 스코어
  const [otherScore, setOtherScore] = useState(0);  // 상대방 스코어
  const [bet, setBet] = useState(1);

  const handleButtonClick = (nextHand) => {
    // hand의 값을 nextHand로 바꾸기
    setHand(nextHand);
    // otherHand의 값을 generaterandomHand()의 리턴값으로 바꾸기
    const nextOtherHand = generateRandomHand();
    setOtherHand(nextOtherHand);
    // 승부 결과
    const nextHistoryItem = getResult(nextHand, nextOtherHand);
    setGameHistory([...gameHistory, nextHistoryItem]);

    const comparison = compareHand(nextHand, nextOtherHand);
    if (comparison > 0) setScore(score + bet);
    if (comparison < 0) setOtherScore(otherScore + bet);

  };

  const handleClearClick = () => {
    // hand와 otherHand의 값을 'rock'으로 변경
    setHand(INITIAL_VALUE);
    setOtherHand(INITIAL_VALUE);
    setGameHistory([]);
    setScore(0);
    setOtherScore(0);
    setBet(1);
  }

  const handleBetChange = (e) => {
    let num = Number(e.target.value);
    if (num > 9) num %= 10; // 1과 9 사이의 숫자로 만들어줌
    if (num < 1) num = 1;
    num = Math.floor(num);
    setBet(num);
  };

  return (
    <div className='App'>
      <h1 className='App-heading'>가위바위보</h1>
      <Button onClick={handleClearClick}>처음부터</Button>

      <div className='App-scores'>
        <div className="Score">
          <div className='Score-num'>{score}</div>
          <div className='Score-name'>나</div>
        </div>
        <div className='App-versus'>:</div>
        <div className="Score">
          <div className='Score-num'>{otherScore}</div>
          <div className='Score-name'>상대</div>
        </div>
      </div>

      <div className='Box App-box'>
        <div className='Box-inner'>
          <div className='App-hands'>
            <div className='Hand'>
              <HandIcon className="Hand-icon" value={hand}/>
            </div>
            <div className='App-versus'>VS</div>
            <div className='Hand'>
              <HandIcon className="Hand-icon" value={otherHand}/>
            </div>
          </div>
          <div className='App-bet'>
            <input type="number" value={bet} min={1} max={9} onChange={handleBetChange}/>
          </div>
          <div className='App-history'>
            <p>승부기록: {gameHistory.join(', ')}</p>
          </div>
        </div>
      </div>

      <div className="HandButtonContainer">
        <HandButton value="rock" onClick={handleButtonClick}/>
        <HandButton value="scissor" onClick={handleButtonClick}/>
        <HandButton value="paper" onClick={handleButtonClick}/>
      </div>
    </div>
  );
}

export default App;
