import { UsersModule } from "../../modules/UsersModule";

export const Users = () => {
  return (
    <section className="section" data-testid="pageUsers">
      <UsersModule />
    </section>
  );
};
