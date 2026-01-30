import React from "react";
import { useTranslation } from "react-i18next";
import { useForm, FormProvider } from "react-hook-form";
import { BasicFormSelectField } from "@/shared/components/BasicFormSelectField";
import i18n from "@/i18n";

interface LanguageFormValues {
  language: string;
}

const languageOptions = [
  { value: "ru", label: "🇷🇺 Русский" },
  { value: "kz", label: "🇰🇿 Kazakh" },
  { value: "en", label: "🇬🇧 English" },
];

// Преобразует "ru-RU", "en-GB" и т.д. → в короткие коды: "ru", "en"
function normalizeLang(lang: string): string {
  const short = lang.split("-")[0].toLowerCase();
  return short === "ru" ? "ru" : "en"; // fallback всегда en
}

export const SelectLanguage = () => {
  const { t } = useTranslation();

  const methods = useForm<LanguageFormValues>({
    defaultValues: {
      language: normalizeLang(i18n.language),
    },
  });

  const { watch, setValue } = methods;
  const selectedLang = watch("language");

  // Обеспечивает смену языка
  React.useEffect(() => {
    if (selectedLang && i18n.language !== selectedLang) {
      i18n.changeLanguage(selectedLang);
    }
  }, [selectedLang]);

  // На случай обновления языка из внешнего источника
  React.useEffect(() => {
    setValue("language", normalizeLang(i18n.language));
  }, [setValue]);

  return (
    <FormProvider {...methods}>
      <BasicFormSelectField
        name="language"
        placeholder={t("select_language_placeholder")}
        data={languageOptions}
        disabled={false}
      />
    </FormProvider>
  );
};
