import { useQuery } from "react-query";
import getProjects from "./helpers/getProjects";

export default function App() {
  const { data, error, isLoading } = useQuery("getProjects", getProjects);

  isLoading ? null : console.log(data);

  return (
    <div className="h-screen flex">
      <div className="m-auto">Hello world</div>
    </div>
  );
}
