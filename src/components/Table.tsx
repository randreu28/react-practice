import { useEffect, useState } from "react";
import Beer from "./Beer";
import { BeerType } from "../types";

export default function Table() {
  const [beers, setBeers] = useState<BeerType[]>([]);
  const [api, setApi] = useState<URL>(
    new URL("https://api.punkapi.com/v2/beers?per_page=10&page=1")
  );

  async function fetchBeers() {
    const rawData = await fetch(api);
    const data = (await rawData.json()) as BeerType[];

    //TODO: Handle error if typeof data != BeerType (Maybe using Zod?)
    setBeers(data);
  }

  function handlePagination(steps: number) {
    const newApi = api;

    //There will never be type errors with this, so type assertion is okay
    const currentPage = parseInt(api.searchParams.get("page")!);
    const newPage = currentPage + steps;

    if (newPage > 0) newApi.searchParams.set("page", newPage.toString());
    setApi(newApi);
  }

  useEffect(() => {
    fetchBeers();
  }, [beers, api]);

  if (beers.length == 0) {
    return <div>Loading..</div>;
  }

  return (
    <section className="container px-4 py-10 mx-auto w-[200rem]">
      <h2 className="text-2xl font-medium text-gray-800 dark:text-white">
        List of beers
      </h2>
      <p className="mt-1 text-gray-500 dark:text-gray-300">
        A list of beers from the punk API
      </p>
      <div className="flex flex-col mt-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-sm font-normal text-left text-gray-500 dark:text-gray-400"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-sm font-normal text-left text-gray-500 dark:text-gray-400"
                    >
                      First brewed
                    </th>
                    <th
                      scope="col"
                      className="px-12 py-3.5 text-sm font-normal text-left text-gray-500 dark:text-gray-400"
                    >
                      Ph
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left text-gray-500 dark:text-gray-400"
                    >
                      About
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left text-gray-500 dark:text-gray-400"
                    >
                      Attenuation level
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                  {beers.map((beer, key: number) => {
                    return <Beer key={key} beer={beer} />;
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-6">
        <button
          onClick={() => {
            handlePagination(-1);
          }}
          className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5 rtl:-scale-x-100"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
            />
          </svg>
          <span>previous</span>
        </button>
        <div className="items-center hidden lg:flex gap-x-3">
          <button
            onClick={() => {
              handlePagination(-2);
            }}
            className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
          >
            {parseInt(api.searchParams.get("page")!) - 2}
          </button>
          <button
            onClick={() => {
              handlePagination(-1);
            }}
            className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
          >
            {parseInt(api.searchParams.get("page")!) - 1}
          </button>
          <button className="px-2 py-1 text-sm text-blue-500 rounded-md dark:bg-gray-800 bg-blue-100/60">
            {parseInt(api.searchParams.get("page")!)}
          </button>
          <button
            onClick={() => {
              handlePagination(+1);
            }}
            className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
          >
            {parseInt(api.searchParams.get("page")!) + 1}
          </button>
          <button
            onClick={() => {
              handlePagination(+2);
            }}
            className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
          >
            {parseInt(api.searchParams.get("page")!) + 2}
          </button>
        </div>
        <button
          onClick={() => {
            handlePagination(+1);
          }}
          className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
        >
          <span>Next</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5 rtl:-scale-x-100"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}
