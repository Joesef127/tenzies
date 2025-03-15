import { useEffect, useState } from 'react';
import './App.css';
import './mobile.css';
import Dice from './components/Dice';
import Win from './components/Win';

export default function App() {
  const [dices, setDices] = useState(allNewDice());
  const [isOpen, setIsOpen] = useState(false);
  const [tenzies, setTenzies] = useState(false);
  const [rolls, setRolls] = useState(0);
  const [clicks, setClicks] = useState(0);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState({
    easy: 10,
    medium: 20,
    hard: 50,
  });

  useEffect(() => {
    const allHeld = dices.every((dice) => dice.isHeld);
    const firstValue = dices[0].value;
    const allSameValue = dices.every((dice) => dice.value === firstValue);

    const heldDice = dices.filter((dice) => dice.isHeld === true).length;

    const calculatedScore =
      rolls && clicks && heldDice
        ? Math.floor((clicks * heldDice) / rolls) * 10
        : 0;

    // console.log('rolls: ', rolls);
    // console.log('clicks: ', clicks);
    // console.log('held dice: ', heldDice);
    // console.log('calculated score:', calculatedScore);

    setScore(calculatedScore);

    if (allHeld && allSameValue) {
      setTenzies(true);
      openModal();
      localStorage.setItem('highScore', calculatedScore);
      const storedScore = localStorage.getItem('highScore');
      const highScore =
        calculatedScore > JSON.parse(storedScore)
          ? storedScore
          : calculatedScore;
      localStorage.setItem('highScore', highScore);
      console.log('stored high score: ', highScore);
    }
  }, [dices]);

  function changeLevel(event) {
    const { value } = event.target;
    const newArray = [];
    for (let i = 0; i < value; i++) {
      newArray.push(generateNewDie(i));
    }
    // console.log('level changed', newArray);
    setDices(newArray);
  }

  function generateNewDie(id) {
    const randomIndex = Math.ceil(Math.random() * 6);
    return { value: randomIndex, isHeld: false, id: id };
  }

  function allNewDice() {
    const diceArray = [];
    for (let i = 0; i < 10; i++) {
      diceArray.push(generateNewDie(i));
    }
    return diceArray;
  }

  function diceRoll() {
    setDices((prevDice) =>
      prevDice.map((die) => {
        return die.isHeld ? die : generateNewDie(die.id);
      })
    );
    setRolls((prevRolls) => prevRolls + 1);
  }

  function holdDice(id) {
    setDices((prevDice) =>
      prevDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
    setClicks((prevClick) => prevClick + 1);
  }

  const diceElements = dices.map((dice) => (
    <Dice
      key={dice.id}
      value={dice.value}
      isHeld={dice.isHeld}
      // id={dice.id}
      holdDice={() => holdDice(dice.id)}
    />
  ));

  function closeModal() {
    setIsOpen((prevModal) => !prevModal);
  }

  function openModal() {
    setIsOpen((prevModal) => !prevModal);
  }

  function restartGame() {
    setDices(allNewDice());
    setIsOpen(false);
    setTenzies(false);
    setRolls(0);
    setClicks(0);
  }

  return (
    <main>
      <div className="container">
        <div
          className="modal-overlay"
          style={isOpen ? { display: 'flex' } : { display: 'none' }}
        >
          <Win
            closeModal={closeModal}
            restartGame={restartGame}
            rolls={rolls}
            clicks={clicks}
          />
        </div>
        <div className="header">
          <h1>Tenzies</h1>
          <select
            name="level"
            id="level"
            defaultValue={level.easy}
            onChange={changeLevel}
          >
            <option value={level.easy}>Easy</option>
            <option value={level.medium}>Medium</option>
            <option value={level.hard}>Hard</option>
          </select>
        </div>
        <p>
          Roll until all dice are the same. Click die to freeze it at it's
          current value between rolls
        </p>
        <div className="dice-box">{diceElements}</div>

        <div className="btn-box">
          <button className="roll" onClick={tenzies ? restartGame : diceRoll}>
            {tenzies ? 'New Game' : 'Roll'}
          </button>
          <button className="roll-blank">Score: {score}</button>
        </div>
      </div>
    </main>
  );
}
