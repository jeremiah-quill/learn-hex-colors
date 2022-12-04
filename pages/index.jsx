import { useState } from "react";
import Link from "next/link";
import { Card } from "../components/Card";

import { HexColorPicker } from "react-colorful";

import { FaPlay } from "react-icons/fa";

export default function Home() {
  const [color, setColor] = useState("#1880ff"); // control color picker
  return (
    <div style={{ backgroundColor: color }} className="min-h-screen">
      <div className="max-w-5xl mx-auto pt-32 grid grid-cols-4 gap-8">
        <Card className="col-span-4 text-4xl md:text-4xl font-bold text-zinc-900 ">
          <h1>
            Tired of looking up colors? Take a few minutes and learn a few hex code patterns, then
            test your skills.
          </h1>
        </Card>
        <Card className="col-span-3">
          <div className="rounded-md overflow-hidden">
            <HexColorPicker
              color={color}
              onChange={setColor}
              style={{ width: "100%" }}
              className="rounded-lg"
            />
          </div>

          <h2 className="text-3xl font-bold pt-4">Hex Code: {color}</h2>
        </Card>
        <Card className="col-span-1 grid grid-cols-1 gap-2 rounded-lg overflow-hidden shadow-md bg-zinc-100 text-left">
          <Link
            className="hover:bg-zinc-300 flex items-center text-3xl transition-all font-bold rounded-lg px-2"
            href="/play">
            Play
          </Link>
          <Link
            className="hover:bg-zinc-300 flex items-center text-3xl font-bold transition-all rounded-lg px-2"
            href="/highscores">
            Highscores
          </Link>
          <Link
            className="hover:bg-zinc-300 flex items-center text-3xl font-bold transition-all rounded-lg px-2"
            href="https://www.github.com/jeremiah-quill">
            Github
          </Link>
        </Card>
      </div>
    </div>
  );
}
