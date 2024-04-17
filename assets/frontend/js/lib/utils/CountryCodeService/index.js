const CountryCodeService = {
  countryCodes: {
    Nigeria: {
      iso2: 'NG',
    },
    USA: {
      iso2: 'US',
    },
  },
  getIso2Code(country) {
    if (CountryCodeService.countryCodes[country] !== undefined) {
      return CountryCodeService.countryCodes[country].iso2;
    }

    return '';
  },
};

export default CountryCodeService;
