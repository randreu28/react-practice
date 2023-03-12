import { BeerType } from "../types";

interface Props {
  beer: BeerType;
}

export default function Beer({ beer }: Props) {
  let phColor = "gray";

  if (beer.ph) {
    phColor = "green";
  }

  if (beer.ph && beer.ph > 4) {
    phColor = "orange";
  }

  if (beer.ph && beer.ph > 4.4) {
    phColor = "red";
  }
  return (
    <>
      <tr>
        <td className="px-4 py-4 text-sm font-medium flex gap-5">
          <img
            className="object-contain bg-gray-200 w-10 h-10 rounded-full hidden md:block"
            src={beer.image_url}
            alt=""
          />
          <div>
            <h2 className="font-medium text-gray-800 dark:text-gray-200">
              {beer.name}
            </h2>
            <p className="text-sm italic font-normal text-gray-600 dark:text-gray-400 line-clamp-2 max-w-xs">
              "{beer.tagline}"
            </p>
          </div>
        </td>
        <td className="px-4 py-4 text-sm">
          <div>
            <p className="text-gray-500 dark:text-gray-400 line-clamp-2 max-w-sm">
              {beer.first_brewed}
            </p>
          </div>
        </td>

        <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
          <div
            className="inline px-3 py-1 text-sm font-normal rounded-full gap-x-2 bg-gray-100/60 dark:bg-gray-800"
            style={{ color: phColor }}
          >
            {beer.ph ? beer.ph : "Unkown"}
          </div>
        </td>
        <td className="px-4 py-4 text-sm">
          <div>
            <p className="text-gray-500 dark:text-gray-400 line-clamp-2 max-w-sm">
              {beer.description}
            </p>
          </div>
        </td>

        <td className="px-4 py-4 text-sm whitespace-nowrap">
          <div className="flex justify-between text-gray-400 pb-1">
            <p>0</p>
            <p>100</p>
          </div>
          <div className="w-48 h-1.5 bg-blue-200 overflow-hidden rounded-full">
            <div
              className="bg-blue-500 h-1.5"
              style={{ width: `${beer.attenuation_level}%` }}
            />
          </div>
        </td>
      </tr>
    </>
  );
}
