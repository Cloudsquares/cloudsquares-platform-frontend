import { PropertyUpdateModule } from "../../modules/PropertyUpdateModule";

export const PropertyUpdate = () => {
  return (
    <section
      className="section section-property-edit bg-background text-foreground"
      data-testid="pagePropertyUpdate"
    >
      <PropertyUpdateModule />
    </section>
  );
};
