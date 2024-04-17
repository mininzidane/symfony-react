import BootstrapService from 'frontend/js/api/BootstrapService';
import OfficeLocationsService from 'frontend/js/api/OfficeLocationsService';

const CountryService = {
  getUserCountryIso2() {
    const bootstrapCountryIso2 = BootstrapService.getAppValue('countryCode');
    const { customer } = window;

    if (customer && customer.preferredCountry) {
      return customer.preferredCountry;
    }

    if (bootstrapCountryIso2) {
      return bootstrapCountryIso2;
    }

    return CountryService.COUNTRIES.usa.iso2;
  },

  isCountryWithOffice(iso2) {
    const officeCountryIso2List = OfficeLocationsService.getOfficeCountryIso2List();

    return officeCountryIso2List.includes(iso2);
  },

  isCountryWithLounge(iso2) {
    const officeData = OfficeLocationsService.getOfficeData(iso2);

    return Boolean(officeData?.lounge);
  },

  isForeignCountryWithOffice(iso2 = CountryService.getUserCountryIso2()) {
    const officeCountryIso2List = OfficeLocationsService.getOfficeCountryIso2List();

    return Boolean(!CountryService.isUsa(iso2) && officeCountryIso2List.includes(iso2));
  },

  isDomestic(iso2 = CountryService.getUserCountryIso2()) {
    return CountryService.DOMESTIC_COUNTRIES_ISO2.includes(iso2);
  },

  isUsa(iso2 = CountryService.getUserCountryIso2()) {
    return Boolean(iso2 === CountryService.COUNTRIES.usa.iso2);
  },

  isCopartLounge() {
    return BootstrapService.getAppValue('isLoungeLocation', false);
  },

  isCountry(iso2, name) {
    return iso2 === CountryService.COUNTRIES[name].iso2;
  },

  isUserCountry(countryName) {
    return Boolean(CountryService.COUNTRIES[countryName].iso2 === CountryService.getUserCountryIso2());
  },

  getCustomerProfileCountry() {
    const { customer } = window;

    if (customer && customer.country) {
      return customer.country.iso_2;
    }

    return null;
  },

  isCustomerProfileCountry(iso2 = CountryService.COUNTRIES.usa.iso2) {
    return iso2 === CountryService.getCustomerProfileCountry();
  },

  COUNTRIES: {
    usa: { name: 'USA', code: 223, iso2: 'US', iso3: 'USA' },
    canada: { name: 'Canada', code: 38, iso2: 'CA', iso3: 'CAN' },
    mexico: { name: 'Mexico', code: 138, iso2: 'MX', iso3: 'MEX' },
    ukraine: { name: 'Ukraine', code: 220, iso2: 'UA', iso3: 'UKR' },
    nigeria: { name: 'Nigeria', code: 156, iso2: 'NG', iso3: 'NGA' },
    russia: { name: 'Russia', code: 176, iso2: 'RU', iso3: 'RUS' },
    belarus: { name: 'Belarus', code: 20, iso2: 'BY', iso3: 'BLR' },
    elSalvador: { name: 'El Salvador', code: 64, iso2: 'SV', iso3: 'SLV' },
    georgia: { name: 'Georgia', code: 80, iso2: 'GE', iso3: 'GEO' },
    bulgaria: { name: 'Bulgaria', code: 33, iso2: 'BG', iso3: 'BGR' },
    romania: { name: 'Romania', code: 175, iso2: 'RO', iso3: 'ROM' },
    unitedKingdom: { name: 'United Kingdom', code: 222, iso2: 'GB', iso3: 'GBR' },
    poland: { name: 'Poland', code: 170, iso2: 'PL', iso3: 'POL' },
    germany: { name: 'Germany', code: 81, iso2: 'DE', iso3: 'DEU' },
    netherlands: { name: 'Netherlands', code: 150, iso2: 'NL', iso3: 'NLD' },
    guatemala: { name: 'Guatemala', code: 89, iso2: 'GT', iso3: 'GTM' },
    honduras: { name: 'Honduras', code: 95, iso2: 'HN', iso3: 'HND' },
    albania: { name: 'Albania', code: 2, iso2: 'AL', iso3: 'ALB' },
    southKorea: { name: 'South Korea', code: 113, iso2: 'KR', iso3: 'KOR' },
    costaRica: { name: 'Costa Rica', code: 51, iso2: 'CR', iso3: 'CRI' },
  },

  COUNTRY_NAMES: {
    AD: 'Andorra',
    AE: 'United Arab Emirates',
    AF: 'Afghanistan',
    AG: 'Antigua and Barbuda',
    AI: 'Anguilla',
    AL: 'Albania',
    AM: 'Armenia',
    AO: 'Angola',
    AR: 'Argentina',
    AS: 'American Samoa',
    AT: 'Austria',
    AU: 'Australia',
    AW: 'Aruba',
    AX: 'Aland Islands',
    AZ: 'Azerbaijan',
    BA: 'Bosnia and Herzegovina',
    BB: 'Barbados',
    BD: 'Bangladesh',
    BE: 'Belgium',
    BF: 'Burkina Faso',
    BG: 'Bulgaria',
    BH: 'Bahrain',
    BI: 'Burundi',
    BJ: 'Benin',
    BL: 'Saint Barthelemy',
    BM: 'Bermuda',
    BN: 'Brunei',
    BO: 'Bolivia',
    BQ: 'Caribbean Netherlands',
    BR: 'Brazil',
    BS: 'Bahamas',
    BT: 'Bhutan',
    BW: 'Botswana',
    BY: 'Belarus',
    BZ: 'Belize',
    CA: 'Canada',
    CC: 'Cocos  Islands',
    CD: 'Congo',
    CF: 'Central African Republic',
    CG: 'Congo',
    CH: 'Switzerland',
    CI: 'Cote d’Ivoire',
    CK: 'Cook Islands',
    CL: 'Chile',
    CM: 'Cameroon',
    CN: 'China',
    CO: 'Colombia',
    CR: 'Costa Rica',
    CU: 'Cuba',
    CV: 'Cape Verde',
    CW: 'Curacao',
    CX: 'Christmas Island',
    CY: 'Cyprus',
    CZ: 'Czech Republic',
    DE: 'Germany',
    DJ: 'Djibouti',
    DK: 'Denmark',
    DM: 'Dominica',
    DO: 'Dominican Republic',
    DZ: 'Algeria',
    EC: 'Ecuador',
    EE: 'Estonia',
    EG: 'Egypt',
    EH: 'Western Sahara',
    ER: 'Eritrea',
    ES: 'Spain',
    ET: 'Ethiopia',
    FI: 'Finland',
    FJ: 'Fiji',
    FK: 'Falkland Islands',
    FM: 'Micronesia',
    FO: 'Faroe Islands',
    FR: 'France',
    GA: 'Gabon',
    GB: 'United Kingdom',
    GD: 'Grenada',
    GE: 'Georgia',
    GF: 'French Guiana',
    GG: 'Guernsey',
    GH: 'Ghana',
    GI: 'Gibraltar',
    GL: 'Greenland',
    GM: 'Gambia',
    GN: 'Guinea',
    GP: 'Guadeloupe',
    GQ: 'Equatorial Guinea',
    GR: 'Greece',
    GT: 'Guatemala',
    GU: 'Guam',
    GW: 'Guinea-Bissau',
    GY: 'Guyana',
    HK: 'Hong Kong',
    HN: 'Honduras',
    HR: 'Croatia',
    HT: 'Haiti',
    HU: 'Hungary',
    ID: 'Indonesia',
    IE: 'Ireland',
    IL: 'Israel',
    IM: 'Isle of Man',
    IN: 'India',
    IO: 'British Indian Ocean Territory',
    IQ: 'Iraq',
    IR: 'Iran',
    IS: 'Iceland',
    IT: 'Italy',
    JE: 'Jersey',
    JM: 'Jamaica',
    JO: 'Jordan',
    JP: 'Japan',
    KE: 'Kenya',
    KG: 'Kyrgyzstan',
    KH: 'Cambodia',
    KI: 'Kiribati',
    KM: 'Comoros',
    KN: 'Saint Kitts and Nevis',
    KP: 'North Korea',
    KR: 'South Korea',
    KW: 'Kuwait',
    KY: 'Cayman Islands',
    KZ: 'Kazakhstan',
    LA: 'Laos',
    LB: 'Lebanon',
    LC: 'Saint Lucia',
    LI: 'Liechtenstein',
    LK: 'Sri Lanka',
    LR: 'Liberia',
    LS: 'Lesotho',
    LT: 'Lithuania',
    LU: 'Luxembourg',
    LV: 'Latvia',
    LY: 'Libya',
    MA: 'Morocco',
    MC: 'Monaco',
    MD: 'Moldova',
    ME: 'Montenegro',
    MF: 'Saint Martin',
    MG: 'Madagascar',
    MH: 'Marshall Islands',
    MK: 'Macedonia',
    ML: 'Mali',
    MM: 'Myanmar',
    MN: 'Mongolia',
    MO: 'Macau',
    MP: 'Northern Mariana Islands',
    MQ: 'Martinique',
    MR: 'Mauritania',
    MS: 'Montserrat',
    MT: 'Malta',
    MU: 'Mauritius',
    MV: 'Maldives',
    MW: 'Malawi',
    MX: 'Mexico',
    MY: 'Malaysia',
    MZ: 'Mozambique',
    NA: 'Namibia',
    NC: 'New Caledonia',
    NE: 'Niger',
    NF: 'Norfolk Island',
    NG: 'Nigeria',
    NI: 'Nicaragua',
    NL: 'Netherlands',
    NO: 'Norway',
    NP: 'Nepal',
    NR: 'Nauru',
    NU: 'Niue',
    NZ: 'New Zealand',
    OM: 'Oman',
    PA: 'Panama',
    PE: 'Peru',
    PF: 'French Polynesia',
    PG: 'Papua New Guinea',
    PH: 'Philippines',
    PK: 'Pakistan',
    PL: 'Poland',
    PM: 'Saint Pierre and Miquelon',
    PR: 'Puerto Rico',
    PS: 'Palestine',
    PT: 'Portugal',
    PW: 'Palau',
    PY: 'Paraguay',
    QA: 'Qatar',
    RE: 'Reunion',
    RO: 'Romania',
    RS: 'Serbia',
    RU: 'Russia',
    RW: 'Rwanda',
    SA: 'Saudi Arabia',
    SB: 'Solomon Islands',
    SC: 'Seychelles',
    SD: 'Sudan',
    SE: 'Sweden',
    SG: 'Singapore',
    SH: 'Saint Helena',
    SI: 'Slovenia',
    SJ: 'Svalbard and Jan Mayen',
    SK: 'Slovakia',
    SL: 'Sierra Leone',
    SM: 'San Marino',
    SN: 'Senegal',
    SO: 'Somalia',
    SR: 'Suriname',
    SS: 'South Sudan',
    ST: 'Sao Tome and Principe',
    SV: 'El Salvador',
    SX: 'Sint Maarten',
    SY: 'Syria',
    SZ: 'Swaziland',
    TC: 'Turks and Caicos Islands',
    TD: 'Chad',
    TG: 'Togo',
    TH: 'Thailand',
    TJ: 'Tajikistan',
    TK: 'Tokelau',
    TL: 'Timor-Leste',
    TM: 'Turkmenistan',
    TN: 'Tunisia',
    TO: 'Tonga',
    TR: 'Turkey',
    TT: 'Trinidad and Tobago',
    TV: 'Tuvalu',
    TW: 'Taiwan',
    TZ: 'Tanzania',
    UA: 'Ukraine',
    UG: 'Uganda',
    US: 'United States',
    UY: 'Uruguay',
    UZ: 'Uzbekistan',
    VA: 'Vatican City',
    VC: 'Saint Vincent and the Grenadines',
    VE: 'Venezuela',
    VG: 'British Virgin Islands',
    VI: 'U.S. Virgin Islands',
    VN: 'Vietnam',
    VU: 'Vanuatu',
    WF: 'Wallis and Futuna',
    WS: 'Samoa',
    XK: 'Kosovo',
    YE: 'Yemen',
    YT: 'Mayotte',
    ZA: 'South Africa',
    ZM: 'Zambia',
    ZW: 'Zimbabwe',
  },
};

CountryService.DOMESTIC_COUNTRIES_CODE = [CountryService.COUNTRIES.usa.code, CountryService.COUNTRIES.canada.code];

CountryService.DOMESTIC_COUNTRIES_ISO2 = [CountryService.COUNTRIES.usa.iso2, CountryService.COUNTRIES.canada.iso2];

export default CountryService;
