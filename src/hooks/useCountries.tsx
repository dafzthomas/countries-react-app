import { gql, useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";

export interface Country {
  code: string;
  name: string;
  emoji: string;
  native: string;
  phone: string;
  capital: string;
  currency: string;
  image?: string;
}

interface CountriesQueryData {
  countries: Country[];
}

const COUNTRIES = gql`
  query countries {
    countries {
      code
      name
      emoji
      native
      phone
      capital
      currency
    }
  }
`;

export default function useCountries() {
  const [getCountriesQuery, { error }] =
    useLazyQuery<CountriesQueryData>(COUNTRIES);

  const [loading, setLoading] = useState(true);
  const [countries, setCountries] = useState<Country[]>([]);

  const getCountryImage = (countryName: string) => {
    return `https://source.unsplash.com/random/?country,${countryName}`;
  };

  const getCountries = async () => {
    setLoading(true);

    const countriesQueryResult = (await getCountriesQuery()) as {
      data: CountriesQueryData;
    };

    const countriesWithImage = countriesQueryResult.data?.countries.map(
      (country) => {
        const image = getCountryImage(country.name);

        return {
          ...country,
          image,
        };
      }
    );

    setCountries(countriesWithImage);

    setLoading(false);
  };

  useEffect(() => {
    getCountries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    loading,
    error,
    data: countries,
    refetch: getCountries,
  };
}
