import { useRegistrationFormValidationSchema } from "../useRegistrationFormValidationSchema";

describe("useRegistrationFormValidationSchema", () => {
  const validData = {
    country_code: "KZ",
    phone: "+77020000025",
    first_name: "Василий",
    last_name: "Классный",
    middle_name: "Олегович",
    agency_title: "ИП Алексеев",
    email: "b2b-client-25@example.com",
    password: "UserPassword1@",
    password_confirmation: "UserPassword1@",
  };

  it("валидирует корректные данные", () => {
    const result = useRegistrationFormValidationSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("возвращает ошибку, если не указано агентство", () => {
    const result = useRegistrationFormValidationSchema.safeParse({
      ...validData,
      agency_title: "",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      const hasAgencyError = result.error.issues.some((issue) =>
        issue.path.includes("agency_title"),
      );
      expect(hasAgencyError).toBe(true);
    }
  });

  it("возвращает ошибку при несовпадении паролей", () => {
    const result = useRegistrationFormValidationSchema.safeParse({
      ...validData,
      password_confirmation: "ДругойПароль1@",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      const hasPasswordError = result.error.issues.some((issue) =>
        issue.path.includes("password_confirmation"),
      );
      expect(hasPasswordError).toBe(true);
    }
  });
});
