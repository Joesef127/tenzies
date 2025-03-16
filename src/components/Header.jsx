import './Header.css';

const Header = ({ difficulty, changeLevel }) => {
  const highScore = JSON.parse(localStorage.getItem('highScores'));
  const bestTime = JSON.parse(localStorage.getItem('bestTime'));
  return (
    <div className="header">
      <nav role="navigation">
        <div id="menuToggle">
          <input type="checkbox" id="menuCheckbox" />

          <span></span>
          <span></span>
          <span></span>

          <ul id="menu">
            <li>
              <a href="#about">
                <label for="menuCheckbox" onclick="this.parentNode.click();">
                  <ul>
                    <li className="select-level">Best Time</li>
                    <li>Easy: {bestTime ? bestTime.easy + 's' : 0}</li>
                    <li>Medium: {bestTime ? bestTime.medium + 's': 0}</li>
                    <li>Hard: {bestTime ? bestTime.hard + 's' : 0}</li>
                  </ul>
                </label>
              </a>
            </li>
            <li>
              <a href="#about">
                <label for="menuCheckbox" onclick="this.parentNode.click();">
                  <ul>
                    <li className="select-level">High Scores</li>
                    <li>Easy: {highScore? highScore.easy : 0}</li>
                    <li>Medium: {highScore ? highScore.medium : 0}</li>
                    <li>Hard: {highScore ? highScore.hard : 0}</li>
                  </ul>
                </label>
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <h2 className="game-name">Tenzies</h2>
      <select
        className="select-level"
        name="level"
        id="level"
        value={difficulty}
        onChange={changeLevel}
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
    </div>
  );
};

export default Header;
