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
      <div className=" max-w-5xl mx-auto pt-32 text-center">
        <h1 className="text-6xl font-bold font-inter text-blue-400 mb-8">
          Tired of looking up colors? Take a few minutes and learn your hex codes.
        </h1>
        <p className="text-white text-lg mt-8 mb-16">
          Choosing the correct hex code on your first guess will earn you 100 points. Second guess
          will earn you 50 points. If guess wrong twice in a row you lose 50 points and 5 seconds
          off your remaining time.
        </p>
        <Link href="/play">
          <button className="px-4 py-2 text-3xl border-2 bg-slate-200 rounded-xl">Play</button>
        </Link>
      </div>
    </div>
  );
}
