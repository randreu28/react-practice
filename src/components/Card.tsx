import { ReactElement } from "react";
import Step from "./Step";

interface Props {
  children: ReactElement;
}

export default function Card({ children }: Props) {
  const steps = ["Your info", "Select plan", "Add-ons", "Summary"];

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex-cols m-auto flex  w-3/4 max-w-6xl gap-5 rounded-3xl bg-white p-5 shadow-lg">
        <div
          className="hidden w-80 space-y-5 rounded-xl bg-cover p-10 text-white lg:block"
          style={{ backgroundImage: "url(/bg-sidebar-desktop.svg)" }}
        >
          {steps.map((title, number) => {
            return <Step title={title} currentStep={number + 1} key={number} />;
          })}
        </div>
        <div className="w-full space-y-5 p-5 md:p-14">{children}</div>
      </div>
    </div>
  );
}