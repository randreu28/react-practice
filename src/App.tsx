import { useState } from "react";
import Folder from "./component/Folder";

import type { folder } from "./types";

export default function App() {
  const [tree, setTree] = useState<folder>({
    name: "react-practice",
    isOpen: true,
    children: [
      "node_modules",
      { name: "public", isOpen: false, children: ["vite.svg"] },
      {
        name: "src",
        isOpen: false,
        children: [
          { name: "component", isOpen: false, children: ["Folder.tsx"] },
          "App.tsx",
          "index.css",
          "main.tsx",
          "types.tsx",
          "vite-env.d.ts",
        ],
      },
      ".gitignore",
      "index.html",
      "package.json",
      "postcss.config.cjs",
      "tailwind.config.cjs",
      "tsconfig.json",
      "tsconfig.node.json",
      "vite.config.ts",
      "yarnk.lock",
    ],
  });

  return (
    <div className="h-screen flex">
      <div className="m-auto text-3xl">
        <Folder
          isOpen={tree.isOpen}
          name={tree.name}
          children={tree.children}
        />
      </div>
    </div>
  );
}
