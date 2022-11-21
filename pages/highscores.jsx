import Link from "next/link";
import { FaPlay } from "react-icons/fa";
import { BsFillHouseDoorFill } from "react-icons/bs";

export default function HighscoresPage({ highscores }) {
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
        <ul className="border border-black min-w-[400px] h-[600px] overflow-scroll">
          {Array(10)
            .fill()
            .map((highscore, idx) => (
              <li className="border-b border-black p-8" key={idx}>
                {idx}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export function getServerSideProps() {
  const highscores = ["highscore 1", "highscore 2", "highscore 3"];
  return {
    props: { highscores },
  };
}
