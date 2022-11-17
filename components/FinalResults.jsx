import { BsCheckLg, BsXLg } from "react-icons/bs";
import Score from "./Score";

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
    <>
      <h1 className={`text-black text-[100px] md:text-[300px] font-bold text-center`}>
        {score}
        {/* <Score score={score} /> */}
      </h1>
      <div className="w-full flex flex-1">
        {results.map((result, idx) => (
          <div
            key={idx}
            className="font-bold flex justify-center items-start text-sm flex-1 p-4"
            style={{ backgroundColor: result.color }}>
            <div className="bg-zinc-100 p-2">
              <h2>{result.color}</h2>
              <div className="flex gap-2 mt-2 justify-center">
                {result.guesses.map((guess, guessIdx) =>
                  guess.isCorrect ? (
                    <div key={guessIdx} className="flex flex-col items-center text-green-500">
                      <BsCheckLg />
                      <div>+100</div>
                    </div>
                  ) : (
                    <div key={guessIdx} className="flex flex-col items-center text-red-500">
                      <BsXLg />
                      <div>-50</div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
