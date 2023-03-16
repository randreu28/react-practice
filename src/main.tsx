import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Card from "./components/Card";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Card>
      <App />
    </Card>
  </React.StrictMode>
);
