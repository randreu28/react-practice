import { useState, useEffect } from "react";
import { useQuery } from "react-query";

export default function App() {
  type project = {
    name: string;
    url: string;
    date: string;
  };

  const [projects, setProjects] = useState<project[]>();

  async function getBranches() {
    const res = await fetch(
      "https://api.github.com/repos/randreu28/react-practice/branches",
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_GH_API_KEY}`,
        },
      }
    );
    return res.json();
  }

  const { data, error, isLoading } = useQuery("getBranches", getBranches);

  isLoading ? null : console.log(data);

  return (
    <div className="h-screen flex">
      <div className="m-auto">Hello world</div>
    </div>
  );
}
