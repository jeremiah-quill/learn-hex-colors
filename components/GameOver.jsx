import Button from "./Button";
import FinalResults from "./FinalResults";
import { FaPlay } from "react-icons/fa";

export default function GameOver({ results, onReset = () => {} }) {
  const onlyResultsWithGuesses = results.filter((result) => result.guesses.length > 0);

  return (
    <div className="min-h-screen w-full flex flex-col">
      <button
        onClick={() => onReset()}
        className="flex gap-4 w-full bg-zinc-900 hover:bg-zinc-700 transition-all p-8 items-center justify-center">
        <h1 className="font-bold text-4xl text-zinc-100">Play again</h1>
        <FaPlay className="text-zinc-100 text-3xl" />
      </button>
      <FinalResults results={onlyResultsWithGuesses} onReset={onReset} />
    </div>
  );
}
