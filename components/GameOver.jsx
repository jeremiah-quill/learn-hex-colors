import Button from "./Button";
import FinalResults from "./FinalResults";

export default function GameOver({ results, onReset = () => {} }) {
  const onlyResultsWithGuesses = results.filter((result) => result.guesses.length > 0);

  return (
    <div className="min-h-screen w-full">
      <FinalResults results={onlyResultsWithGuesses} onReset={onReset} />
    </div>
  );
}
