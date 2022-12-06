import { useQuery } from "react-query";
import getProjects from "./helpers/getProjects";
import ReactMarkdown from "react-markdown";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

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

  function formatDate(date: string): string {
    dayjs.extend(relativeTime);
    return dayjs(date).fromNow();
  }

  function isLast(key: number): boolean {
    return key + 1 == data!.length && data!.length % 2 != 0;
  }

  return (
    <>
      <a
        className="hover:opacity-75 duration-200 m-5 absolute right-0"
        href="https://github.com/randreu28/react-practice"
        target="_blank"
        rel="noreferrer"
      >
        <svg
          className="fill-white sr-only sm:not-sr-only"
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 24 24"
        >
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      </a>
      <div className="p-5 space-y-5 text-center">
        <h1 className="pt-5 text-3xl font-bold">
          Welcome to my React practice playground!
        </h1>
        <p className="max-w-4xl text-lg mx-auto text-gray-400">
          This compilation of small React applications are meant to be
          challenges to practice core concepts about web developmenet. Feel free
          to check them out !
        </p>
      </div>
      <div className="h-5/6 flex">
        <div className="m-auto grid grid-cols-1 md:grid-cols-2">
          {data?.map((project, key) => {
            return (
              <div
                className={`max-w-2xl px-8 py-4 rounded-lg shadow-md bg-gray-800 m-4 ${
                  isLast(key) ? "md:col-span-2 md:mx-auto" : ""
                }`}
                key={key}
              >
                <div className="mt-2">
                  <div className="flex items-center justify-between">
                    <h2
                      className="text-2xl font-bold text-white capitalize"
                      tabIndex={0}
                      role="link"
                    >
                      {project.name.split("-").join(" ")}
                    </h2>
                    <span className="text-sm font-light text-gray-400 my-2">
                      {formatDate(project.date)}
                    </span>
                  </div>
                  <ReactMarkdown className="prose prose-a:text-gray-300 mt-2 text-gray-300">
                    {project.description}
                  </ReactMarkdown>
                </div>
                <div className="flex items-center justify-between my-3">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-400 hover:underline"
                    tabIndex={0}
                    role="link"
                  >
                    Go to the project
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
