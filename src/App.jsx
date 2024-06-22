import { useState, useEffect } from "react";

import "./App.css";

const pokemon = [
  {
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/100.png`,
    value: 0,
  },
  {
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10.png`,
    value: 1,
  },
  {
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/15.png`,
    value: 2,
  },
  {
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/20.png`,
    value: 3,
  },
  {
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/30.png`,
    value: 4,
  },
  {
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/40.png`,
    value: 5,
  },
  {
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/50.png`,
    value: 6,
  },
  {
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/60.png`,
    value: 7,
  },
  {
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/70.png`,
    value: 8,
  },
];

function App() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [lineup, setLineup] = useState([]);
  const [roundCounter, setRoundCounter] = useState(0);
  const [goldenNumbers, setGoldenNumbers] = useState(null);
  const [stage, setStage] = useState("examine");
  const [guess, setGuess] = useState(null);

  useEffect(() => {
    const holdLineup = [];
    const goldRandom = Math.floor(Math.random() * 9);
    setGoldenNumbers([pokemon[goldRandom].value]);
    while (holdLineup.length < 9) {
      let random = Math.floor(Math.random() * 9);
      if (!holdLineup.includes(random)) {
        holdLineup.push(random);
      }
    }
    console.log(goldenNumbers);
    setLineup(holdLineup);
  }, []);

  const changeLineup = () => {
    console.log(goldenNumbers);
    if (roundCounter < highScore) {
      setRoundCounter(roundCounter + 1);
      newLineup(1);
    } else {
      newLineup(highScore);
      setRoundCounter(0);
      setStage("game");
    }
  };

  const newLineup = (newChamp) => {
    const holdLineup = [];
    if (newChamp) {
      if (newChamp === 10) {
        const holdChamps = []
        const goldRandom = Math.floor(Math.random() * 9);
        holdChamps.push(pokemon[goldRandom].value);
        setGoldenNumbers(holdChamps);
      } else {
        const holdChamps = goldenNumbers;
        const goldRandom = Math.floor(Math.random() * 9);
        holdChamps.push(pokemon[goldRandom].value);
        setGoldenNumbers(holdChamps);
      }
    }
    while (holdLineup.length < 9) {
      let random = Math.floor(Math.random() * 9);
      if (!holdLineup.includes(random)) {
        holdLineup.push(random);
      }
    }
    setLineup(holdLineup);
  };

  const analyzeGuess = () => {
    console.log(guess, goldenNumbers[roundCounter])
    if (guess === goldenNumbers[roundCounter]) {
      if (roundCounter === highScore) {
        setHighScore(score + 1);
        setRoundCounter(0);
        alert("New High Score!");
        setStage("examine");
        newLineup(10);
      } else {
        setScore(score + 1);
        setRoundCounter(roundCounter + 1);
        newLineup(false)
      }
    } else {
      if (score > highScore) {
        setHighScore(score);
      }
      newLineup(false)
      setStage("examine");
      alert("OOh, Incorrect Guess");
    }
  };

  return (
    <>
      <h1>Memory Challenge</h1>
      <p>Remember the highlighted pokemon</p>
      <div>Stage: {roundCounter}</div>
      <div className="gameBoard">
        {stage === "game"
          ? lineup.map((number, index) => (
              <button
                className="pokemon"
                onClick={() => setGuess(number)}
                key={index}
              >
                <img src={pokemon[number].image}></img>
              </button>
            ))
          : lineup.map((number, index) => (
              <div
                className={
                  number === goldenNumbers[roundCounter] ? "goldenChild" : "pokemon"
                }
                key={index}
              >
                <img src={pokemon[number].image}></img>
              </div>
            ))}
      </div>
      <div className="buttonHolder">
        {stage === "game" ? (
          <button onClick={() => analyzeGuess()}>Submit Guess</button>
        ) : highScore === roundCounter ? (
          <button onClick={() => changeLineup()}>Start Exam</button>
        ) : (
          <button onClick={() => changeLineup()}>Next</button>
        )}
      </div>
      <div className="scoreBook">
        <div>Current Score: {score}</div>
        <div>High Score: {highScore}</div>
      </div>
    </>
  );
}

export default App;
