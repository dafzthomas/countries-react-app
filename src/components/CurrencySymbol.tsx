import { Tooltip } from "@mui/material";
import getSymbolFromCurrency from "currency-symbol-map";
import { Country } from "../hooks/useCountries";

const CurrencySymbol = ({ country }: { country: Country }) => {
  if (!country.currency) {
    return <span>Unknown</span>;
  }

  return (
    <span>
      {getSymbolFromCurrency(country.currency)} ({country.currency})
    </span>
  );
};

export default CurrencySymbol;
