import DarkModeButton from "./components/DarkModeButton";
import Table from "./components/Table";

export default function App() {
  return (
    <div className="flex h-screen flex-col">
      <div className="m-auto">
        <DarkModeButton />
        <Table />
      </div>
    </div>
  );
}
