import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import ShippingOrderService from 'frontend/js/api/ShippingOrderService';
import CountryService from 'frontend/js/api/CountryService';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import BootstrapService from 'frontend/js/api/BootstrapService';
import ShippingQuoteContext from './ShippingQuoteContext';

const defaultState = {
  shippingType: ShippingOrderService.TypeDomestic,
  shippingCountryId: ShippingOrderService.usCountryObj.id,
  shippingStateCode: null,
  shippingAddress: null,
  shippingCity: null,
  shippingZip: null,
  shippingDestinationId: null,
  shippingFirstName: '',
  shippingLastName: '',
  shippingPhoneNumber: '',
  shippingEmail: '',
  shippingInstructions: '',
  shippingConsignee: '',
  shippingQuote: null,
  requiresCustomQuote: false,
  quoteInformationIsDirty: false,
  customerDataInited: false,
};

const UPDATE_SHIPPING_INFORMATION = 'UPDATE_SHIPPING_INFORMATION';
const UPDATE_SHIPPING_QUOTE = 'UPDATE_SHIPPING_QUOTE';
const shippingQuoteReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_SHIPPING_INFORMATION:
      return {
        ...state,
        ...action.payload,
      };
    case UPDATE_SHIPPING_QUOTE:
      return {
        ...state,
        ...action.payload,
        quoteInformationIsDirty: false,
      };
    default:
      return state;
  }
};

