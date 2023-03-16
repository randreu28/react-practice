import AddOns from "./steps/AddOns";
import SelectPlan from "./steps/SelectPlan";
import Summary from "./steps/Summary";
import YourInfo from "./steps/YourInfo";
import { useUser } from "./store";

export default function App() {
  const { step } = useUser();

  switch (step) {
    case 1:
      return <YourInfo />;

    case 2:
      return <SelectPlan />;

    case 3:
      return <AddOns />;

    case 4:
      return <Summary />;
  }
}
