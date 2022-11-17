import Button from "./Button";
import FinalResults from "./FinalResults";

export default function GameOver({ results, onReset = () => {} }) {
  const onlyResultsWithGuesses = results.filter((result) => result.guesses.length > 0);

  return (
    <div className="min-h-screen w-full flex flex-col">
      <button
        className="p-8 bg-zinc-900 font-bold text-4xl text-zinc-100"
        onClick={() => onReset()}>
        Play again
      </button>
      <FinalResults results={onlyResultsWithGuesses} onReset={onReset} />
    </div>
  );
}
