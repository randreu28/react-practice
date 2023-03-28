import toast from "react-hot-toast";
import { optionsType, useUser } from "../../store";
import { getAddOnsPrices, getFinalPrice, getPlanPrices } from "../../utils";

export default function Summary() {
  const { info, plan, options, goToStep } = useUser();

  return (
    <>
      <h1 className="text-3xl font-bold text-blue-900 lg:text-5xl">
        Finishing up
      </h1>
      <p className="text-gray-500">
        Double-check everything looks OK before confirming.
      </p>

      <div className="space-y-5 rounded-xl bg-gray-100 p-5">
        <div>
          <div className="flex justify-between">
            <h2 className="font-bold capitalize text-blue-900">
              {plan?.type} ({plan?.yearlyBilling ? "Yearly" : "Monthly"})
            </h2>
            <p>{getPlanPrices(plan!.type, plan!.yearlyBilling)}</p>
          </div>
          <button
            className="text-blue-500 hover:cursor-pointer hover:underline"
            onClick={() => {
              goToStep(2);
            }}
          >
            Change
          </button>
        </div>

        <span className="inline-block h-[1px] w-full bg-gray-300" />

        {Object.keys(options!).map((key, index) => {
          if (options![key as keyof optionsType] == true) {
            return (
              <div key={index} className="flex justify-between text-gray-500">
                <h2 className="capitalize">
                  {key.replace(/([a-z])([A-Z])/g, "$1 $2")}
                </h2>
                <p>{getAddOnsPrices(key, plan?.yearlyBilling)}</p>
              </div>
            );
          }
        })}
      </div>

      <div className="flex justify-between px-5 text-gray-500">
        <p>Total (per {plan?.yearlyBilling ? "year" : "month"})</p>
        <p>{getFinalPrice(plan!, options!)}</p>
      </div>

      <br />

      <div className="flex justify-between">
        <button
          className="rounded-lg px-2 py-3 text-gray-500 focus:outline-blue-400"
          onClick={() => {
            goToStep(3);
          }}
        >
          Go back
        </button>
        <button
          className="rounded-lg bg-blue-900 px-4 py-3 text-white focus:outline-blue-400"
          onClick={() => {
            console.log({ info, plan, options });
            toast.success("Check your console!");
          }}
        >
          Confirm
        </button>
      </div>
    </>
  );
}
