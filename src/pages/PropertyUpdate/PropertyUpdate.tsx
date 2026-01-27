import { PropertyUpdateModule } from "../../modules/PropertyUpdateModule";

export const PropertyUpdate = () => {
  return (
    <section
      className="section section-property-edit"
      data-testid="pagePropertyUpdate"
    >
      <PropertyUpdateModule />
    </section>
  );
};
