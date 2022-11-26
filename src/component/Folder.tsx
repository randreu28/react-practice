import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { folder } from "../types";

export default function Folder({
  name,
  isOpen: isOpenAtStart,
  children,
}: folder) {
  const [isOpen, setisOpen] = useState<boolean>(isOpenAtStart);

  function handleClick() {
    setisOpen(!isOpen);
  }

  return (
    <div className="space-y-2">
      <button className="flex flex-row gap-2" onClick={handleClick}>
        {isOpen ? (
          <ChevronDownIcon className="text-gray-500 w-5 h-5 my-auto" />
        ) : (
          <ChevronRightIcon className="text-gray-500 w-5 h-5 my-auto" />
        )}
        {name}
      </button>
      {isOpen ? (
        <div className="pl-10 space-y-3">
          {children?.map((child, key) => {
            if (typeof child == "string") {
              return (
                <p key={key} className="pl-7">
                  {child}
                </p>
              );
            } else {
              return (
                <Folder
                  key={key}
                  isOpen={child.isOpen}
                  name={child.name}
                  children={child.children}
                />
              );
            }
          })}
        </div>
      ) : null}
    </div>
  );
}
