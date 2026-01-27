import { useTranslation } from "react-i18next";

import { SelectLanguage } from "../../../../shared/components/SelectLanguage";

const currentYear = new Date().getFullYear();

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer
      data-testid="footer"
      className="hidden border-t border-grey-200 py-4 md:block"
    >
      <div className="mx-auto flex w-full max-w-screen-xl flex-col gap-4 px-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h6 className="text-h6 text-foreground">CloudSquares</h6>
          <div className="flex items-center gap-2">
            <p className="text-body1 text-labels-secondary">
              © {currentYear}. {t("footer.made_with")}
            </p>
            <a
              className="font-semibold text-primary underline"
              target="_blank"
              rel="noreferrer"
              href="https://whitedog.kz"
            >
              WhiteDog
            </a>
          </div>
        </div>
        <div className="flex justify-start md:justify-end">
          <div className="max-w-[200px]">
            <SelectLanguage />
          </div>
        </div>
      </div>
    </footer>
  );
};
