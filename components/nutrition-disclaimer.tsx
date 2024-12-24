import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

const NutritionDisclaimer = () => {
  return (
    <Alert className="mb-4">
      <div className="flex">
        <Info className="mr-2 h-5 text-blue-500 w-14" />
        <div>
          <AlertDescription>
            Nutritional information are estimates. Please refer to the labels on
            your product packaging for the most accurate values.
          </AlertDescription>
        </div>
      </div>
    </Alert>
  );
};

export default NutritionDisclaimer;
