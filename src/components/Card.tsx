import type { card } from "../types";

interface Props {
  card: card;
  handleClick: () => void;
}
export default function Card({ handleClick, card }: Props) {
  let bgColor: string;

  switch (card.state) {
    case "hidden":
    case "showing": {
      bgColor = "bg-gray-700";
      break;
    }
    case "isMatch": {
      bgColor = "bg-green-700";
      break;
    }
    case "isWrong": {
      bgColor = "bg-red-500";
      break;
    }
  }

  return (
    <button
      className={
        "bg-gray-700 p-5 w-32 h-32 rounded text-center hover:underline " +
        bgColor
      }
      onClick={handleClick}
    >
      {card.state != "hidden" ? card.value : ""}
    </button>
  );
}
