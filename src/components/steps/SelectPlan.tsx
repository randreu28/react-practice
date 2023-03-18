import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { planType, useUser } from "../../store";

export default function SelectPlan() {
  const { mutateStep, mutatePlan } = useUser();
  const { register, handleSubmit } = useForm<planType>();

  const onSubmit: SubmitHandler<planType> = (plan) => {
    mutatePlan(plan);
    mutateStep(3);
  };

  const plans = [
    { image: "/icon-arcade.svg", title: "arcade", price: "9$/mo" },
    { image: "/icon-advanced.svg", title: "advanced", price: "12$/mo" },
    { image: "/icon-pro.svg", title: "pro", price: "15$/mo" },
  ];

  return (
    <>
      <h1 className="text-3xl font-bold text-blue-900 lg:text-5xl">
        Select your plan
      </h1>
      <p className="text-gray-500">
        You have the option of monthly or yearly billing.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <PlanSelector {...plans} />
        <fieldset className="rouned-xl flex justify-center gap-5 rounded-xl bg-gray-100 p-2 text-gray-500">
          <p className="">Monthly</p>
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              {...register("billing")}
              type="checkbox"
              className="peer sr-only"
            />
            <div className="peer h-6 w-11 rounded-full bg-blue-500 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300" />
          </label>
          <p>Yearly</p>
        </fieldset>

        <div className="flex justify-between">
          <button
            className="rounded-lg px-2 py-3 text-gray-500 focus:outline-blue-400"
            onClick={() => {
              mutateStep(1);
            }}
          >
            Go back
          </button>
          <button
            className="rounded-lg bg-blue-900 px-2 py-3 text-white focus:outline-blue-400"
            type="submit"
          >
            Next step
          </button>
        </div>
      </form>
    </>
  );
}

type Props = {
  image: string;
  title: string;
  price: string;
}[];

function PlanSelector(plans: Props) {
  const select = useRef<HTMLSelectElement>(null!);
  const [activePlan, setActivePlan] = useState<number>(0);

  const { register } = useForm<planType>();

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
      <select ref={select} className="sr-only">
        {plans.map((plan, key) => {
          return (
            <option
              {...register("type", { required: true })}
              key={key}
              value={plan.title}
            >
              {plan.title}
            </option>
          );
        })}
      </select>
      {plans.map((plan, key) => {
        return (
          <fieldset key={key}>
            <label
              onClick={() => {
                select.current.value = plan.title;
                setActivePlan(key);
              }}
              className={`flex h-44 flex-col justify-between rounded-xl bg-gray-100 p-5 duration-300 hover:cursor-pointer ${
                activePlan == key && "ring-2 ring-blue-500"
              }`}
            >
              <img src={plan.image} className="mr-auto" />

              <span>
                <h1 className="text-lg font-bold capitalize text-blue-900">
                  {plan.title}
                </h1>
                <p className="text-gray-500">{plan.price}</p>
              </span>
            </label>
          </fieldset>
        );
      })}
    </div>
  );
}
