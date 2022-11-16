import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { BsCheckLg, BsXLg } from "react-icons/bs";
import { HexColorPicker } from "react-colorful";
import { FaRegHandPointDown } from "react-icons/fa";

export default function Home() {
  // TODO: Add useState hook to manage the state of the input field
  // TODO: Send time and numSelections through URL params to populate game with chosen constraints
  const [time, setTime] = useState(60);
  const [numSelections, setNumSelections] = useState(3);
  const [penalty, setPenalty] = useState(5);
  const [color, setColor] = useState("#1880ff");

  return (
    <div style={{ backgroundColor: color }} className="bg-zinc-900 min-h-screen">
      <Head>
        <title>Hex</title>
        <meta name="description" content="Learn hex colors with a simple game." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="max-w-5xl mx-auto pt-32">
        <h1 className="text-4xl md:text-6xl font-bold font-inter text-zinc-900 bg-zinc-100 p-4">
          Tired of looking up colors? Take a few minutes and learn your hex codes.{" "}
          <FaRegHandPointDown className="text-black w-full text-center" />
        </h1>

        <HexColorPicker color={color} onChange={setColor} style={{ width: "100%" }} />
        <div className="grid sm:grid-cols-2 text-zinc-900 bg-zinc-100">
          <h2 className="text-5xl font-bold p-4">Hex Code: {color}</h2>
          <Link href="/play">
            <button className="font-bold text-3xl w-full h-full hover:bg-zinc-300 transition-all flex items-center justify-center">
              Test your skills.
            </button>
          </Link>
        </div>
        {/* <div className="flex justify-center mb-16">
          <ul className="flex flex-col gap-4 items-start text-white">
            <p className="flex items-center gap-2">
              1st guess correct <BsCheckLg className="text-green-500" />
              <span className="bg-green-500 rounded-xl p-2 text-black font-bold">+100</span>
            </p>
            <p className="flex items-center gap-2">
              2nd guess correct <BsCheckLg className="text-green-500" />
              <span className="bg-green-500 rounded-xl p-2 text-black font-bold">+50</span>
            </p>
            <p className="flex items-center gap-2">
              2nd guess incorrect <BsXLg className="text-red-500" />
              <span className="bg-red-500 rounded-xl p-2 text-black font-bold">-50</span>
            </p>
          </ul>
        </div> */}
        {/* <Link href="/play">
          <button className="px-4 py-2 text-3xl border-2 bg-slate-200 rounded-xl">Play</button>
        </Link> */}
      </div>
    </div>
  );
}
