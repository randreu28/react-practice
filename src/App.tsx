import React, { useState } from "react";

function App() {
  function randomHex(count: number) {
    return [...Array(count)].map(() =>
      [...Array(6)]
        .map(() => Math.floor(Math.random() * 15).toString(15))
        .join("")
    );
  }

  const [colors, setColors] = useState<string[]>(randomHex(3));

  const [feedback, setFeedback] = useState<React.ReactNode>(<></>);

  const [correctAnswer, setCorrectAnswer] = useState(
    Math.floor(Math.random() * 3)
  );

  function validateGuess(color: string) {
    if (color == colors[correctAnswer]) {
      setFeedback(<span className="text-green-500">Correct!</span>);
    } else {
      setFeedback(<span className="text-red-500">Incorrect. Try again!</span>);
    }
  }

  function resetGame() {
    setCorrectAnswer(Math.floor(Math.random() * 3));
    setColors(randomHex(3));
    setFeedback(<></>);
  }

  return (
    <div className="flex h-screen">
      <div className="m-auto">
        <h1 className="text-center text-3xl p-5">Guess the color!</h1>
        <div
          className="w-[400px] h-[200px] mx-auto"
          style={{ background: `#${colors[correctAnswer]}` }}
        />
        <div className="flex gap-5 p-5 justify-center">
          {colors.map((color, key) => {
            return (
              <button
                className="bg-gray-200 rounded text-xl py-2 px-4"
                key={key}
                onClick={() => {
                  validateGuess(color);
                }}
              >
                #{color}
              </button>
            );
          })}
        </div>

        <div className="flex justify-center text-xl">{feedback}</div>
        <br />
        <button
          className="bg-blue-200 text-xl rounded px-4 py-2 flex mx-auto"
          onClick={resetGame}
        >
          Reset game
        </button>
      </div>
    </div>
  );
}

export default App;
