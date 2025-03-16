const Win = ({ closeModal, rolls, clicks, score, timeTaken }) => {
  return (
    <div className="win-modal">
      <h2 className="win-header">Congratulations!</h2>
      <div className="win-details">
        <p className="rolls">
          You rolled <strong>{rolls}</strong> times
        </p>
        <p className="clicks">
          You clicked <strong>{clicks}</strong> times
        </p>
        <p className="score">
          Your score: <strong>{score}</strong>
        </p>
        <p className="time">
          Time taken: <strong>{timeTaken} sec</strong>
        </p>
      </div>
      <div className="win-btn-box">
        <button className="win-btn" onClick={closeModal}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Win;
