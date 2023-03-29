import { optionsType, plansType, planType } from "./store";

export function titleCase(str: string) {
  let splitStr = str.toLowerCase().split(" ");
  for (let i = 0; i < splitStr.length; i++) {
    if (i !== 0) {
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
  }
  return splitStr.join("");
}

export function validatePhoneNumber(value: string) {
  const regex = /^[+]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;
  return regex.test(value) || "Please enter a valid phone number";
}

export function getPlanPrices(planType: plansType, isYearly: boolean): string {
  const billingModifier = isYearly ? 12 : 1;
  const tag = isYearly ? "$/yr" : "$/mo";
  switch (planType) {
    case plansType.pro:
      return "+" + 15 * billingModifier + tag;

    case plansType.advanced:
      return "+" + 12 * billingModifier + tag;

    case plansType.arcade:
      return "+" + 9 * billingModifier + tag;
  }
}

export function getAddOnsPrices(
  addOn: string | keyof optionsType,
  isYearly?: boolean
) {
  const billingModifier = isYearly ? 12 : 1;
  const tag = isYearly ? "$/yr" : "$/mo";
  switch (addOn) {
    case "onlineService":
      return "+" + 1 * billingModifier + tag;

    case "largerStorage":
      return "+" + 2 * billingModifier + tag;

    case "customProfile":
      return "+" + 2 * billingModifier + tag;

    case "default":
      throw Error(`addOn ${addOn} does not exist`);
  }
}

export function getFinalPrice(plan: planType, options: optionsType) {
  let sum: number = 0;

  switch (plan.type) {
    case plansType.pro:
      sum = sum + 15 * (plan.yearlyBilling ? 12 : 1);
      break;
    case plansType.advanced:
      sum = sum + 12 * (plan.yearlyBilling ? 12 : 1);
      break;
    case plansType.arcade:
      sum = sum + 9 * (plan.yearlyBilling ? 12 : 1);
      break;
  }

  if (options.onlineService) sum = sum + 1 * (plan.yearlyBilling ? 12 : 1);
  if (options.customProfile) sum = sum + 2 * (plan.yearlyBilling ? 12 : 1);
  if (options.largerStorage) sum = sum + 2 * (plan.yearlyBilling ? 12 : 1);

  return `+${sum}$/${plan.yearlyBilling ? "yr" : "mo"}`;
}
