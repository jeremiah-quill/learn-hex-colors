import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

import { FaPlay } from "react-icons/fa";
import { ImTrophy } from "react-icons/im";

import { Score } from "./Score";
import { FinalResults } from "./FinalResults";
import { HighscoreForm } from "./HighscoreForm";
import { HexColorPicker } from "react-colorful";
import { Card } from "../Card";

export function GameOver({ results, score, timeRemaining, onReset = () => {} }) {
  const [nameInput, setNameInput] = useState("");
  const [color, setColor] = useState("#1880ff"); // control color picker

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

  function getContrastYIQ(hexcolor) {
    var r = parseInt(hexcolor.substr(0, 2), 16);
    var g = parseInt(hexcolor.substr(2, 2), 16);
    var b = parseInt(hexcolor.substr(4, 2), 16);
    var yiq = (r * 299 + g * 587 + b * 114) / 1000;
    console.log(yiq);
    return yiq >= 180 ? "black" : "white";
  }

  const textColor = getContrastYIQ(color);

  return (
    <div style={{ backgroundColor: color }} className="min-h-screen bg">
      <div className="grid md:grid-cols-3 md:row-span-2 gap-8 pt-16 mx-auto w-full max-w-6xl">
        <Card className="font-bold col-span-1 row-span-1 flex flex-col">
          <h1 className="text-6xl font-bold p-2 border-b border-b-zinc-300">
            {totalScore} <span className="text-2xl">points</span>
          </h1>
          <div className="grid gap-2 p-2 text-gray-500">
            <h2 className="text-3xl">
              +100 <span className="text-base font-normal italic">{5} correct guesses</span>
            </h2>
            <h2 className="text-3xl">
              -200 <span className="text-base font-normal italic">{5} incorrect guesses</span>
            </h2>
            <h2 className="text-3xl">
              +440 <span className="text-base font-normal italic">{16} sec time bonus</span>
            </h2>
          </div>
        </Card>
        <Card className="flex flex-col  gap-2 md:col-span-2 h-full">
          <form onSubmit={onSubmit} className="flex flex-col gap-8 h-full">
            <div className="grid gap-2">
              <label htmlFor="nickname" className="italic">
                Pick a nickname
              </label>
              <input
                id="nickname"
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                className="col-span-2 p-2 rounded-md block inset-4"
              />
            </div>
            {/* <div className="grid gap-2">
              <label htmlFor="nickname" className="italic">
                Pick an icon
              </label>
              <input
                id="nickname"
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                className="col-span-2 p-2 rounded-md block inset-4"
              />
            </div>
            <div className="rounded-md overflow-hidden flex-1">
              <div className="grid gap-2 h-full">
                <label htmlFor="nickname" className="italic">
                  Pick a color
                </label>
                <HexColorPicker
                  color={color}
                  onChange={setColor}
                  style={{ width: "100%" }}
                  className="rounded-lg"
                />
              </div>
            </div> */}
            <button
              type="submit"
              className="w-full p-2 text-3xl font-bold hover:bg-slate-200 transition-all rounded-md flex-1">
              Submit
            </button>
          </form>
        </Card>
        <Card className="col-span-1 row-span-1 grid gap-2 rounded-lg overflow-hidden shadow-md bg-zinc-100 text-left">
          <button
            className="hover:bg-slate-200  text-3xl transition-all font-bold rounded-lg px-2 text-left"
            onClick={onReset}>
            Play
          </button>
          <Link
            className="hover:bg-slate-200 text-3xl transition-all font-bold rounded-lg px-2"
            href="/highscores">
            Highscores
          </Link>
          <Link
            className="hover:bg-slate-200  text-3xl font-bold transition-all rounded-lg px-2"
            href="/">
            Home
          </Link>
          <Link
            className="hover:bg-slate-200 text-3xl font-bold transition-all rounded-lg px-2"
            href="https://www.github.com/jeremiah-quill">
            Github
          </Link>
        </Card>
      </div>
    </div>
  );
}
{
  /* <Score {...{ score, totalScore, timeRemaining }} />
      <HighscoreForm {...{ onSubmit, nameInput, setNameInput }} />
    </> */
}
