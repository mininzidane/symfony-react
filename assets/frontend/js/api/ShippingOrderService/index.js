import CountryService from 'frontend/js/api/CountryService';
import { BaseApiServiceInstance } from 'frontend/js/api/BaseApiService';

const ShippingOrderService = {
  getShippingCountriesList() {
    return BaseApiServiceInstance.get(BaseApiServiceInstance.buildExternalEhRequestPath(`destination-country`)).then(
      ({ data }) => data,
    );
  },
  getDestinationsList(countryId) {
    return BaseApiServiceInstance.get(
      BaseApiServiceInstance.buildExternalEhRequestPath(`destination?country=${countryId}`),
    ).then(({ data }) => data);
  },
  getPortsList(destinationId, lotPurchase) {
    let params = '';
    if (lotPurchase && lotPurchase.lot) {
      params = BaseApiServiceInstance.objectToQueryParams({
        lat: lotPurchase.lot.locationLat,
        lon: lotPurchase.lot.locationLon,
      });
    }

    return BaseApiServiceInstance.get(
      BaseApiServiceInstance.buildExternalEhRequestPath(`destination/${destinationId}/port?${params}`),
    ).then(({ data }) => data);
  },
  getQuote(payload) {
    const dataParams = payload || {};
    const params = BaseApiServiceInstance.objectToQueryParams(dataParams, true);

    return BaseApiServiceInstance.get(BaseApiServiceInstance.buildRequestPath(`quote?${params}`, true)).then(
      ({ data }) => data,
    );
  },
  loadExistingOrder(params = {}) {
    const query = BaseApiServiceInstance.objectToQueryParams(params);
    return BaseApiServiceInstance.get(BaseApiServiceInstance.buildRequestPath(`loadquote?${query}`, true)).then(
      ({ data }) => data,
    );
  },
  getCurrentCustomerPreorderByLot(lotId) {
    return BaseApiServiceInstance.get(BaseApiServiceInstance.buildRequestPath(`lots/${lotId}/preorder`, true)).then(
      ({ data }) => data,
    );
  },
  getShippingOrderStatus(token) {
    return BaseApiServiceInstance.get(BaseApiServiceInstance.buildRequestPath(`shipping/${token}/status`)).then(
      ({ data }) => data,
    );
  },
  shippingPreorder(payload) {
    return BaseApiServiceInstance.post(BaseApiServiceInstance.buildRequestPath(`shipping-preorder`), payload).then(
      ({ data }) => data,
    );
  },
  shippingOrder(payload) {
    return BaseApiServiceInstance.post(BaseApiServiceInstance.buildRequestPath(`shipping-order`, true), payload).then(
      ({ data }) => data,
    );
  },
  updateShippingOrder(id, payload) {
    return BaseApiServiceInstance.post(
      BaseApiServiceInstance.buildRequestPath(`shipping-order/${id}`, true),
      payload,
    ).then(({ data }) => data);
  },
  removeShippingOrder(token) {
    return BaseApiServiceInstance.delete(BaseApiServiceInstance.buildRequestPath(`shipping/${token}`)).then(
      ({ data }) => data,
    );
  },
  submitCustomQuoteRequest(payload) {
    return BaseApiServiceInstance.post(BaseApiServiceInstance.buildExternalEhRequestPath(`custom-quote`), payload).then(
      ({ data }) => data,
    );
  },
  uploadBos(id, payload) {
    return BaseApiServiceInstance.post(
      BaseApiServiceInstance.buildRequestPath(`shipping-order/${id}/upload-bos`, true),
      payload,
    ).then(({ data }) => data);
  },
  isPaymentForShippingOrderAvailable(token) {
    return BaseApiServiceInstance.get(
      BaseApiServiceInstance.buildRequestPath(`shipping/${token}/payment-availability`),
    ).then(({ data }) => data);
  },
  getLotPreorder({ id, auction }) {
    return BaseApiServiceInstance.get(
      BaseApiServiceInstance.buildRequestPath(`lots/${id}/preorder?auction=${auction}`, true),
    ).then(({ data }) => data);
  },
  getUSPorts({ destinationId, lat, lon }) {
    return BaseApiServiceInstance.get(
      BaseApiServiceInstance.buildExternalEhRequestPath(`destination/${destinationId}/port?lat=${lat}&lon=${lon}`),
    ).then(({ data }) => data);
  },
  getShippingOptions(lotNumber, auction) {
    return BaseApiServiceInstance.get(
      BaseApiServiceInstance.buildRequestPath(`shipping-options?lotNumber=${lotNumber}&auction=${auction}`, true),
    ).then(({ data }) => data);
  },
  saveShippingOptions(payload) {
    return BaseApiServiceInstance.post(BaseApiServiceInstance.buildRequestPath('shipping-options', true), payload).then(
      ({ data }) => data,
    );
  },
};

