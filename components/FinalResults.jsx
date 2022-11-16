import { BsCheck, BsCheckLg, BsXLg } from "react-icons/bs";
import Button from "./Button";

export default function FinalResults({ results, onReset = () => {} }) {
  if (results.length === 0) return null;

  function getPoints(guesses) {
    const graded = guesses.reduce(
      (gradedGuesses, guess) => {
        if (guess.isCorrect) {
          gradedGuesses.correct++;
        } else {
          gradedGuesses.incorrect++;
        }
        return gradedGuesses;
      },
      { correct: 0, incorrect: 0 }
    );
    return graded.correct * 100 - graded.incorrect * 50;
  }

  const score = results.reduce((totalPoints, currentColor) => {
    return totalPoints + getPoints(currentColor.guesses);
  }, 0);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="grid md:grid-cols-2 pt-32">
        <div className="flex flex-col justify-center items-center">
          <h1 className="font-bold text-5xl pb-8">{score} points</h1>
          <div>
            <div className="flex gap-2 items-center">
              <BsCheckLg className="text-green-500" /> <label> = 100 points</label>
            </div>
            <div className="flex gap-2 items-center">
              <BsXLg className="text-red-500" /> <BsCheckLg className="text-green-500" />{" "}
              <label> = 50 points</label>
            </div>
            <div className="flex gap-2 items-center">
              <BsXLg className="text-red-500" /> <BsXLg className="text-red-500" />{" "}
              <label> = -50 points</label>
            </div>
          </div>
        </div>
        <Button
          classes="flex justify-center items-center w-full mt-8 text-5xl font-bold"
          onClick={() => onReset()}>
          Restart
        </Button>
      </div>
      <div className="my-16 grid gap-8 grid-cols-8">
        {results.map((result, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <div
              className="w-20 h-20 rounded-full font-bold flex justify-center items-center text-sm"
              style={{ backgroundColor: result.color }}>
              {result.color}
            </div>
            <div className="flex gap-2 mt-2">
              {result.guesses.map((guess, idx) =>
                guess.isCorrect ? (
                  <BsCheckLg key={idx} className="text-green-500" />
                ) : (
                  <BsXLg key={idx} className="text-red-500" />
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
