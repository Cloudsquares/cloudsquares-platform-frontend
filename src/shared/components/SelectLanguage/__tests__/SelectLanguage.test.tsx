import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { TFunction } from "i18next";
import { useFormContext } from "react-hook-form";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { SelectLanguage } from "@/shared/components/SelectLanguage";
import { TestProviders } from "@/providers";
import i18n from "@/i18n";

const mockTFunction = ((key: string) => key) as TFunction;
const mockUseFormContext = useFormContext;

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

vi.mock("@/shared/components/BasicFormSelectField", () => ({
  BasicFormSelectField: ({
    name,
    placeholder,
    data,
    disabled,
  }: {
    name: string;
    placeholder?: string;
    data: { value: string; label: string }[];
    disabled?: boolean;
  }) => {
    const { setValue, watch } = mockUseFormContext();
    const value = watch(name);

    return (
      <select
        data-testid="mock-language-select"
        aria-label={placeholder}
        name={name}
        disabled={disabled}
        value={value}
        onChange={(event) => setValue(name, event.target.value)}
      >
        {data.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  },
}));

describe("SelectLanguage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    i18n.language = "en-US";
  });

  it("нормализует ru-RU до ru и меняет язык", async () => {
    i18n.language = "ru-RU";

    const changeLanguageSpy = vi
      .spyOn(i18n, "changeLanguage")
      .mockResolvedValue(mockTFunction);

    render(
      <TestProviders>
        <SelectLanguage />
      </TestProviders>,
    );

    await waitFor(() => {
      expect(changeLanguageSpy).toHaveBeenCalledWith("ru");
    });
  });

  it("нормализует kz-KZ до en как fallback", async () => {
    i18n.language = "kz-KZ";

    const changeLanguageSpy = vi
      .spyOn(i18n, "changeLanguage")
      .mockResolvedValue(mockTFunction);

    render(
      <TestProviders>
        <SelectLanguage />
      </TestProviders>,
    );

    await waitFor(() => {
      expect(changeLanguageSpy).toHaveBeenCalledWith("en");
    });
  });

  it("рендерит select с текущим языком", async () => {
    const changeLanguageSpy = vi
      .spyOn(i18n, "changeLanguage")
      .mockResolvedValue(mockTFunction);

    render(
      <TestProviders>
        <SelectLanguage />
      </TestProviders>,
    );

    const select = await screen.findByTestId("mock-language-select");
    expect(select).toBeInTheDocument();
    expect(select).toHaveAttribute("name", "language");
    expect(select).toHaveAttribute("aria-label", "select_language_placeholder");

    await waitFor(() => {
      expect(changeLanguageSpy).toHaveBeenCalledWith("en");
    });
  });

  it("меняет язык при выборе другой опции", async () => {
    const user = userEvent.setup();
    const changeLanguageSpy = vi
      .spyOn(i18n, "changeLanguage")
      .mockResolvedValue(mockTFunction);

    render(
      <TestProviders>
        <SelectLanguage />
      </TestProviders>,
    );

    const select = await screen.findByTestId("mock-language-select");

    await waitFor(() => {
      expect(changeLanguageSpy).toHaveBeenCalledWith("en");
    });

    changeLanguageSpy.mockClear();

    await user.selectOptions(select, "kz");

    await waitFor(() => {
      expect(changeLanguageSpy).toHaveBeenCalledWith("kz");
    });
  });

  it("не вызывает changeLanguage повторно, если язык не изменился", async () => {
    const user = userEvent.setup();
    const changeLanguageSpy = vi
      .spyOn(i18n, "changeLanguage")
      .mockResolvedValue(mockTFunction);

    render(
      <TestProviders>
        <SelectLanguage />
      </TestProviders>,
    );

    const select = await screen.findByTestId("mock-language-select");

    await waitFor(() => {
      expect(changeLanguageSpy).toHaveBeenCalledWith("en");
    });

    changeLanguageSpy.mockClear();

    const currentValue = (select as HTMLSelectElement).value;

    await user.selectOptions(select, currentValue);

    await waitFor(() => {
      expect(changeLanguageSpy).not.toHaveBeenCalled();
    });
  });
});
