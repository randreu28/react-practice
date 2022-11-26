import { useState } from "react";
import Card from "./components/Card";

import type { card } from "./types";

export default function App() {
  const [board, setBoard] = useState<card[]>([
    { value: "a", state: "hidden" },
    { value: "a", state: "hidden" },
    { value: "b", state: "hidden" },
    { value: "b", state: "hidden" },
    { value: "c", state: "hidden" },
    { value: "c", state: "hidden" },
    { value: "d", state: "hidden" },
    { value: "d", state: "hidden" },
    { value: "e", state: "hidden" },
  ]);

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
        <div className="grid grid-cols-3 grid-rows-3 gap-5">
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
      </div>
    </div>
  );
}
