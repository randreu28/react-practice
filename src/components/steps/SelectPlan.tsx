import {
  SubmitHandler,
  useForm,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { plansType, planType, useUser } from "../../store";
import { getPlanPrices } from "../../utils";

export default function SelectPlan() {
  const { goToStep, updatePlan } = useUser();
  const { register, setValue, watch, handleSubmit } = useForm<planType>();

  const onSubmit: SubmitHandler<planType> = (plan) => {
    updatePlan(plan);
    goToStep(3);
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-blue-900 lg:text-5xl">
        Select your plan
      </h1>
      <p className="text-gray-500">
        You have the option of monthly or yearly billing.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <PlanSelector register={register} setValue={setValue} watch={watch} />
        <fieldset className="rouned-xl flex justify-center gap-5 rounded-xl bg-gray-100 p-2 text-gray-500">
          <p className="">Monthly</p>
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              {...register("yearlyBilling")}
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
              goToStep(1);
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

const plans = [
  { image: "/icon-arcade.svg", title: plansType.arcade },
  { image: "/icon-advanced.svg", title: plansType.advanced },
  { image: "/icon-pro.svg", title: plansType.pro },
];

type Props = {
  register: UseFormRegister<planType>;
  setValue: UseFormSetValue<planType>;
  watch: UseFormWatch<planType>;
};

function PlanSelector({ register, setValue, watch }: Props) {
  const type = watch("type", plansType.arcade);
  const isYearly = watch("yearlyBilling", false);

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
      <select
        {...register("type")}
        defaultValue={plansType.arcade}
        className="sr-only"
      >
        {plans.map((plan, key) => {
          return (
            <option key={key} value={plan.title}>
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
                setValue("type", plan.title);
              }}
              className={`flex h-44 flex-col justify-between rounded-xl bg-gray-100 p-5 duration-300 hover:cursor-pointer ${
                type == plan.title && "ring-2 ring-blue-500"
              }`}
            >
              <img src={plan.image} className="mr-auto" />

              <span>
                <h1 className="text-lg font-bold capitalize text-blue-900">
                  {plan.title}
                </h1>
                <p className="text-gray-500">
                  {getPlanPrices(plan.title, isYearly)}
                </p>
              </span>
            </label>
          </fieldset>
        );
      })}
    </div>
  );
}
