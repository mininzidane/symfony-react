import React, { useState, createContext, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import ShippingOrderService from 'backend/js/api/ShippingOrderService';
import LocationService from 'backend/js/api/LocationService';

const ShippingContext = createContext({});

const DEFAULT_SHIPPING_DETAILS = {
  firstName: '',
  lastName: '',
  phoneNumber: '',
  email: '',
  instructions: '',
  consignee: '',
};

const DEFAULT_DESTINATION = {
  country: {},
  state: {},
  countryDestination: {},
  usPort: {},
  address: '',
  city: '',
  zip: '',
};

const DEFAULT_ORIGIN = {
  vin: '',
  vinHash: '',
  zip: '',
  drivable: false,
};

function ShippingProvider({ customer, lot, triggerAutoUpdate, triggerAutoInit, children }) {
  const [shippingType, setShippingType] = useState(ShippingOrderService.TypeDomestic);
  const [origin, setOrigin] = useState(DEFAULT_ORIGIN);
  const [destination, setDestination] = useState(DEFAULT_DESTINATION);
  const [shippingDetails, setShippingDetails] = useState(DEFAULT_SHIPPING_DETAILS);
  const [shippingQuote, setShippingQuote] = useState(undefined);
  const [isCustomDestination, setIsCustomDestination] = useState(false);
  const [isQuoteInformationValid, setIsQuoteInformationValid] = useState(false);
  const [isQuoteValid, setIsQuoteValid] = useState(false);
  const locationService = new LocationService();

  function isDomestic() {
    return shippingType === ShippingOrderService.TypeDomestic;
  }

  function isBorderCrossing() {
    return shippingType === ShippingOrderService.TypeBorderCrossing;
  }

  function isInternational() {
    return shippingType === ShippingOrderService.TypeInternational;
  }

  async function getCountries() {
    return ShippingOrderService.getCountriesList();
  }

  async function getStatesByCountry(countryId) {
    return locationService.getStatesByCountry(countryId);
  }

  async function getDestinations(countryId) {
    return ShippingOrderService.getDestinationsList(countryId);
  }

  async function getPorts(destinationId) {
    const lat = get(lot, 'physicalLat');
    const lon = get(lot, 'physicalLng');
    return ShippingOrderService.getPortsList(destinationId, lat, lon);
  }

  async function getDefaultDestinationFromState(country, state) {
    if (!country) {
      return null;
    }

    try {
      const { id: countryId } = country;
      const responseStates = await getDestinations(countryId);
      if (state) {
        const matchedState = responseStates.find((responseState) => responseState.name === state.name);
        if (matchedState) {
          return matchedState;
        }
      }

      return responseStates[0] || {};
    } catch (e) {
      /** Ignore */
    }

    return null;
  }

  async function getDefaultPortFromCountryDestination(countryDestination, customerShippingType) {
    if (!countryDestination || customerShippingType !== ShippingOrderService.TypeInternational) {
      return null;
    }

    try {
      const { id: destinationId } = countryDestination;
      const responsePorts = await getPorts(destinationId);

      return responsePorts[0] || {};
    } catch (e) {
      /** Ignore */
    }

    return null;
  }

  async function updateDestinationFromCustomer(destinationCustomer, force = false) {
    if (!destinationCustomer || (isCustomDestination && !force)) {
      return;
    }

    const { country, state, address, city, zip, firstName, lastName, phoneNumber, email } = destinationCustomer;

    const { iso_2 } = country || {};
    const { code } = state || {};

    const updatedShippingType = ShippingOrderService.getShippingTypeByCountryCode(iso_2);
    let consignee = `${firstName} ${lastName}\n`;
    if (code && iso_2) {
      consignee += `${code}, ${iso_2}\n`;
    } else if (iso_2) {
      consignee += `${iso_2}\n`;
    }

    if (phoneNumber) {
      consignee += `${phoneNumber}\n`;
    }

    setShippingType(updatedShippingType);
    const newDetails = {
      ...shippingDetails,
      firstName,
      lastName,
      phoneNumber,
      email,
      consignee,
    };

    setShippingDetails(newDetails);

    const newDestination = {
      ...destination,
      country,
      state,
      address,
      city,
      zip,
    };

    if (triggerAutoInit && updatedShippingType !== ShippingOrderService.TypeDomestic) {
      const countryDestination = await getDefaultDestinationFromState(country, state);
      const usPort = await getDefaultPortFromCountryDestination(countryDestination, updatedShippingType);
      newDestination.countryDestination = countryDestination || {};
      newDestination.usPort = usPort || {};
    }

    setDestination(newDestination);
    setIsCustomDestination(false);
  }

  function updateOriginFromLot(originLot) {
    const { vin, vinHash, drivable = false, physicalZip } = originLot;
    const newOrigin = {
      drivable,
      vin,
      vinHash,
      zip: physicalZip,
    };

    setOrigin(newOrigin);
  }

  function updateDestination(destinationPayload = {}) {
    const { country, state = {}, countryDestination = {}, usPort = {}, address, city, zip } = destinationPayload;
    if (!country || !country.id) {
      return;
    }

    const { iso_2 } = country;
    const destinationShippingType = ShippingOrderService.getShippingTypeByCountryCode(iso_2);
    setShippingType(destinationShippingType);

    const newDestination = {
      ...DEFAULT_DESTINATION,
      country,
      state,
      countryDestination,
      usPort,
      address,
      city,
      zip,
    };

    setDestination(newDestination);
    setIsCustomDestination(true);
  }

  function getOriginQuoteParams() {
    const { vin, vinHash, drivable = false, zip } = origin;
    const params = {
      drivable,
      origin_zip: zip,
    };

    if (vinHash) {
      return {
        vin_hash: vinHash,
        ...params,
      };
    }

    return {
      vin,
      ...params,
    };
  }

  function getDomesticQuoteParams() {
    return {
      type: ShippingOrderService.TypeDomestic,
      destination_zip: destination.zip,
    };
  }

  function getBorderCrossingQuoteParams() {
    const { countryDestination } = destination;

    return {
      type: ShippingOrderService.TypeBorderCrossing,
      destination: countryDestination && countryDestination.id,
    };
  }

  function getInternationalQuoteParams() {
    const { country = {}, countryDestination, usPort } = destination;
    let params;
    if (countryDestination && usPort) {
      params = {
        type: ShippingOrderService.TypeInternational,
        destination: countryDestination.id,
        us_port: usPort.id,
      };
    } else {
      params = {
        type: ShippingOrderService.TypeInternational,
        destination_country: country.id,
      };
    }

    if (ShippingOrderService.getQuoteTokenByCountry(country?.id)) {
      params.token = ShippingOrderService.getQuoteTokenByCountry(country?.id);
    }

    return params;
  }

  function getQuoteParams() {
    let orderParams = {};
    const lotParams = getOriginQuoteParams();

    if (isDomestic()) {
      orderParams = getDomesticQuoteParams();
    } else if (isBorderCrossing()) {
      orderParams = getBorderCrossingQuoteParams();
    } else if (isInternational()) {
      orderParams = getInternationalQuoteParams();
    }

    return {
      ...orderParams,
      ...lotParams,
    };
  }

  function getLotOrderParams() {
    const { id } = lot;

    return {
      lot: id,
    };
  }

  function getQuotePreorderParams() {
    return {
      quote: shippingQuote,
    };
  }

  function getDomesticPreorderParams() {
    const { address, city, state, zip } = destination;
    const { firstName, lastName, phoneNumber, email, instructions } = shippingDetails;

    return {
      shippingType: ShippingOrderService.TypeDomestic,
      address,
      city,
      state: state && state.code,
      zip,
      destination_contact_name: `${firstName} ${lastName}`,
      phone: phoneNumber,
      email,
      instructions,
    };
  }

  function getBorderCrossingPreorderParams() {
    const { country } = destination;
    const { firstName, lastName, phoneNumber, email, instructions } = shippingDetails;
    const { destination: quoteDestination = {} } = shippingQuote;

    return {
      shippingType: ShippingOrderService.TypeBorderCrossing,
      country: country && country.id,
      destination: quoteDestination,
      destination_contact_name: `${firstName} ${lastName}`,
      phone: phoneNumber,
      email,
      instructions,
    };
  }

  function getInternationalPreorderParams() {
    const { country } = destination;
    const { consignee, instructions } = shippingDetails;
    const { us_port = {}, destination: quoteDestination = {} } = shippingQuote;

    return {
      shippingType: ShippingOrderService.TypeInternational,
      country: country && country.id,
      destination: quoteDestination,
      us_port,
      consignee,
      instructions,
    };
  }

  function getPreorderParams() {
    const lotParams = getLotOrderParams();
    const quoteParams = getQuotePreorderParams();
    let orderParams = {};

    if (isDomestic()) {
      orderParams = getDomesticPreorderParams();
    } else if (isBorderCrossing()) {
      orderParams = getBorderCrossingPreorderParams();
    } else if (isInternational()) {
      orderParams = getInternationalPreorderParams();
    }

    return {
      ...orderParams,
      ...lotParams,
      ...quoteParams,
    };
  }

  function getShipToLabel() {
    if (shippingType === ShippingOrderService.TypeDomestic) {
      const { city, state, zip, address } = destination;
      if (address && city && state && zip) {
        return `${address}, ${city}, ${state.code} ${zip}`;
      }
    }

    if (shippingType !== ShippingOrderService.TypeDomestic) {
      const { country, countryDestination } = destination;
      if (country && country.id) {
        if (countryDestination && countryDestination.name) {
          return `${countryDestination.name}, ${country.name}`;
        }

        return country.name;
      }
    }

    return 'Not Set';
  }

  function validateQuote() {
    return Boolean(shippingQuote && shippingQuote.quote && shippingQuote.quote.ref_id);
  }

  function validateQuoteParams() {
    const params = getQuoteParams();
    if (shippingType === ShippingOrderService.TypeDomestic) {
      const { type, vin, vin_hash, origin_zip, destination_zip } = params;

      return Boolean(type && (vin || vin_hash) && origin_zip && destination_zip);
    }

    if (shippingType === ShippingOrderService.TypeBorderCrossing) {
      const { type, vin, vin_hash, origin_zip, destination: shippingDestination } = params;

      return Boolean(type && (vin || vin_hash) && origin_zip && shippingDestination);
    }

    if (shippingType === ShippingOrderService.TypeInternational) {
      const {
        type,
        vin,
        vin_hash,
        origin_zip,
        destination_country,
        us_port,
        destination: shippingDestination,
      } = params;

      return Boolean(
        type && (vin || vin_hash) && origin_zip && (destination_country || (shippingDestination && us_port)),
      );
    }

    return false;
  }

  function validatePreorderParams() {
    const params = getPreorderParams();
    if (isDomestic()) {
      const {
        shippingType: typeParam,
        lot: lotParam,
        address,
        city,
        state: domesticState,
        zip,
        destination_contact_name,
        phone,
      } = params;

      return Boolean(
        typeParam && lotParam && address && city && domesticState && zip && destination_contact_name && phone,
      );
    }

    if (isBorderCrossing()) {
      const { shippingType: typeParam, lot: lotParam, country, destination: shippingDestination = {} } = params;
      return Boolean(typeParam && lotParam && country && shippingDestination.id);
    }

    if (isInternational()) {
      const {
        shippingType: typeParam,
        lot: lotParam,
        country,
        destination: shippingDestination = {},
        us_port = {},
        consignee,
      } = params;
      return Boolean(typeParam && lotParam && country && shippingDestination.id && us_port.id && consignee);
    }

    return false;
  }

  async function triggerQuoteUpdate() {
    try {
      const quoteParams = getQuoteParams();
      const quote = await ShippingOrderService.getQuote(quoteParams);
      setShippingQuote(quote);
    } catch (e) {
      setShippingQuote(undefined);
    }
  }

  useEffect(() => {
    updateDestinationFromCustomer(customer);
  }, [customer]);

  useEffect(() => {
    updateOriginFromLot(lot);
  }, [lot]);

  useEffect(() => {
    setIsQuoteInformationValid(validateQuoteParams());
  }, [origin, destination]);

  useEffect(() => {
    if (triggerAutoUpdate) {
      triggerQuoteUpdate();
    }
  }, [isQuoteInformationValid]);

  useEffect(() => {
    setIsQuoteValid(validateQuote());
  }, [shippingQuote]);

  return (
    <ShippingContext.Provider
      value={{
        customer,
        lot,
        shippingType,
        shippingDetails,
        origin,
        destination,
        shippingQuote,
        isQuoteInformationValid,
        isQuoteValid,
        getCountries,
        getDestinations,
        getPorts,
        getStatesByCountry,
        updateDestination,
        updateOriginFromLot,
        getShipToLabel,
        triggerQuoteUpdate,
        getPreorderParams,
        validatePreorderParams,
      }}
    >
      {children}
    </ShippingContext.Provider>
  );
}

ShippingProvider.propTypes = {
  children: PropTypes.node.isRequired,
  customer: PropTypes.object,
  lot: PropTypes.object,
  triggerAutoUpdate: PropTypes.bool,
  triggerAutoInit: PropTypes.bool,
};

ShippingProvider.defaultProps = {
  customer: {},
  lot: {},
  triggerAutoUpdate: false,
  triggerAutoInit: false,
};

function useShippingContext() {
  return useContext(ShippingContext);
}

export { ShippingProvider, useShippingContext };
