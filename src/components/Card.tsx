import type { card } from "../types";

interface Props {
  card: card;
  handleClick: () => void;
}
export default function Card({ handleClick, card }: Props) {
  return (
    <button
      className={`bg-gray-700 p-5 w-32 h-32 rounded text-center hover:underline ${
        card.state == "isMatch" ? "!bg-green-700" : ""
      }`}
      onClick={handleClick}
    >
      {card.state != "hidden" ? card.value : ""}
    </button>
  );
}
