import { PropertyCreateModule } from "../../modules/PropertyCreateModule";

export const PropertyCreate = () => {
  return (
    <section
      className="section section-property-create bg-background text-foreground"
      data-testid="pagePropertyCreate"
    >
      <PropertyCreateModule />
    </section>
  );
};
