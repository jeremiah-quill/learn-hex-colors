import Link from "next/link";
import { FaPlay } from "react-icons/fa";
import { BsFillHouseDoorFill } from "react-icons/bs";
import { connectToDatabase } from "../lib/mongodb";
import { Card } from "../components/Card";

export default function HighscoresPage({ scores }) {
  return (
    <div style={{ backgroundColor: "#0055ff" }} className="min-h-screen">
      <div className="max-w-5xl mx-auto pt-32 grid grid-cols-4 grid-rows-3 gap-8">
        <Card className="col-span-3 row-span-3 text-4xl md:text-4xl font-bold text-zinc-900 ">
          {scores.length === 0 ? (
            <div>No Highscores</div>
          ) : (
            <>
              <h1 className="text-6xl font-bold p-2 border-b border-b-zinc-300">Highscores</h1>
              <ul className=" w-full h-[600px] overflow-scroll">
                {scores.map((score, idx) => (
                  <li className=" border-b border-b-zinc-300 p-8 flex gap-8" key={idx}>
                    <div>#{idx + 1}</div>
                    <h1>{score.name}</h1>
                    <h2 className="ml-auto">{score.score}</h2>
                  </li>
                ))}
              </ul>
            </>
          )}
        </Card>

        <Card className="col-span-1 grid grid-cols-1 row-span-1 gap-2 rounded-lg overflow-hidden shadow-md bg-zinc-100 text-left">
          <Link
            className="hover:bg-zinc-300 flex items-center text-3xl transition-all font-bold rounded-lg px-2"
            href="/play">
            Play
          </Link>
          <Link
            className="hover:bg-zinc-300 flex items-center text-3xl font-bold transition-all rounded-lg px-2"
            href="/">
            Home
          </Link>
          <Link
            className="hover:bg-zinc-300 flex items-center text-3xl font-bold transition-all rounded-lg px-2"
            href="https://github.com/jeremiah-quill/learn-hex-colors">
            Github
          </Link>
        </Card>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const { database } = await connectToDatabase();
  const res = await database
    .collection("highscores")
    .find({})
    .sort({ score: -1 })
    .limit(10)
    .toArray();

  const scores = JSON.parse(JSON.stringify(res));

  return {
    props: { scores },
  };
}

{
  /* <div className="bg-zinc-100 min-h-screen w-full justify-center items-center flex flex-col">
      <div className="grid grid-cols-2 w-full">
        <Link
          href="/play"
          className="flex gap-4 bg-zinc-900 hover:bg-zinc-700 transition-all p-8 items-center justify-center">
          <h1 className="font-bold text-4xl text-zinc-100">Play again</h1>
          <FaPlay className="text-zinc-100 text-3xl" />
        </Link>
        <Link
          href="/"
          className="flex gap-4 bg-zinc-900 hover:bg-zinc-700 transition-all p-8 items-center justify-center">
          <h1 className="font-bold text-4xl text-zinc-100">Home</h1>
          <BsFillHouseDoorFill className="text-zinc-100 text-3xl" />
        </Link>
      </div>
      <div className="flex justify-center items-center flex-1 w-full">
        {scores.length === 0 ? (
          <div>No Highscores</div>
        ) : (
          <ul className="border border-black w-full max-w-xl h-[600px] overflow-scroll">
            {scores.map((score, idx) => (
              <li className="border-b border-black p-8 flex gap-8" key={idx}>
                <div>#{idx + 1}</div>
                <h1>{score.name}</h1>
                <h2 className="ml-auto">{score.score}</h2>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div> */
}
