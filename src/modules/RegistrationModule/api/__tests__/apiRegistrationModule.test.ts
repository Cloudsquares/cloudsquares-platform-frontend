import MockAdapter from "axios-mock-adapter";

import { axiosBaseWrap } from "../../../../configs/api";
import { apiRegistrationModule } from "../apiRegistrationModule";
import { RegistrationFormData } from "../../validations";

const buildFormData = (): RegistrationFormData => ({
  country_code: "KZ",
  phone: "77020000025",
  first_name: "Василий",
  last_name: "Классный",
  middle_name: "Олегович",
  agency_title: "ИП Алексеев",
  email: "b2b-client-25@example.com",
  password: "UserPassword1@",
  password_confirmation: "UserPassword1@",
});

describe("apiRegistrationModule", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(axiosBaseWrap);
  });

  afterEach(() => {
    mock.restore();
  });

  it("отправляет данные регистрации в корректном формате", async () => {
    const formData = buildFormData();
    const responsePayload = {
      user: {
        id: "user-id",
        phone: formData.phone,
        first_name: formData.first_name,
        last_name: formData.last_name,
        middle_name: formData.middle_name,
        role: "agent_admin",
        country_code: formData.country_code,
        user_status: {
          status: "active",
          description: null,
          changed_at: "2025-01-01T00:00:00.000Z",
          changed_by_id: null,
        },
        email: formData.email,
        agency: null,
        created_at: "2025-01-01T00:00:00.000Z",
        updated_at: "2025-01-01T00:00:00.000Z",
      },
      access_token: "access-token",
      refresh_token: "refresh-token",
    };

    let requestPayload: unknown;
    mock.onPost("/auth/register-agent-with-agency").reply((config) => {
      requestPayload = JSON.parse(config.data as string);
      return [201, responsePayload];
    });

    const response = await apiRegistrationModule.postNewUser(formData);

    expect(requestPayload).toEqual({
      user: {
        country_code: formData.country_code,
        phone: formData.phone,
        first_name: formData.first_name,
        last_name: formData.last_name,
        middle_name: formData.middle_name,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.password_confirmation,
      },
      agency: {
        title: formData.agency_title,
      },
    });
    expect(response).toEqual(responsePayload);
  });
});
