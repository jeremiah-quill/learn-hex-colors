import Button from "./Button";
import FinalResults from "./FinalResults";

export default function GameOver({ colorHistory, onReset = () => {} }) {
  return (
    <div className="min-h-screen w-full">
      <FinalResults colorHistory={colorHistory} onReset={onReset} />
    </div>
  );
}
