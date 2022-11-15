import ColorTracker from "../components/ColorTracker";
import Button from "../components/Button";
import Timer from "../components/Timer";
import GameOver from "../components/GameOver";
import { useEffect, useState } from "react";
import uuid from "react-uuid";

export default function GamePage() {
  const [isGameOver, setIsGameOver] = useState(false);
  const [hexSelections, setHexSelections] = useState([]);
  const [timeLeft, setTimeLeft] = useState(60); // TODO: get this number from the params?
  const [colorHistory, setColorHistory] = useState([]);
  const [guessCount, setGuessCount] = useState(0);
  const [penalized, setPenalized] = useState(false);

  function resetGame() {
    setIsGameOver(false);
    setHexSelections([]);
    setColorHistory([]);
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
    const selections = [
      { color: getRandomColor(), isShowing: true, isCorrect: false, questionId },
      { color: getRandomColor(), isShowing: true, isCorrect: false, questionId },
      { color: randomColor, isShowing: true, isCorrect: true, questionId },
    ];
    setHexSelections(shuffle(selections));
  }

  function penalizeTime(seconds) {
    setPenalized(true);
    setTimeout(() => {
      setPenalized(false);
    }, 250);
    setTimeLeft((prevTime) => prevTime - seconds);
    console.log("penalized time");
  }

  // 1. Add guess to results
  // 2. Check if guess is correct
  // 3. If correct, show next color
  // 4. If incorrect, penalize time
  // 5. If second wrong answer, go to next question with 0 points
  // 6. If first wrong answer, update the selections
  function handleSelection(color) {
    setColorHistory((currQuestions) =>
      currQuestions.map((question) =>
        question.id === color.questionId
          ? {
              ...question,
              isCorrect: color.isCorrect ? true : false,
              guesses: [
                ...question.guesses,
                { color: color.color, isCorrect: color.isCorrect ? true : false },
              ],
            }
          : question
      )
    );
    if (color.isCorrect) {
      nextColor();
      setGuessCount(0);
    } else {
      penalizeTime(5);
      if (guessCount === 1) {
        nextColor();
        setGuessCount(0);
      } else {
        setGuessCount((prevCount) => prevCount + 1);
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
  }

  useEffect(() => {
    nextColor();
  }, []);

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
          penalized={penalized}
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
