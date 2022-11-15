import { BsCheckLg, BsXLg } from "react-icons/bs";

export default function FinalResults({ colorHistory }) {
  if (colorHistory.length === 0) return null;

  function getPoints(guesses) {
    switch (guesses) {
      case 1:
        return 100;
      case 2:
        return 50;
      default:
        return 10;
    }
  }

  const score = colorHistory
    .filter((color) => color.isCorrect)
    .reduce((acc, color) => acc + getPoints(color.guesses.length), 0);

  return (
    <>
      <h1 className="font-bold text-5xl text-center pt-32 pb-8">Final Score {score}</h1>

      <div className="mx-auto grid gap-2 w-[150px]">
        {colorHistory.map((color, idx) =>
          color.isCorrect ? (
            <div key={idx} className="flex gap-2 items-center">
              <div
                className="w-20 h-20 rounded-full font-bold flex justify-center items-center text-sm"
                style={{ backgroundColor: color.color }}>
                {color.color}
              </div>
              <div className="flex gap-2 mt-2">
                {color.guesses.map((color, idx) =>
                  color.isCorrect ? (
                    <BsCheckLg key={idx} className="text-green-500" />
                  ) : (
                    <BsXLg key={idx} className="text-red-500" />
                  )
                )}
              </div>
            </div>
          ) : null
        )}
      </div>
    </>
  );
}
