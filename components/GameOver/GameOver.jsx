import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

import { FaPlay } from "react-icons/fa";
import { ImTrophy } from "react-icons/im";

import { Score } from "./Score";
import { FinalResults } from "./FinalResults";
import { HighscoreForm } from "./HighscoreForm";

export function GameOver({ results, score, timeRemaining, onReset = () => {} }) {
  const [nameInput, setNameInput] = useState("");

  const router = useRouter();

  async function onSubmit(e) {
    e.preventDefault();
    const name = nameInput.trim();
    if (name.length > 0) {
      const res = await fetch("/api/sendScore", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nameInput,
          score: totalScore,
        }),
      });
      const json = await res.json();
      router.push("/highscores");
    }
  }

  const totalScore = score + timeRemaining * 10;

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
      <Score {...{ score, totalScore, timeRemaining }} />
      <HighscoreForm {...{ onSubmit, nameInput, setNameInput }} />
      <FinalResults {...{ results, score, onReset, timeRemaining }} />
    </div>
  );
}
