import { useEffect, useState } from 'react';
import './App.css';
import './mobile.css';
import Dice from './components/Dice';
import Win from './components/Win';
import Header from './components/Header';

export default function App() {
  const [dices, setDices] = useState(() => allNewDice());
  const [isOpen, setIsOpen] = useState(false);
  const [tenzies, setTenzies] = useState(false);
  const [rolls, setRolls] = useState(0);
  const [clicks, setClicks] = useState(0);
  const [score, setScore] = useState(0);
  const [timeTaken, setTimeTaken] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [difficulty, setDifficulty] = useState('easy');
  const [bonusPoints, setBonusPoints] = useState(0)

  const level = { easy: 10, medium: 20, hard: 50 };

  useEffect(() => {
    setDices(allNewDice(level[difficulty]));
  }, [difficulty]);

  useEffect(() => {
    if (rolls === 0) {
      setStartTime(Date.now());
    }
  }, [rolls]);

  useEffect(() => {
    const allHeld = dices.every((dice) => dice.isHeld);
    const firstValue = dices.length > 0 ? dices[0].value : null;
    const allSameValue = dices.every((dice) => dice.value === firstValue);

    if (allHeld && allSameValue) {
      setTenzies(true);
      openModal();
      const endTime = Date.now();
      const timeElapsed = Math.floor((endTime - startTime) / 1000);

      const baseScore = Math.floor(100 + (clicks * 50) / (rolls * 10));

      const bonusPoint = rolls <= 10 ? 200 : 0;
      const finalScore = baseScore > 0 ? baseScore + bonusPoints : 0;

      setScore(finalScore);
      setBonusPoints(bonusPoint);
      setTimeTaken(timeElapsed);
      updateHighScore(finalScore);
      updateTimeTaken(timeElapsed);
    }
  }, [dices]);

  function updateHighScore(newScore) {
    const storedScores = JSON.parse(localStorage.getItem('highScores')) || {
      easy: 0,
      medium: 0,
      hard: 0,
    };

    if (newScore > storedScores[difficulty]) {
      storedScores[difficulty] = newScore;
      localStorage.setItem('highScores', JSON.stringify(storedScores));
    }
  }

  function updateTimeTaken(newTime) {
    const storedTimes = JSON.parse(localStorage.getItem('bestTime')) || {
      easy: 0,
      medium: 0,
      hard: 0,
    };

    if (!storedTimes[difficulty] || newTime < storedTimes[difficulty]) {
      storedTimes[difficulty] = newTime;
      localStorage.setItem('bestTime', JSON.stringify(storedTimes));
    }
  }

  function changeLevel(event) {
    setDifficulty(event.target.value);
  }

  function generateNewDie(id) {
    return { value: Math.ceil(Math.random() * 6), isHeld: false, id };
  }

  function allNewDice(count = 10) {
    const diceArray = [];
    for (let i = 0; i < count; i++) {
      diceArray.push(generateNewDie(i));
    }
    return diceArray;
  }

  function diceRoll() {
    if (!tenzies) {
      setDices((prevDice) =>
        prevDice.map((die) => (die.isHeld ? die : generateNewDie(die.id)))
      );
      setRolls((prev) => prev + 1);
    } else {
      restartGame();
    }
  }

  function holdDice(id) {
    setDices((prevDice) =>
      prevDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
    setClicks((prev) => prev + 1);
  }

  function restartGame() {
    setDices(allNewDice(level[difficulty]));
    setTenzies(false);
    setRolls(0);
    setClicks(0);
    setTimeTaken(0);
    setStartTime(Date.now());
    // setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <main>
      <div className="container">
        {isOpen && (
          <div className="modal-overlay">
            <Win
              closeModal={closeModal}
              restartGame={restartGame}
              rolls={rolls}
              clicks={clicks}
              score={score}
              timeTaken={timeTaken}
              bonusPoints={bonusPoints} 
            />
          </div>
        )}

        <Header difficulty={difficulty} changeLevel={changeLevel} />
        <div className="game-instructions">
          <p>Roll until all dice are the same. Click a die to freeze it.</p>
          <p> Check menu to check high scores change difficulty</p>
        </div>
        <div className="dice-box">
          {dices.map((dice) => (
            <Dice
              key={dice.id}
              value={dice.value}
              isHeld={dice.isHeld}
              holdDice={() => holdDice(dice.id)}
            />
          ))}
        </div>

        <div className="btn-box">
          <button className="roll" onClick={diceRoll}>
            {tenzies ? 'New Game' : 'Roll'}
          </button>
          {/* <button className="roll-blank">Score: {score}</button> */}
        </div>
      </div>
    </main>
  );
}
