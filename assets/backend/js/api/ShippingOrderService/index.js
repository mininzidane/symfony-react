import CountryService from 'frontend/js/api/CountryService';
import BaseApiService, { BaseApiServiceInstance } from 'backend/js/api/BaseApiService';

const ShippingOrderService = {
  getCountriesList() {
    return BaseApiServiceInstance.get(BaseApiServiceInstance.buildExternalEhRequestPath(`destination-country`)).then(
      ({ data }) => data,
    );
  },
  getDestinationsList(countryId) {
    return BaseApiServiceInstance.get(
      BaseApiServiceInstance.buildExternalEhRequestPath(`destination?country=${countryId}`),
    ).then(({ data }) => data);
  },
  getPortsList(destinationId, lat, lon) {
    let params = '';
    if (lat && lon) {
      params = BaseApiService.objectToQueryParams({ lat, lon });
    }

    return BaseApiServiceInstance.get(
      BaseApiServiceInstance.buildExternalEhRequestPath(`destination/${destinationId}/port?${params}`),
    ).then(({ data }) => data);
  },
  getQuote(payload) {
    const dataParams = payload || {};
    if (!dataParams.token) {
      dataParams.token = BaseApiServiceInstance.externalEhToken;
    }
    const params = BaseApiService.objectToQueryParams(dataParams);

    return BaseApiServiceInstance.get(BaseApiServiceInstance.buildExternalEhRequestPath(`quote?${params}`)).then(
      ({ data }) => data,
    );
  },
  createQuoteOrder(customerId, payload) {
    return BaseApiServiceInstance.post(
      BaseApiServiceInstance.buildProtectedRequestPath(`customer/${customerId}/shipping-orders/create`),
      payload,
    ).then(({ data }) => data);
  },
  getCopartLocations(usaOnly) {
    return BaseApiServiceInstance.get(
      BaseApiServiceInstance.buildProtectedRequestPath(`api/v1/locations?usaOnly=${usaOnly}`),
    ).then(({ data }) => data.locations);
  },
  getEhNotes(id) {
    return BaseApiServiceInstance.get(
      BaseApiServiceInstance.buildProtectedRequestPath(`api/v1/shipping-orders/${id}/notes`),
    ).then(({ data }) => data);
  },
  getSearchChoices() {
    return BaseApiServiceInstance.get(
      BaseApiServiceInstance.buildProtectedRequestPath('api/v1/shipping-orders/search-choices'),
    ).then(({ data }) => data);
  },
  getContainers(queryString) {
    return BaseApiServiceInstance.get(
      BaseApiServiceInstance.buildProtectedRequestPath(`api/v1/shipping-orders/containers?${queryString}`),
    ).then(({ data }) => data);
  },
  addNote(id, payload) {
    return BaseApiServiceInstance.post(
      BaseApiServiceInstance.buildProtectedRequestPath(`api/v1/shipping-orders/${id}/add-note`),
      payload,
    ).then(({ data }) => data);
  },
  getOrderDetails(id) {
    return BaseApiServiceInstance.get(
      BaseApiServiceInstance.buildProtectedRequestPath(`api/v1/shipping-orders/${id}`),
    ).then(({ data }) => data);
  },
  uploadWireConfirmationDocuments(id, payload) {
    return BaseApiServiceInstance.post(
      BaseApiServiceInstance.buildProtectedRequestPath(`api/v1/shipping-orders/${id}/upload-wire-confirmation`),
      payload,
    ).then(({ data }) => data);
  },
  uploadBosDocuments(id, payload) {
    return BaseApiServiceInstance.post(
      BaseApiServiceInstance.buildProtectedRequestPath(`api/v1/shipping-orders/${id}/upload-bos`),
      payload,
    ).then(({ data }) => data);
  },
  updateConsignee(id, payload) {
    return BaseApiServiceInstance.post(
      BaseApiServiceInstance.buildProtectedRequestPath(`api/v1/shipping-orders/${id}/consignee`),
      payload,
    ).then(({ data }) => data);
  },
  uploadPicture(id, payload) {
    return BaseApiServiceInstance.post(
      BaseApiServiceInstance.buildProtectedRequestPath(`api/v1/shipping-orders/${id}/upload-picture`),
      payload,
    ).then(({ data }) => data);
  },
  deletePicture(orderId, pictureId) {
    return BaseApiServiceInstance.delete(
      BaseApiServiceInstance.buildProtectedRequestPath(`api/v1/shipping-orders/${orderId}/delete-picture/${pictureId}`),
    ).then(({ data }) => data);
  },
};

