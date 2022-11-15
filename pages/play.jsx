import ColorTracker from "../components/ColorTracker";
import Button from "../components/Button";
import Timer from "../components/Timer";
import GameOver from "../components/GameOver";
import { useEffect, useState } from "react";
import uuid from "react-uuid";

export default function GamePage() {
  const [isGameOver, setIsGameOver] = useState(false);
  const [currentColor, setCurrentColor] = useState("#ffffff");
  const [currentGuesses, setCurrentGuesses] = useState(0);
  const [hexSelections, setHexSelections] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30); // TODO: get this number from the params
  const [colorHistory, setColorHistory] = useState([]);
  const [score, setScore] = useState(0);

  const getSelectionScore = (selection) => {
    switch (selection) {
      case 1:
        return 100;
      case 2:
        return 50;
      case 3:
        return 10;
    }
  };
  function getScore(selections) {
    selections.reduce((total, selection) => {
      return total + getSelectionScore(selection.numGuesses);
    }, 0);
    setScore((currScore) => currScore + total);
  }

  function resetGame() {
    setIsGameOver(false);
    setCurrentColor("#ffffff");
    setCurrentGuesses(0);
    setHexSelections([]);
    setColorHistory([]);
    setTimeLeft(30);
    startGame();
  }

  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function startGame() {
    nextColor();
  }

  useEffect(() => {
    startGame();
  }, []);

  // fischer yates shuffle
  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
  }

  function nextColor() {
    const questionId = uuid();
    const randomColor = getRandomColor();
    const newQuestion = { color: randomColor, guesses: [], id: questionId, isCorrect: false };

    setColorHistory((currQuestions) => [...currQuestions, newQuestion]);
    // setCurrentColor(randomColor);
    // setColorHistory((currHistory) => [...currHistory, { color: randomColor, guesses: [], id:  }]);
    const selections = [
      { color: getRandomColor(), isShowing: true, isCorrect: false, questionId },
      { color: getRandomColor(), isShowing: true, isCorrect: false, questionId },
      { color: randomColor, isShowing: true, isCorrect: true, questionId },
    ];
    setHexSelections(shuffle(selections));
  }

  function addCorrectColor(color, numGuesses) {
    setColorHistory((colorHistory) => [...colorHistory, { color, numGuesses: numGuesses }]);
  }

  function resetCurrentGuesses() {
    setCurrentGuesses(0);
  }

  function handleSelection(color) {
    if (color.isCorrect) {
      setColorHistory((currQuestions) =>
        currQuestions.map((question) =>
          question.id === color.questionId
            ? {
                ...question,
                isCorrect: true,
                guesses: [...question.guesses, { color: color.color, isCorrect: true }],
              }
            : question
        )
      );
      // addCorrectColor(color, currentGuesses + 1);
      // setColorHistory((colorHistory) => [...colorHistory, { color, numGuesses: numGuesses + }]);
      // resetCurrentGuesses();
      nextColor();
    } else {
      setColorHistory((currQuestions) =>
        currQuestions.map((question) =>
          question.id === color.questionId
            ? {
                ...question,
                guesses: [...question.guesses, { color: color.color, isCorrect: false }],
              }
            : question
        )
      );
      setTimeLeft((prevTime) => prevTime - 5);
      // setCurrentGuesses((currentGuesses) => currentGuesses + 1);
      setHexSelections((hexSelections) => {
        return hexSelections.map((selection) => {
          if (selection.color === color.color) {
            return { ...selection, isShowing: false };
          }
          return selection;
        });
      });
    }
  }

  if (isGameOver) return <GameOver colorHistory={colorHistory} onReset={resetGame} />;

  return (
    <div className="max-w-5xl grid pt-32 items-center mx-auto">
      <div className="flex justify-between w-full items-end p-4">
        <div>
          <ColorTracker colorHistory={colorHistory} />
        </div>
        <Timer
          time={timeLeft}
          onTick={() => setTimeLeft((prevTimeLeft) => prevTimeLeft - 1)}
          onTimerEnd={() => setIsGameOver(true)}
          classes={"text-4xl font-bold"}
        />
      </div>
      <div
        style={{ backgroundColor: colorHistory[colorHistory.length - 1]?.color }}
        className={`rounded-3xl w-full h-[350px] `}
      />
      <div className="grid grid-cols-3 w-full mx-auto py-4 gap-4 auto-cols-auto">
        {hexSelections.map((hex, idx) =>
          hex.isShowing ? (
            <Button key={idx} onClick={() => handleSelection(hex)}>
              {hex.color}
            </Button>
          ) : (
            <Button key={idx} classes={"bg-red-300"} disabled={true}>
              {hex.color}
            </Button>
          )
        )}
      </div>
    </div>
  );
}
