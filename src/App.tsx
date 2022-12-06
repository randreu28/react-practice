import { useState, useEffect } from "react";

export default function App() {
  type project = {
    name: string;
    url: string;
    date: string;
  };

  const [projects, setProjects] = useState<project[]>();

  async function fetchRepoInfo() {
    const rawQuery = await fetch(
      "https://api.github.com/repos/randreu28/react-practice/branches",
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_GH_API_KEY}`,
        },
      }
    );
    return await rawQuery.json();
  }

  useEffect(() => {
    console.log(fetchRepoInfo());
  }, []);

  return (
    <div className="h-screen flex">
      <div className="m-auto">Hello world</div>
    </div>
  );
}
