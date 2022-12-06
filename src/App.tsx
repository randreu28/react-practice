import { useQuery } from "react-query";
import getProjects from "./helpers/getProjects";
import ReactMarkdown from "react-markdown";

export default function App() {
  const { data, error, isLoading } = useQuery("getProjects", getProjects);

  if (isLoading) {
    return (
      <div className="h-screen flex">
        <div className="m-auto text-2xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex">
        <div className="m-auto text-red-500 text-2xl">
          An error occured. Please try again later
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex">
      <div className="m-auto">
        {data?.map((project, key) => {
          return (
            <div key={key}>
              <h1 className="capitalize">
                {project.name.split("-").join(" ")}
              </h1>
              <p>{project.date}</p>
              <p>{project.url}</p>
              <ReactMarkdown className="prose prose-a:text-blue-600">
                {project.description}
              </ReactMarkdown>
            </div>
          );
        })}
      </div>
    </div>
  );
}