ShippingOrderService.INSURANCE_TOTAL_LOSS_COVERAGE_ID = 1;
ShippingOrderService.INSURANCE_FULL_COVERAGE_ID = 2;
ShippingOrderService.INSURANCE_TOTAL_LOSS_COVERAGE_LOWER_THRESHOLD = 75;
ShippingOrderService.INSURANCE_FULL_COVERAGE_LOWER_THRESHOLD = 250;
ShippingOrderService.INSURANCE_TOTAL_LOSS_COVERAGE_PERCENTAGE = 1.5;
ShippingOrderService.INSURANCE_FULL_COVERAGE_PERCENTAGE = 5;
ShippingOrderService.UNLIMITED_AUCTION_STORAGE = 99;
ShippingOrderService.INSPECTION_FEE = 35;

ShippingOrderService.VAT_RATE_TYPE_DEFAULT_POLAND = 'bremerhaven';
ShippingOrderService.VAT_RATE_POLAND = {
  bremerhaven: 0.19,
  rotterdam: 0.21,
  gdynia: 0.23,
  classicCar: 0.09,
};

ShippingOrderService.CUSTOMS_DUTY_TYPES = {
  CAR: 'car',
  TRUCK: 'truck',
  MOTORCYCLE: 'motorcycle',
  BOAT_AND_JET_SKI: 'boatAndJetSki',
  CLASSIC_CAR: 'classicCar',
};

ShippingOrderService.CUSTOMS_DUTY_RATE_POLAND = {
  [ShippingOrderService.CUSTOMS_DUTY_TYPES.CAR]: 0.1,
  [ShippingOrderService.CUSTOMS_DUTY_TYPES.TRUCK]: 0.22,
  [ShippingOrderService.CUSTOMS_DUTY_TYPES.MOTORCYCLE]: 0.06,
  [ShippingOrderService.CUSTOMS_DUTY_TYPES.BOAT_AND_JET_SKI]: 0.017,
  [ShippingOrderService.CUSTOMS_DUTY_TYPES.CLASSIC_CAR]: 0,
};

