import ColorTracker from "../components/ColorTracker";
import Button from "../components/Button";
import Timer from "../components/Timer";
import GameOver from "../components/GameOver";
import { useEffect, useState } from "react";
import { shuffle } from "../utils";

export function Game() {
  // const [rounds, setRounds] = useState(12);
  // const [round, setRound] = useState(1);
  // const [tries, setTries] = useState(2);
  // const [colors, setColors] = useState([]);
  // const [correctColor, setCorrectColor] = useState("");
  // const [correctColorIndex, setCorrectColorIndex] = useState(0);
  // const [score, setScore] = useState(0);
  // const [gameOver, setGameOver] = useState(false);

  const [isGameOver, setIsGameOver] = useState(false);
  const [currentOptions, setCurrentOptions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [rounds, setRounds] = useState([]);
  const [guessCount, setGuessCount] = useState(0);
  const [penalized, setPenalized] = useState(false);

  useEffect(() => {
    nextColor();
  }, []);

  function resetGame() {
    setIsGameOver(false);
    setCurrentOptions([]);
    setRounds([]);
    setTimeLeft(60);
    nextColor();
  }

  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function nextColor() {
    const randomColor = getRandomColor();
    const newRound = { color: randomColor, guesses: [], isCorrect: false };

    setRounds((currRounds) => [...currRounds, newRound]);
    const selections = [
      { color: getRandomColor(), isGuessed: false, isCorrect: false },
      { color: getRandomColor(), isGuessed: false, isCorrect: false },
      { color: randomColor, isGuessed: false, isCorrect: true },
    ];
    setCurrentOptions(shuffle(selections));
  }

  function penalizeTime(seconds) {
    setPenalized(true);
    setTimeout(() => {
      setPenalized(false);
    }, 250);
    setTimeLeft((prevTime) => prevTime - seconds);
  }

  function handleSelection(color) {
    setRounds((currRounds) =>
      currRounds.map((round, idx) =>
        idx === currRounds.length - 1
          ? {
              ...round,
              isCorrect: color.isCorrect,
              guesses: [...round.guesses, { color: color.color, isCorrect: color.isCorrect }],
            }
          : round
      )
    );

    if (color.isCorrect) {
      nextColor();
      setGuessCount(0);
      return;
    }
    if (!color.isCorrect && guessCount === 0) {
      penalizeTime(10);
      setGuessCount((prevCount) => prevCount + 1);
      setCurrentOptions((prevOptions) =>
        prevOptions.map((option) =>
          option.color === color.color ? { ...option, isGuessed: true } : option
        )
      );
      return;
    }
    penalizeTime(10);
    nextColor();
    setGuessCount(0);
  }

  if (isGameOver) return <GameOver results={rounds} onReset={resetGame} />;

  return (
    <div className="flex flex-col min-h-screen">
      <div className="grid grid-cols-12 h-[56px] w-full absolute top-0 bg-zinc-100">
        <ColorTracker results={rounds} />
      </div>
      <Timer
        time={timeLeft}
        onTick={() => setTimeLeft((prevTimeLeft) => prevTimeLeft - 1)}
        onTimerEnd={() => setIsGameOver(true)}
        classes={
          "text-4xl font-bold absolute right-0 h-[56px] flex items-center justify-center px-4"
        }
        penalized={penalized}
      />
      <div
        style={{ backgroundColor: rounds[rounds.length - 1]?.color }}
        className={`w-full h-full flex-1`}
      />

      <div className="grid sm:grid-cols-3 w-full mx-auto auto-cols-auto h-[200px]">
        {currentOptions.map((hex, idx) => (
          <Button
            key={idx}
            classes={`font-bold text-5xl ${
              hex.isGuessed
                ? "bg-red-300 opacity-50 cursor-disabled"
                : "hover:bg-slate-200 cursor-pointer"
            }`}
            onClick={() => (hex.isGuessed ? null : handleSelection(hex))}
            disabled={hex.isGuessed}>
            {hex.color}
          </Button>
        ))}
      </div>
    </div>
  );
}
