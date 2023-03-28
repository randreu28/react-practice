import { useUser } from "../../store";

import type { optionsType } from "../../store";
import {
  SubmitHandler,
  useForm,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";
import { getAddOnsPrices, titleCase } from "../../utils";

const addOns = [
  {
    title: "online service",
    description: "Access to multiplayer games",
  },
  {
    title: "larger storage",
    description: "Extra 1TB of cloud service",
  },
  {
    title: "custom profile",
    description: "Custom theme on your profile",
  },
];

export default function AddOns() {
  const { mutateData, mutateStep, data } = useUser();

  const isYearly = data!.service!.plan!.yearlyBilling;

  const { register, watch, handleSubmit } = useForm<optionsType>();

  const onSubmit: SubmitHandler<optionsType> = (options) => {
    mutateData({ service: { options: options } });
    mutateStep(4);
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-blue-900 lg:text-5xl">
        Pick add-ons
      </h1>
      <p className="text-gray-500">
        Add-ons help you enhance your gaming experience.
      </p>

      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        {addOns.map((addOn, key) => (
          <AddOn
            key={key}
            register={register}
            addOn={addOn}
            watch={watch}
            isYearly={isYearly}
          />
        ))}

        <div className="flex justify-between">
          <button
            className="rounded-lg px-2 py-3 text-gray-500 focus:outline-blue-400"
            onClick={() => {
              mutateStep(2);
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
  addOn: (typeof addOns)[0];
  register: UseFormRegister<optionsType>;
  watch: UseFormWatch<optionsType>;
  isYearly: boolean;
};

function AddOn({ addOn, register, watch, isYearly }: Props) {
  const registerName = titleCase(addOn.title) as keyof optionsType;
  const currentOptions = watch(registerName, true);

  return (
    <fieldset
      className={`flex justify-between gap-5 rounded-xl p-5 ${
        currentOptions == true && "ring-2 ring-blue-500"
      }`}
    >
      <div className="flex gap-5">
        <input
          {...register(registerName)}
          defaultChecked
          type="checkbox"
          className="my-auto h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
        />
        <div className="my-auto">
          <h2 className="text-xl font-bold capitalize text-blue-900">
            {addOn.title}
          </h2>
          <p className="text-gray-500"> {addOn.description}</p>
        </div>
      </div>

      <p className="my-auto">
        {getAddOnsPrices(titleCase(addOn.title) as keyof optionsType, isYearly)}
      </p>
    </fieldset>
  );
}
