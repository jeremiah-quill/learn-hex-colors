import { useState } from "react";
import Link from "next/link";

import { HexColorPicker } from "react-colorful";

import { FaRegHandPointDown } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";

export default function Home() {
  const [color, setColor] = useState("#1880ff"); // control color picker
  return (
    <div style={{ backgroundColor: color }} className="min-h-screen">
      <div className="max-w-5xl mx-auto pt-32 ">
        <h1 className="text-4xl md:text-6xl font-bold font-inter text-zinc-900 bg-zinc-100 p-4">
          Tired of looking up colors? Take a few minutes and learn your hex codes.{" "}
        </h1>
        <FaRegHandPointDown className="text-6xl text-black w-full text-center bg-zinc-100" />
        <HexColorPicker color={color} onChange={setColor} style={{ width: "100%" }} />
        <div className="grid sm:grid-cols-2 text-zinc-900 bg-zinc-100">
          <h2 className="text-5xl font-bold p-4">Hex Code: {color}</h2>
          <Link href="/play">
            <div className="text-3xl font-bold transition-all flex h-full items-center justify-center gap-4 hover:bg-zinc-300">
              Play
              <FaPlay className="text-zinc-900 text-2xl" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
