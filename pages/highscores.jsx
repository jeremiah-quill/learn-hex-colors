import Link from "next/link";
import { FaPlay } from "react-icons/fa";
import { BsFillHouseDoorFill } from "react-icons/bs";
import { connectToDatabase } from "../lib/mongodb";

export default function HighscoresPage({ highscores, scores }) {
  console.log(scores);
  return (
    <div className="bg-zinc-100 min-h-screen w-full justify-center items-center flex flex-col">
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
      <div className="flex justify-content items-center flex-1">
        {scores.length === 0 ? (
          <div>No Highscores</div>
        ) : (
          <ul className="border border-black min-w-[400px] h-[600px] overflow-scroll">
            {scores.map((score, idx) => (
              <li className="border-b border-black p-8 flex justify-between" key={idx}>
                <h1>{score.name}</h1>
                <h2>{score.score}</h2>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const { database } = await connectToDatabase();
  const scoresData = await database
    .collection("highscores")
    .find({})
    .sort({ score: -1 })
    .limit(10)
    .toArray();

  const scores = JSON.parse(JSON.stringify(scoresData));

  console.log("scores", scores);

  const highscores = [
    { name: "John", score: 1000 },
    { name: "Jane", score: 900 },
    { name: "Joe", score: 800 },
    { name: "Jill", score: 700 },
    { name: "Jack", score: 600 },
  ];
  return {
    props: { highscores, scores },
  };
}
