import { PropertyCreateModule } from "../../modules/PropertyCreateModule";

export const PropertyCreate = () => {
  return (
    <section
      className="section section-property-create"
      data-testid="pagePropertyCreate"
    >
      <PropertyCreateModule />
    </section>
  );
};
