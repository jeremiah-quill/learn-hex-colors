import { useState } from "react";
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  const [time, setTime] = useState(60);
  const [numCodes, setNumCodes] = useState(3);

  return (
    <div>
      <Head>
        <title>Hex</title>
        <meta name="description" content="Learn hex colors with a simple game." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-slate-800 min-h-screen text-center">
        <h1 className="text-6xl font-bold font-inter text-blue-400">
          Tired of looking up colors? Take a few minutes and learn your hex codes.
        </h1>
        <p className="text-white text-xl">
          Play for {time} seconds, guess correct hex code out of {numCodes} options.
        </p>
        <Link href="/play">
          <button className="p-2 text-3xl border-2 border-blue-500 bg-slate-200">Play</button>
        </Link>
      </div>
    </div>
  );
}
