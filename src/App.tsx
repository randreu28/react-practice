import { useRef } from "react";

type Props = {};

export default function App({}: Props) {
  const ref = useRef<HTMLInputElement>(null!);

  async function handleSearch() {
    const rawData = await fetch(
      `https://api.datamuse.com/words?ml=${ref.current.value}`
    );

    const data = await rawData.json();

    await console.log(data);

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
    </div>
  );
}
