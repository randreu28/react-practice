import { useState } from "react";
import AddOns from "./steps/AddOns";
import SelectPlan from "./steps/SelectPlan";
import Summary from "./steps/Summary";
import YourInfo from "./steps/YourInfo";

interface dataType {
  name: string;
  email: string;
  phoneNum: string;
  plan: {
    type: "arcade" | "advanced" | "pro";
    billing: "monthly" | "yearly";
    onlineService: boolean;
    largerStorage: boolean;
    customProfile: boolean;
  };
}

export default function App() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [data, setData] = useState<dataType>(null!);

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
