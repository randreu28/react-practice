import { useRef, useState } from "react";

interface synonym {
  score: number;
  tags: string[];
  word: string;
}

export default function App() {
  const ref = useRef<HTMLInputElement>(null!);
  const [synonyms, setSynonyms] = useState<synonym[]>([]);

  async function handleSearch() {
    const rawData = await fetch(
      `https://api.datamuse.com/words?ml=${ref.current.value}`
    );

    const data: synonym[] = await rawData.json();

    setSynonyms(data);

    ref.current.value = "";
  }

  return (
    <div className="p-5 space-y-10 flex flex-col">
      <h1 className="text-center text-3xl">Find my word</h1>
      <div className="flex flex-row mx-auto gap-5">
        <input className="bg-gray-200 rounded p-2" type={"text"} ref={ref} />
        <button
          className="bg-blue-500 text-white px-2 rounded"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mx-auto gap-x-32 text-xl capitalize">
        {synonyms.map((synonym, key) => {
          return <li key={key}>{synonym.word}</li>;
        })}
      </div>
    </div>
  );
}
