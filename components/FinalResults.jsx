import { BsCheck, BsCheckLg, BsXLg } from "react-icons/bs";
import Button from "./Button";

export default function FinalResults({ colorHistory, onReset = () => {} }) {
  if (colorHistory.length === 0) return null;

  function getPoints(guesses) {
    switch (guesses) {
      case 1:
        return 100;
      case 2:
        return 50;
      default:
        return 0;
    }
  }

  const score = colorHistory
    .filter((color) => color.isCorrect)
    .reduce((acc, color) => acc + getPoints(color.guesses.length), 0);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="grid md:grid-cols-2 pt-32">
        <div className="flex flex-col justify-center items-center">
          <h1 className="font-bold text-5xl pb-8">{score} points</h1>
          <div className="flex gap-2 items-center">
            <BsCheckLg className="text-green-500" /> <label> = 100 points</label>
          </div>
          <div className="flex gap-2 items-center">
            <BsXLg className="text-red-500" /> <BsCheckLg className="text-green-500" />{" "}
            <label> = 50 points</label>
          </div>
          <div className="flex gap-2 items-center">
            <BsXLg className="text-red-500" /> <BsXLg className="text-red-500" />{" "}
            <label> = 0 points</label>
          </div>
        </div>
        <Button
          classes="flex justify-center items-center w-full mt-8 bg-blue-500"
          onClick={() => onReset()}>
          Play again
        </Button>
      </div>
      <div className="my-16 grid gap-8 grid-cols-8">
        {colorHistory.map((color, idx) => (
          <div key={idx} className="flex flex-col items-center">
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
        ))}
      </div>
    </div>
  );
}
