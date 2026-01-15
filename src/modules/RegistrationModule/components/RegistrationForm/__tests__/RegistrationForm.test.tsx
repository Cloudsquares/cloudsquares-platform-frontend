import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { RegistrationForm } from "../RegistrationForm";
import { TestProviders } from "../../../../../providers";
import { usePostNewUserMutation } from "../../../hooks";

jest.mock("../../../hooks", () => ({
  usePostNewUserMutation: jest.fn(),
}));

describe("RegistrationForm", () => {
  const mockedUsePostNewUserMutation =
    usePostNewUserMutation as jest.MockedFunction<
      typeof usePostNewUserMutation
    >;

  it("отправляет данные регистрации с нормализованным телефоном", async () => {
    const user = userEvent.setup();
    const mutate = jest.fn();

    mockedUsePostNewUserMutation.mockReturnValue({
      mutate,
      isPending: false,
    } as unknown as ReturnType<typeof usePostNewUserMutation>);

    render(
      <TestProviders>
        <RegistrationForm />
      </TestProviders>,
    );

    await user.clear(screen.getByLabelText("Телефон"));
    await user.type(screen.getByLabelText("Телефон"), "+77020000025");
    await user.type(screen.getByLabelText("Ваше имя"), "Василий");
    await user.type(screen.getByLabelText("Название агентства"), "ИП Алексеев");
    await user.type(screen.getByLabelText("E-mail"), "b2b@test.com");
    await user.type(screen.getByLabelText("Пароль"), "UserPassword1@");
    await user.type(
      screen.getByLabelText("Повторите пароль"),
      "UserPassword1@",
    );

    await user.click(screen.getByRole("button", { name: "Сохранить" }));

    expect(mutate).toHaveBeenCalledWith(
      expect.objectContaining({
        phone: "77020000025",
        agency_title: "ИП Алексеев",
        first_name: "Василий",
        email: "b2b@test.com",
        password: "UserPassword1@",
        password_confirmation: "UserPassword1@",
        country_code: "KZ",
      }),
    );
  });
});
