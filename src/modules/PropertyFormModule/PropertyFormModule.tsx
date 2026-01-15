import { AxiosErrorAlertMessage } from "@/shared/components/AxiosErrorAlertMessage";
import { AxiosLoadingCircularProgress } from "@/shared/components/AxiosLoadingCircularProgress";
import { useGetPropertyDetailsQuery } from "@/shared/hooks/propertyDetails";
import { PropertyFormMode } from "@/shared/interfaces/PropertyForm";
import { useParams } from "react-router-dom";

import { PropertyBasicDataForm } from "./components/PropertyBasicDataForm";
import { PropertyFormOwners } from "./components/PropertyFormOwners";
import { PropertyFormStepCounter } from "./components/PropertyFormStepCounter";
import { usePropertyFormStepSync } from "./hooks";
import { PropertyFormSteps, usePropertyFormStore } from "./store";

interface PropertyFormModuleProps {
  mode: PropertyFormMode;
}

export const PropertyFormModule = ({ mode }: PropertyFormModuleProps) => {
  const { id: idOrSlug } = useParams<{ id: string }>();
  const step = usePropertyFormStore((state) => state.step);
  usePropertyFormStepSync(mode);

  const { data, isLoading, error } = useGetPropertyDetailsQuery(idOrSlug);

  if (mode === PropertyFormMode.edit && error) {
    return (
      <div className="p-4">
        <AxiosErrorAlertMessage error={error} />
      </div>
    );
  }

  if (isLoading) {
    return <AxiosLoadingCircularProgress />;
  }

  return (
    <div className="flex h-full flex-col">
      <PropertyFormStepCounter />
      <div className="flex-1">
        {step === PropertyFormSteps.basic_data && (
          <PropertyBasicDataForm mode={mode} editableProperty={data} />
        )}
        {step === PropertyFormSteps.property_owners && (
          <PropertyFormOwners mode={mode} editableProperty={data} />
        )}
      </div>
    </div>
  );
};
