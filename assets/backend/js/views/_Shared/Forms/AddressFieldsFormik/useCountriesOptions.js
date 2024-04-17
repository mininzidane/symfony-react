import useStates from 'backend/js/hooks/useStates';
import useCountries from 'backend/js/hooks/useCountries';

function useCountriesOptions(country) {
  const countries = useCountries();
  const [states, isStateLoading] = useStates(country);

  function getCountryIdByCode(code) {
    const foundCountry = countries.find((v) => code === v.iso_2);
    return foundCountry && foundCountry.id;
  }

  function getStateIdByCode(code) {
    const foundState = states.find((v) => code === v.code);
    return foundState && foundState.id;
  }

  return {
    countries,
    states,
    isStateLoading,
    getCountryIdByCode,
    getStateIdByCode,
  };
}

export default useCountriesOptions;
