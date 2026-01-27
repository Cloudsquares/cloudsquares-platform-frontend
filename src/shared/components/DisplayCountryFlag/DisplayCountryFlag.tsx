import { CountryCode, CountryCodeDisplayFlag } from "../../interfaces/Country";

interface DisplayCountryFlagProps {
  country_code: CountryCode;
}

export const DisplayCountryFlag = ({
  country_code,
}: DisplayCountryFlagProps) => {
  return <span>{CountryCodeDisplayFlag[country_code]}</span>;
};
