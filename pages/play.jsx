import ColorTracker from "../components/ColorTracker";
import Button from "../components/Button";
import Timer from "../components/Timer";
import { useEffect, useState } from "react";

export default function GamePage() {
  const [currentColor, setCurrentColor] = useState("");
  const [hexSelections, setHexSelections] = useState([]);
  const [timer, setTimer] = useState({ time: 60, isRunning: false });
  const colorHistory = ["#ff0000", "#00ff00", "#0000ff"];

  // const hexSelections = [getRandomColor(), getRandomColor(), currentColor];

  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  useEffect(() => {
    function startGame() {
      const randomColor = getRandomColor();
      setCurrentColor(randomColor);
      setHexSelections([getRandomColor(), getRandomColor(), randomColor]);

      setTimer({ ...timer, isRunning: true });
    }
    startGame();
    setCurrentColor(getRandomColor());
  }, []);

  // fischer yates shuffle
  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
  }

  // Used like so
  // var arr = [2, 11, 37, 42];
  // shuffle(arr);
  // console.log(arr);

  return (
    <div className="max-w-5xl grid pt-32 items-center mx-auto">
      <div className="flex justify-between w-full items-end p-4">
        <ColorTracker colors={colorHistory} />
        <Timer isRunning={timer.isRunning} time={timer.time} />
      </div>
      <div style={{ backgroundColor: currentColor }} className={`rounded-3xl w-full h-[350px] `} />
      <div className="flex justify-between w-full max-w-2xl mx-auto p-4">
        {shuffle(hexSelections).map((hex) => (
          <Button key={hex} onClick={() => setCurrentColor(hex)}>
            {hex}
          </Button>
        ))}
      </div>
    </div>
  );
}
