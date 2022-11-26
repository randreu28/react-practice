import { useState } from "react";
import Card from "./components/Card";

import type { card } from "./types";

export default function App() {
  /* Change these values as you like! 
  Just make sure that (n*m) % 2 == 0 */
  const n = 3;
  const m = 3;

  /* TODO:  Sometimes there are board values that do not pair with anything... */
  function generateBoard(n: number, m: number): card[] {
    const randomValues = ["a", "b", "c", "d", "e", "f", "g"];
    return [...Array(n * m)].map(() => {
      return {
        value: randomValues[Math.floor(Math.random() * randomValues.length)],
        state: "hidden",
      };
    });
  }

  const [board, setBoard] = useState<card[]>(generateBoard(n, m));

  function handleClick(index: number) {
    const clickedCard = board[index];

    switch (clickedCard.state) {
      case "hidden": {
        const newBoard = [...board];
        const prevIndex = board.findIndex((card) => card.state == "showing");

        if (prevIndex == -1) {
          newBoard[index].state = "showing";
        } else if (board[prevIndex].value == board[index].value) {
          newBoard[prevIndex].state = "isMatch";
          newBoard[index].state = "isMatch";
        } else {
          newBoard[prevIndex].state = "hidden";

          async function showAndDismiss() {
            const newBoard = [...board];

            newBoard[prevIndex].state = "isWrong";
            newBoard[index].state = "isWrong";
            const delay = (ms: number) =>
              new Promise((res) => setTimeout(res, ms));
            await delay(1000);

            newBoard[prevIndex].state = "hidden";
            newBoard[index].state = "hidden";
            setBoard(newBoard);
          }

          showAndDismiss();
        }

        setBoard(newBoard);
        break;
      }

      case "showing": {
        const newBoard = [...board];
        newBoard[index].state = "hidden";

        setBoard(newBoard);
        break;
      }
      case "isMatch":
        //Do nothing
        break;
    }
  }

  return (
    <div className="flex h-screen">
      <div className="m-auto text-4xl">
        <h1 className="text-4xl text-center pb-20">Memory game</h1>
        <div
          className="grid gap-5"
          style={{
            gridTemplateRows: `repeat(${n}, minmax(0, 1fr))`,
            gridTemplateColumns: `repeat(${m}, minmax(0, 1fr))`,
          }}
        >
          {board.map((_, key) => {
            return (
              <Card
                card={board[key]}
                handleClick={() => {
                  handleClick(key);
                }}
                key={key}
              />
            );
          })}
        </div>
        <button
          className="mx-auto bg-blue-600 rounded px-3 py-2 text-lg flex mt-10 hover:underline"
          onClick={() => {
            setBoard(generateBoard(n, m));
          }}
        >
          Generate new board
        </button>
      </div>
    </div>
  );
}
