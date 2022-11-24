import { ColorTracker } from "../components/ColorTracker";
import Button from "../components/Button";
import Timer from "../components/Timer";
import { GameOver } from "../components/GameOver";
import { useEffect, useState } from "react";
import { shuffle } from "../utils";

export function Game() {
  const [isGameOver, setIsGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [rounds, setRounds] = useState([]);
  const [currentRound, setCurrentRound] = useState(0);
  const [penalized, setPenalized] = useState(false);

  useEffect(() => {
    setRounds(
      Array(10)
        .fill()
        .map(() => getColorState(3))
    );
  }, []);

  useEffect(() => {
    if (currentRound > 10) {
      setIsGameOver(true);
    }
  }, [setIsGameOver, currentRound]);

  function handleSelection(color) {
    // Keep track of the current guess count (+ 1 for the current guess)
    const currentGuessCount =
      1 +
      rounds[currentRound].reduce((total, color) => {
        if (color.selected) {
          return total + 1;
        } else {
          return total;
        }
      }, 0);

    // Change chosen color to selected
    setRounds((currRounds) =>
      currRounds.map((round, idx) => {
        if (idx === currentRound) {
          return round.map((colorState) => {
            if (colorState.hexCode === color.hexCode) {
              return {
                ...colorState,
                selected: true,
              };
            } else {
              return colorState;
            }
          });
        } else {
          return round;
        }
      })
    );

    // If the guess is correct, add a new round of colors
    if (color.isCorrect) {
      if (currentRound === 9) {
        setIsGameOver(true);
      } else {
        setCurrentRound((currRound) => currRound + 1);
      }
      return;
    }
    // If the guess is incorrect and the guess count is 2, penalize time and add a new round of colors
    if (!color.isCorrect && currentGuessCount === 2) {
      if (currentRound === 9) {
        setIsGameOver(true);
      } else {
        penalizeTime(10);
        setCurrentRound((currRound) => currRound + 1);
      }
      return;
    }
    // If the guess is incorrect and the guess count is 1, penalize time
    penalizeTime(10);
  }

  // Helper functions
  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  function getColorState(n) {
    const colors = [];
    for (let i = 0; i < n; i++) {
      colors.push(getRandomColor());
    }

    const colorState = colors.map((color, idx) => ({
      hexCode: color,
      selected: false,
      isCorrect: idx === 0 ? true : false,
    }));

    return shuffle(colorState);
  }

  function penalizeTime(seconds) {
    setPenalized(true);
    setTimeout(() => {
      setPenalized(false);
    }, 250);
    setTimeLeft((prevTime) => (prevTime - seconds < 0 ? 0 : prevTime - seconds));
  }

  function resetGame() {
    setIsGameOver(false);
    setTimeLeft(60);
    setRounds(
      Array(10)
        .fill()
        .map(() => getColorState(3))
    );
    setCurrentRound(0);
  }

  const transformedResults = rounds.map((result) => {
    return {
      color: result.find((result) => result.isCorrect).hexCode,
      right: result.filter((result) => result.isCorrect && result.selected).length,
      wrong: result.filter((result) => !result.isCorrect && result.selected).length,
    };
  });

  const score = transformedResults.reduce((total, result) => {
    return total + result.right * 100 - result.wrong * 50;
  }, 0);

  if (isGameOver)
    return (
      <GameOver
        results={transformedResults}
        onReset={resetGame}
        score={score}
        timeRemaining={timeLeft}
      />
    );
  if (rounds.length === 0) return <div>Loading...</div>;
  return (
    <div className="flex flex-col min-h-screen">
      <div className="grid grid-cols-12 h-[56px] w-full absolute top-0 bg-zinc-100">
        <div className="col-span-10 grid grid-cols-10">
          <ColorTracker rounds={transformedResults} />
        </div>
        <div className="col-span-1 text-4xl flex justify-center items-center font-bold">
          {score}
        </div>
        <div className="col-span-1">
          <Timer
            time={timeLeft}
            onTick={() => setTimeLeft((prevTimeLeft) => prevTimeLeft - 1)}
            onTimerEnd={() => setIsGameOver(true)}
            classes={
              "text-4xl font-bold absolute right-0 h-[56px] flex items-center justify-center px-4"
            }
            penalized={penalized}
          />
        </div>
      </div>
      <div
        style={{
          backgroundColor: rounds[currentRound].filter((color) => color.isCorrect)[0].hexCode,
        }}
        className={`w-full h-full flex-1`}
      />

      <div className="grid sm:grid-cols-3 w-full mx-auto auto-cols-auto h-[200px]">
        {rounds.length > 0 &&
          rounds[currentRound].map((color, idx) => (
            <Button
              key={idx}
              classes={`font-bold text-5xl ${
                color.selected
                  ? "bg-red-300 opacity-50 cursor-disabled"
                  : "hover:bg-slate-200 cursor-pointer"
              }`}
              onClick={() => (color.selected ? null : handleSelection(color))}
              disabled={color.selected}>
              {color.hexCode}
            </Button>
          ))}
      </div>
    </div>
  );
}
