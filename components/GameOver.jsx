import Button from "./Button";
import FinalResults from "./FinalResults";

export default function GameOver({ colorHistory, onReset = () => {} }) {
  return (
    <div className="min-h-screen w-full">
      <FinalResults colorHistory={colorHistory} />
      <Button classes="flex justify-center w-full mt-8" onClick={() => onReset()}>
        Play again
      </Button>
    </div>
  );
}
