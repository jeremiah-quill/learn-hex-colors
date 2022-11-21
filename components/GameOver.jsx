import FinalResults from "./FinalResults";
import Link from "next/link";
import { FaPlay } from "react-icons/fa";
import { ImTrophy } from "react-icons/im";

export default function GameOver({ results, score, onReset = () => {} }) {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <div className="grid grid-cols-2">
        <button
          onClick={() => onReset()}
          className="flex gap-4 bg-zinc-900 hover:bg-zinc-700 transition-all p-8 items-center justify-center">
          <h1 className="font-bold text-4xl text-zinc-100">Play again</h1>
          <FaPlay className="text-zinc-100 text-3xl" />
        </button>
        <Link
          href="/highscores"
          className="flex gap-4 bg-zinc-900 hover:bg-zinc-700 transition-all p-8 items-center justify-center">
          <h1 className="font-bold text-4xl text-zinc-100">Highscores</h1>
          <ImTrophy className="text-zinc-100 text-3xl" />
        </Link>
      </div>
      <FinalResults {...{ results, score, onReset }} />
    </div>
  );
}
