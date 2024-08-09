import Dice from "./Dice";
import "./Board.css";

function Board({ name, color, gameHistory, className = 'Board App-board' }) {
  const num = gameHistory[gameHistory.length - 1] || 1;
  const sum = gameHistory.reduce((prev, cur) => prev + cur, 0);
  return (
    <div className={className}>
      <h2 className="Board-heading">{name}</h2>
      <Dice color={color} num={num} />
      <h2 className="Board-heading">총점</h2>
      <p>{sum}</p>
      <h2 className="Board-heading">기록</h2>
      {gameHistory.join(', ')}
    </div>
  );
}

export default Board;