ShippingOrderService.CountryCodeUS = 'US';
ShippingOrderService.CountryCodeCA = 'CA';
ShippingOrderService.CountryCodeMEX = 'MX';
ShippingOrderService.CountryCodeUA = 'UA';
ShippingOrderService.CountryCodeNG = 'NG';
ShippingOrderService.CountryCodeRU = 'RU';
ShippingOrderService.CountryCodeBY = 'BY';
ShippingOrderService.CountryCodeSV = 'SV';
ShippingOrderService.CountryCodeBG = 'BG';
ShippingOrderService.CountryIdBG = 33;
ShippingOrderService.CountryIdCA = 38;
ShippingOrderService.CountryIdLT = 123;
ShippingOrderService.CountryIdMEX = 138;
ShippingOrderService.CountryIdUS = 223;
ShippingOrderService.CountryIdUA = 220;
ShippingOrderService.CountryIdNG = 156;
ShippingOrderService.CountryIdNL = 150;
ShippingOrderService.CountryIdBY = 20;
ShippingOrderService.CountryIdDE = 81;
ShippingOrderService.TypeDomestic = 'D';
ShippingOrderService.TypeInternational = 'I';
ShippingOrderService.TypeBorderCrossing = 'B';
ShippingOrderService.usCountryObj = { id: ShippingOrderService.CountryIdUS, name: 'USA', iso_2: 'US', type: 'D' };
ShippingOrderService.BorderCrossingCountries = [ShippingOrderService.CountryIdCA];
ShippingOrderService.Status = {
  Cancelled: 'cancelled',
};
ShippingOrderService.StateTX = 'TX';
ShippingOrderService.StateCA = 'CA';
ShippingOrderService.StateMO = 'MO';
ShippingOrderService.StateKS = 'KS';
ShippingOrderService.StateWI = 'WI';
ShippingOrderService.StateList = [
  { label: 'AK', value: 'AK' },
  { label: 'AL', value: 'AL' },
  { label: 'AS', value: 'AS' },
  { label: 'AZ', value: 'AZ' },
  { label: 'AR', value: 'AR' },
  { label: 'CA', value: 'CA' },
  { label: 'CO', value: 'CO' },
  { label: 'CT', value: 'CT' },
  { label: 'DE', value: 'DE' },
  { label: 'DC', value: 'DC' },
  { label: 'FM', value: 'FM' },
  { label: 'FL', value: 'FL' },
  { label: 'GA', value: 'GA' },
  { label: 'GU', value: 'GU' },
  { label: 'HI', value: 'HI' },
  { label: 'ID', value: 'ID' },
  { label: 'IL', value: 'IL' },
  { label: 'IN', value: 'IN' },
  { label: 'IA', value: 'IA' },
  { label: 'KS', value: 'KS' },
  { label: 'KY', value: 'KY' },
  { label: 'LA', value: 'LA' },
  { label: 'ME', value: 'ME' },
  { label: 'MH', value: 'MH' },
  { label: 'MD', value: 'MD' },
  { label: 'MA', value: 'MA' },
  { label: 'MI', value: 'MI' },
  { label: 'MN', value: 'MN' },
  { label: 'MS', value: 'MS' },
  { label: 'MO', value: 'MO' },
  { label: 'MT', value: 'MT' },
  { label: 'NE', value: 'NE' },
  { label: 'NV', value: 'NV' },
  { label: 'NH', value: 'NH' },
  { label: 'NJ', value: 'NJ' },
  { label: 'NM', value: 'NM' },
  { label: 'NY', value: 'NY' },
  { label: 'NC', value: 'NC' },
  { label: 'ND', value: 'ND' },
  { label: 'MP', value: 'MP' },
  { label: 'OH', value: 'OH' },
  { label: 'OK', value: 'OK' },
  { label: 'OR', value: 'OR' },
  { label: 'PW', value: 'PW' },
  { label: 'PA', value: 'PA' },
  { label: 'PR', value: 'PR' },
  { label: 'RI', value: 'RI' },
  { label: 'SC', value: 'SC' },
  { label: 'SD', value: 'SD' },
  { label: 'TN', value: 'TN' },
  { label: 'TX', value: 'TX' },
  { label: 'UT', value: 'UT' },
  { label: 'VT', value: 'VT' },
  { label: 'VI', value: 'VI' },
  { label: 'VA', value: 'VA' },
  { label: 'WA', value: 'WA' },
  { label: 'WV', value: 'WV' },
  { label: 'WI', value: 'WI' },
  { label: 'WY', value: 'WY' },
];

ShippingOrderService.getShippingTypeByCountryId = (countryId) => {
  if (countryId === ShippingOrderService.CountryIdUS) {
    return ShippingOrderService.TypeDomestic;
  }
  if (ShippingOrderService.BorderCrossingCountries.includes(countryId)) {
    return ShippingOrderService.TypeBorderCrossing;
  }
  return ShippingOrderService.TypeInternational;
};

ShippingOrderService.areQuoteParamsValid = (params = {}) => {
  const shippingType = params.type;

  if (shippingType === ShippingOrderService.TypeDomestic) {
    const { type, vin, vin_hash, origin_zip, destination_zip } = params;

    return Boolean(type && (vin || vin_hash) && origin_zip && destination_zip);
  }

  if (shippingType === ShippingOrderService.TypeBorderCrossing) {
    const { type, vin, vin_hash, origin_zip, destination } = params;

    return Boolean(type && (vin || vin_hash) && origin_zip && destination);
  }

  if (shippingType === ShippingOrderService.TypeInternational) {
    const { type, vin, vin_hash, origin_zip, destination_country, destination } = params;

    return Boolean(type && (vin || vin_hash) && origin_zip && (destination_country || destination));
  }

  return false;
};

ShippingOrderService.GEORGIAN_TOKEN = 'SPLBI7';
ShippingOrderService.LOUNGE_LA_TOKEN = 'V8DEFR';

ShippingOrderService.getQuoteTokenByCountry = (countryId) => {
  if (countryId === CountryService.COUNTRIES.georgia.code) {
    return ShippingOrderService.GEORGIAN_TOKEN;
  }
  if (
    [
      CountryService.COUNTRIES.elSalvador.code,
      CountryService.COUNTRIES.guatemala.code,
      CountryService.COUNTRIES.honduras.code,
      CountryService.COUNTRIES.costaRica.code,
    ].includes(countryId)
  ) {
    return ShippingOrderService.LOUNGE_LA_TOKEN;
  }

  return null;
};

ShippingOrderService.SHIPPING_TYPE_RORO = 'RORO';

export default ShippingOrderService;
