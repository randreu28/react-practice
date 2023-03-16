import { useUser } from "../store";
import { CheckCircleIcon as InactiveCheckIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon as ActiveCheckIcon } from "@heroicons/react/24/solid";

interface Props {
  currentStep: number;
  title: string;
}

export default function Step({ currentStep, title }: Props) {
  const { step } = useUser();

  return (
    <div className="flex gap-5">
      {currentStep <= step ? (
        <ActiveCheckIcon className="my-auto h-8 w-8" />
      ) : (
        <InactiveCheckIcon className="my-auto h-8 w-8" />
      )}
      <div className="my-auto">
        <p className="text-sm font-light">Step {currentStep}</p>
        <h2 className="text-lg font-bold">{title}</h2>
      </div>
    </div>
  );
}
