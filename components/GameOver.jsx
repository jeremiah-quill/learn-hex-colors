import Button from "./Button";
import FinalResults from "./FinalResults";

export default function GameOver({ results, onReset = () => {} }) {
  return (
    <div className="min-h-screen w-full">
      <FinalResults results={results} onReset={onReset} />
    </div>
  );
}