ShippingOrderService.CARGO_INSURANCE_RATE = 0.015;
ShippingOrderService.CARGO_INSURANCE_PERCENTAGE = (ShippingOrderService.CARGO_INSURANCE_RATE * 100).toFixed(1);
ShippingOrderService.CARGO_INSURANCE_LOWER_THRESHOLD = 75;

ShippingOrderService.CountryIdUS = 223;
ShippingOrderService.CountryCodeUS = 'US';
ShippingOrderService.CountryCodeCA = 'CA';
ShippingOrderService.CountryCodeMEX = 'MX';
ShippingOrderService.TypeDomestic = 'D';
ShippingOrderService.TypeInternational = 'I';
ShippingOrderService.TypeBorderCrossing = 'B';
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

ShippingOrderService.StateFullNameList = [
  { label: 'AL - Alabama', value: 'AL' },
  { label: 'AK - Alaska', value: 'AK' },
  { label: 'AP - American Samoa', value: 'AP' },
  { label: 'AZ - Arizona', value: 'AZ' },
  { label: 'AR - Arkansas', value: 'AR' },
  { label: 'CA - California', value: 'CA' },
  { label: 'CO - Colorado', value: 'CO' },
  { label: 'CT - Connecticut', value: 'CT' },
  { label: 'DE - Delaware', value: 'DE' },
  { label: 'DC - District of Columbia', value: 'DC' },
  { label: 'FL - Florida', value: 'FL' },
  { label: 'GA - Georgia', value: 'GA' },
  { label: 'GU - Guam', value: 'GU' },
  { label: 'HI - Hawaii', value: 'HI' },
  { label: 'ID - Idaho', value: 'ID' },
  { label: 'IL - Illinois', value: 'IL' },
  { label: 'IN - Indiana', value: 'IN' },
  { label: 'IA - Iowa', value: 'IA' },
  { label: 'KS - Kansas', value: 'KS' },
  { label: 'KY - Kentucky', value: 'KY' },
  { label: 'LA - Louisiana', value: 'LA' },
  { label: 'ME - Maine', value: 'ME' },
  { label: 'MD - Maryland', value: 'MD' },
  { label: 'MA - Massachusetts', value: 'MA' },
  { label: 'MI - Michigan', value: 'MI' },
  { label: 'MN - Minnesota', value: 'MN' },
  { label: 'MS - Mississippi', value: 'MS' },
  { label: 'MO - Missouri', value: 'MO' },
  { label: 'MT - Montana', value: 'MT' },
  { label: 'NE - Nebraska', value: 'NE' },
  { label: 'NV - Nevada', value: 'NV' },
  { label: 'NH - New Hampshire', value: 'NH' },
  { label: 'NJ - New Jersey', value: 'NJ' },
  { label: 'NM - New Mexico', value: 'NM' },
  { label: 'NY - New York', value: 'NY' },
  { label: 'NC - North Carolina', value: 'NC' },
  { label: 'ND - North Dakota', value: 'ND' },
  { label: 'MP - Northern Mariana Islands', value: 'MP' },
  { label: 'OH - Ohio', value: 'OH' },
  { label: 'OK - Oklahoma', value: 'OK' },
  { label: 'OR - Oregon', value: 'OR' },
  { label: 'PW - Palau', value: 'PW' },
  { label: 'PA - Pennsylvania', value: 'PA' },
  { label: 'PR - Puerto Rico', value: 'PR' },
  { label: 'RI - Rhode Island', value: 'RI' },
  { label: 'SC - South Carolina', value: 'SC' },
  { label: 'SD - South Dakota', value: 'SD' },
  { label: 'TN - Tennessee', value: 'TN' },
  { label: 'TX - Texas', value: 'TX' },
  { label: 'UT - Utah', value: 'UT' },
  { label: 'VT - Vermont', value: 'VT' },
  { label: 'VI - Virgin Islands', value: 'VI' },
  { label: 'VA - Virginia', value: 'VA' },
  { label: 'WA - Washington', value: 'WA' },
  { label: 'WV - West Virginia', value: 'WV' },
  { label: 'WI - Wisconsin', value: 'WI' },
  { label: 'WY - Wyoming', value: 'WY' },
];

ShippingOrderService.getShippingTypeByCountryCode = (iso2) => {
  if (iso2 && iso2 !== ShippingOrderService.CountryCodeUS) {
    if (iso2 === ShippingOrderService.CountryCodeCA) {
      return ShippingOrderService.TypeBorderCrossing;
    }

    return ShippingOrderService.TypeInternational;
  }

  return ShippingOrderService.TypeDomestic;
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

export default ShippingOrderService;