const ShippingQuoteContextProvider = ({ children, values }) => {
  const [state, dispatch] = useReducer(shippingQuoteReducer, { ...defaultState, ...values });

  async function initShippingFromCustomer(customer, dirty = true) {
    if (!customer) {
      return {};
    }

    const {
      country = {},
      state: customerState = {},
      address,
      city,
      zip,
      firstName,
      lastName,
      phoneNumber,
      email,
    } = customer;

    const { id: iso_2 } = country || {};
    const { code: stateCode } = customerState || {};

    const shippingCountryId = BootstrapService.getShippingPreferredDestinationCountry();
    const shippingDestinationId = BootstrapService.getShippingPreferredDestination();

    const shippingType = ShippingOrderService.getShippingTypeByCountryId(shippingCountryId);
    let consignee = `${firstName} ${lastName}\n`;
    if (stateCode && iso_2) {
      consignee += `${stateCode}, ${iso_2}\n`;
    } else if (iso_2) {
      consignee += `${iso_2}\n`;
    }

    if (phoneNumber) {
      consignee += `${phoneNumber}\n`;
    }

    const payload = {
      shippingType,
      shippingAddress: address,
      shippingCountryId,
      shippingDestinationId,
      shippingStateCode: stateCode,
      shippingCity: city,
      shippingZip: zip,
      shippingFirstName: firstName,
      shippingLastName: lastName,
      shippingPhoneNumber: phoneNumber,
      shippingEmail: email,
      shippingConsignee: consignee,
      quoteInformationIsDirty: dirty,
      customerDataInited: true,
    };

    return dispatch({ type: UPDATE_SHIPPING_INFORMATION, payload });
  }

  function isDomestic() {
    const { shippingType } = state;
    return shippingType === ShippingOrderService.TypeDomestic;
  }

  function isBorderCrossing() {
    const { shippingType } = state;
    return shippingType === ShippingOrderService.TypeBorderCrossing;
  }

  function isInternational() {
    const { shippingType } = state;
    return shippingType === ShippingOrderService.TypeInternational;
  }

  function getLotQuoteParams(lot = {}) {
    const { vin, vinHash, drivable = false, physicalZip } = lot;
    const params = {
      drivable,
      origin_zip: physicalZip,
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
      destination_zip: state.shippingZip,
    };
  }

  function getBorderCrossingQuoteParams() {
    return {
      type: ShippingOrderService.TypeBorderCrossing,
      destination: state.shippingDestinationId,
    };
  }

  function getInternationalQuoteParams() {
    let params = {};

    if (state.shippingDestinationId) {
      params = {
        type: ShippingOrderService.TypeInternational,
        destination: state.shippingDestinationId,
      };
    } else {
      params = {
        type: ShippingOrderService.TypeInternational,
        destination_country: state.shippingCountryId,
      };
    }

    if (ShippingOrderService.getQuoteTokenByCountry(state.shippingCountryId)) {
      params.token = ShippingOrderService.getQuoteTokenByCountry(state.shippingCountryId);
    }

    return params;
  }

  function getQuoteParams(lot) {
    let orderParams = {};
    const lotParams = getLotQuoteParams(lot);

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

  function hasValidQuoteParams(lot) {
    const params = getQuoteParams(lot);
    return ShippingOrderService.areQuoteParamsValid(params);
  }

  function getLotOrderParams(lot = {}) {
    const { id, inventoryAuction } = lot;

    return {
      lot: id,
      auction: inventoryAuction,
    };
  }

  function getQuotePreorderParams() {
    const { shippingQuote } = state;
    return {
      quote: shippingQuote,
    };
  }

  function getDomesticPreorderParams() {
    const {
      shippingAddress,
      shippingCity,
      shippingStateCode,
      shippingZip,
      shippingFirstName,
      shippingLastName,
      shippingPhoneNumber,
      shippingEmail,
      shippingInstructions,
    } = state;
    return {
      shippingType: ShippingOrderService.TypeDomestic,
      address: shippingAddress,
      city: shippingCity,
      state: shippingStateCode,
      zip: shippingZip,
      destination_contact_name: `${shippingFirstName} ${shippingLastName}`,
      phone: shippingPhoneNumber,
      email: shippingEmail,
      instructions: shippingInstructions,
    };
  }

  function getBorderCrossingPreorderParams() {
    const {
      shippingCountryId,
      shippingFirstName,
      shippingLastName,
      shippingPhoneNumber,
      shippingEmail,
      shippingInstructions,
      shippingQuote = {},
    } = state;
    const { destination = {} } = shippingQuote;

    return {
      shippingType: ShippingOrderService.TypeBorderCrossing,
      country: shippingCountryId,
      destination,
      destination_contact_name: `${shippingFirstName} ${shippingLastName}`,
      phone: shippingPhoneNumber,
      email: shippingEmail,
      instructions: shippingInstructions,
    };
  }

  function getInternationalPreorderParams() {
    const { shippingQuote, shippingCountryId, shippingConsignee, shippingInstructions } = state;
    const { us_port = {}, destination = {} } = shippingQuote;

    return {
      shippingType: ShippingOrderService.TypeInternational,
      country: shippingCountryId,
      destination,
      us_port,
      consignee: shippingConsignee,
      instructions: shippingInstructions,
    };
  }

  function getPreorderParams(lot) {
    const lotParams = getLotOrderParams(lot);
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

  function hasValidPreorderParams(lot) {
    const params = getPreorderParams(lot);
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
      const { shippingType: typeParam, lot: lotParam, country, destination = {} } = params;
      return Boolean(typeParam && lotParam && country && destination.id);
    }

    if (isInternational()) {
      const { shippingType: typeParam, lot: lotParam, country, destination = {}, us_port = {}, consignee } = params;
      return Boolean(typeParam && lotParam && country && destination.id && us_port.id && consignee);
    }

    return false;
  }

  function getCustomQuoteLotParams(lot) {
    const { id, vin, vinHash, drivable = false, location = {}, physicalZip } = lot;

    const params = {
      drivable,
      location: location.id,
      auction: 1,
      lot_number: id,
      origin_zip: physicalZip,
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

  function getDomesticCustomQuoteParams() {
    const { shippingZip } = state;
    return {
      type: ShippingOrderService.TypeDomestic,
      destination_zip: shippingZip,
    };
  }

  function getBorderCrossingCustomQuoteParams() {
    const { shippingDestinationId } = state;
    return {
      type: ShippingOrderService.TypeBorderCrossing,
      destination: shippingDestinationId,
    };
  }

  function getInternationalCustomQuoteParams() {
    const { shippingDestinationId } = state;
    return {
      type: ShippingOrderService.TypeInternational,
      destination: shippingDestinationId,
    };
  }

  function getCustomQuoteParams(lot) {
    const { shippingEmail, shippingPhoneNumber, shippingInstructions } = state;
    const lotParams = getCustomQuoteLotParams(lot);
    let orderParams = {};

    if (isDomestic()) {
      orderParams = getDomesticCustomQuoteParams();
    } else if (isBorderCrossing()) {
      orderParams = getBorderCrossingCustomQuoteParams();
    } else if (isInternational()) {
      orderParams = getInternationalCustomQuoteParams();
    }

    return {
      ...lotParams,
      ...orderParams,
      email: shippingEmail,
      phone_number: shippingPhoneNumber,
      comments: shippingInstructions,
    };
  }

  function hasValidCustomQuoteParams(lot) {
    const params = getCustomQuoteParams(lot);

    if (isDomestic()) {
      const {
        vin,
        origin_zip,
        lot_number,
        email,
        phone_number,
        destination_zip,
        address,
        city,
        state: shippingState,
      } = params;
      return Boolean(
        vin && origin_zip && lot_number && email && phone_number && destination_zip && address && city && shippingState,
      );
    }

    if (isBorderCrossing()) {
      const { vin, origin_zip, lot_number, email, phone_number, destination } = params;

      return Boolean(vin && origin_zip && lot_number && email && phone_number && destination);
    }

    if (isInternational()) {
      const { vin, origin_zip, lot_number, email, phone_number, country, destination } = params;
      return Boolean(vin && origin_zip && lot_number && email && phone_number && country && destination);
    }

    return false;
  }

  async function updateShippingInformation(params = {}, dirty = true) {
    const {
      countryId: shippingCountryId,
      destinationId: shippingDestinationId,
      firstName,
      lastName,
      phoneNumber,
      email,
      address,
      city: shippingCity,
      stateCode: shippingStateCode,
      zip: shippingZip,
      comment: shippingInstructions,
      consignee,
    } = params;

    const shippingType = ShippingOrderService.getShippingTypeByCountryId(shippingCountryId);
    const {
      shippingType: currentShippingType,
      shippingAddress: currentShippingAddress,
      shippingPhoneNumber: currentShippingPhoneNumber,
      shippingEmail: currentShippingEmail,
    } = state;

    let payload = {
      ...(currentShippingType !== shippingType && defaultState),
      shippingType,
      shippingCountryId,
      shippingDestinationId,
      shippingInstructions,
      shippingPhoneNumber: phoneNumber || currentShippingPhoneNumber,
      shippingEmail: email || currentShippingEmail,
      quoteInformationIsDirty: dirty,
    };

    if (
      shippingType === ShippingOrderService.TypeDomestic ||
      shippingType === ShippingOrderService.TypeBorderCrossing
    ) {
      payload = {
        ...payload,
        shippingFirstName: firstName,
        shippingLastName: lastName,
      };
    }

    if (shippingType === ShippingOrderService.TypeDomestic) {
      let shippingAddress = currentShippingAddress;
      if (address) {
        if (typeof address === 'object' && address.address) {
          shippingAddress = address.address;
        } else if (typeof address === 'string') {
          shippingAddress = address;
        }
      }

      payload = {
        ...payload,
        shippingAddress,
        shippingCity,
        shippingStateCode,
        shippingZip,
      };
    }

    if (shippingType === ShippingOrderService.TypeInternational) {
      payload.shippingConsignee = consignee;
    }

    return dispatch({ type: UPDATE_SHIPPING_INFORMATION, payload });
  }

  async function updateShippingQuote(shippingQuote) {
    const payload = {
      shippingQuote: null,
      requiresCustomQuote: false,
    };

    try {
      const {
        quote: { total },
        destination,
      } = shippingQuote;
      if (!total) {
        payload.requiresCustomQuote = true;
      } else {
        shippingQuote.quote.total += window.customer ? window.customer.towingMarkup : 0;
        payload.shippingQuote = shippingQuote;
      }

      if (destination && destination.id) {
        payload.shippingDestinationId = destination.id;
      }
    } catch (e) {
      payload.requiresCustomQuote = true;
    }

    return dispatch({ type: UPDATE_SHIPPING_QUOTE, payload });
  }

  function updateFromShippingOrder(shippingOrder) {
    if (!shippingOrder) {
      return;
    }

    const { orderInformation } = shippingOrder;
    const { quote } = orderInformation;
    const payload = {
      ...orderInformation,
      comment: get(orderInformation, 'instructions', ''),
      countryId: get(orderInformation, 'country.id', ShippingOrderService.usCountryObj.id),
      destinationId: get(quote, 'destination.id'),
      stateCode: get(orderInformation, 'state'),
    };
    updateShippingInformation(payload, false);
    updateShippingQuote(quote);
  }

  function getState() {
    return { ...state };
  }

  const { countryId: customerCountryId, autoShippingDisabled } = useCustomerHelper();
  function isState2StateShipping(lot) {
    const { StateCA, StateTX, StateMO, StateKS, StateWI } = ShippingOrderService;
    const { shippingStateCode } = state;
    const isStateListed = [StateCA, StateTX, StateMO, StateKS, StateWI].includes(shippingStateCode);
    const isUsaCustomer = customerCountryId === CountryService.COUNTRIES.usa.code;
    const lotLocationStateCode = lot.location && lot.location.stateCode;
    const hasStateCodes = shippingStateCode && lotLocationStateCode;

    return Boolean(
      !autoShippingDisabled &&
        isUsaCustomer &&
        isStateListed &&
        hasStateCodes &&
        shippingStateCode === lotLocationStateCode,
    );
  }

  function markAsDirty() {
    return dispatch({
      type: UPDATE_SHIPPING_INFORMATION,
      payload: {
        quoteInformationIsDirty: true,
      },
    });
  }

  const shippingValues = {
    ...state,
    isDomestic,
    isBorderCrossing,
    isInternational,
    initShippingFromCustomer,
    getQuoteParams,
    getPreorderParams,
    updateShippingInformation,
    hasValidQuoteParams,
    hasValidPreorderParams,
    hasValidCustomQuoteParams,
    getCustomQuoteParams,
    updateShippingQuote,
    updateFromShippingOrder,
    getState,
    markAsDirty,
    isState2StateShipping,
  };

  return <ShippingQuoteContext.Provider value={shippingValues}>{children}</ShippingQuoteContext.Provider>;
};

ShippingQuoteContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
  values: PropTypes.shape({}),
};

ShippingQuoteContextProvider.defaultProps = {
  values: {},
};

export default ShippingQuoteContextProvider;
