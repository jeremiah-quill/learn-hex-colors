import { useState } from "react";
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  // TODO: Add useState hook to manage the state of the input field
  // TODO: Send time and numSelections through URL params to populate game with chosen constraints
  const [time, setTime] = useState(60);
  const [numSelections, setNumSelections] = useState(3);
  const [penalty, setPenalty] = useState(5);

  return (
    <div className="bg-slate-800 min-h-screen ">
      <Head>
        <title>Hex</title>
        <meta name="description" content="Learn hex colors with a simple game." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className=" text-center max-w-5xl mx-auto pt-32">
        <h1 className="text-6xl font-bold font-inter text-blue-400">
          Tired of looking up colors? Take a few minutes and learn your hex codes.
        </h1>
        <p className="text-white text-xl">
          You will be given 3 random hex codes. One hex code corresponds to the color on the screen.
          Incorrect guesses take {penalty} seconds off the clock. Correct guess on your first
          attempt = 100 points, second attempt = 50 points.
        </p>
        <Link href="/play">
          <button className="p-2 text-3xl border-2 border-blue-500 bg-slate-200">Play</button>
        </Link>
      </div>
    </div>
  );
}
