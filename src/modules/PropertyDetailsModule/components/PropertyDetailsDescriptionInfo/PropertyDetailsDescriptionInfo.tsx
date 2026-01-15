import { usePropertyDetailsStore } from "../../store";

export const PropertyDetailsDescriptionInfo = () => {
  const currentProperty = usePropertyDetailsStore(
    (state) => state.currentProperty,
  );

  return (
    <div className="space-y-2 pb-4">
      <h5 className="text-h5 text-foreground">Описание</h5>
      <div className="text-body2 text-labels-secondary">
        {currentProperty?.description}
      </div>
    </div>
  );
};
