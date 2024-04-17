import { useState, useEffect, useCallback } from 'react';
import get from 'lodash/get';
import MembershipService from 'frontend/js/api/MembershipService';

function useCustomerHelper(customer = window.customer || {}) {
  const [, updateState] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(customer && customer.id > 0);
  const id = get(customer, 'id', null);
  const firstName = get(customer, 'firstName', '');
  const lastName = get(customer, 'lastName', '');
  const fullName = [firstName, lastName].filter(Boolean).join(' ');
  const phoneNumber = get(customer, 'phoneNumber', '');
  const phoneNumberRaw = phoneNumber ? `+${phoneNumber.replace(/\D/g, '')}` : '';
  const email = get(customer, 'email', '');
  const city = get(customer, 'city', '');
  const countryId = get(customer, 'country.id', 0);
  const countryName = get(customer, 'country.name', '');
  const zip = get(customer, 'zip', '');
  const stateId = get(customer, 'state.id', 0);
  const stateName = get(customer, 'state.name', '');
  const stateCode = get(customer, 'state.code', '');
  const address = get(customer, 'address', '');
  const company = get(customer, 'company', '');
  const optionalNumber = get(customer, 'optionalNumber', '');
  const homeNumber = get(customer, 'homeNumber', '');
  const mailingAddress = get(customer, 'mailingAddress', '');
  const mailingApartment = get(customer, 'mailingApartment', '');
  const mailingAsPhysical = get(customer, 'mailingAsPhysical', '');
  const mailingCity = get(customer, 'mailingCity', '');
  const mailingName = get(customer, 'mailingName', '');
  const mailingPhone = get(customer, 'mailingPhone', '');
  const mailingStateId = get(customer, 'mailingState.id', 0);
  const mailingCountryId = get(customer, 'mailingCountry.id', 0);
  const mailingZip = get(customer, 'mailingZip', '');
  const autochargeServices = get(customer, 'metaInformation.autocharge_services', 0);
  const invoiceCompany = get(customer, 'metaInformation.invoice_company', 0);
  const token = get(customer, 'token', '');
  const balance = get(customer, 'balance', 0);
  const blAmount = get(customer, 'blAmount', 0);
  const blRemainingAmount = get(customer, 'blRemainingAmount', 0);
  const blUsedAmount = get(customer, 'blUsedAmount', 0);
  const currentBidsCount = get(customer, 'currentBidsCount', 0);
  const watchlistCurrentCnt = get(customer, 'watchlistCurrentCnt', 0);
  const wonBidsCount = get(customer, 'wonBidsCount', 0);
  const lotPurchasesCount = get(customer, 'lotPurchasesCount', 0);
  const shippingOrdersCount = get(customer, 'shippingOrdersCount', 0);
  const lotsWonCount = customer?.lotsWonCount || 0;
  const lostBidsCount = get(customer, 'lostBidsCount', 0);
  const customerParent = get(customer, 'customerParent', null);
  const brokerDisplayOnlyLotPurchase = get(customer, 'customerParent.displayOnlyLotPurchase', false);
  const shippingPreferredDestinationCountry = get(customer, 'shippingPreferredDestinationCountry', false);
  const brokerAllowToChooseSchedule = get(customer, 'customerParent.allowToChooseSchedule', false);
  const shippingPreferredDestination = get(customer, 'shippingPreferredDestination', false);
  const brokerShippingContainersCount = get(customer, 'brokerShippingContainersCount', 0);
  const isMandatoryShipping = get(customer, 'countryShippingMandatory', false);
  const membershipType = get(customer, 'membershipType', {});
  const biddingAmountLimit = get(customer, 'membershipType.biddingLimitAmount', null);
  const membershipAutoRenewal = get(customer, 'membershipAutoRenewal', false);
  const isB2BBroker = get(customer, 'b2BBroker', false);
  const membershipValidity = get(customer, 'membershipValidity');
  const bidder = get(customer, 'bidder');
  const scheduleA = get(customer, 'scheduleA');
  const scheduleA2C = get(customer, 'scheduleA2C');
  const userDocUploadDisabled = get(customer, 'userDocUploadDisabled', false);
  const userPadUploadDisabled = get(customer, 'userPadUploadDisabled', false);
  const autoShippingDisabled = get(customer, 'metaInformation.acp_shipping_disabled', null);
  const fbId = get(customer, 'fbId', null);
  const ggId = get(customer, 'ggId', null);
  const hasBillingAddressSet = Boolean(address && stateId && countryId);
  const isBusinessMembership = membershipType === MembershipService.LEVEL.BUSINESS;
  const customTransactionFeeMin = get(customer, 'metaInformation.custom_transaction_fee_min', null);
  const brokerAllowToSetFixedBP = customerParent?.allowToSetFixedBP || false;
  const brokerAllowToChangeTransactionFee = customerParent?.allowToChangeTransactionFee || false;
  const brokerAllowToAddTowingMarkup = customerParent?.allowToAddTowingMarkup || false;
  const billTransactionFeeToBrokerAdmin = customer?.billTransactionFeeToBrokerAdmin || false;
  const towingMarkup = customer?.towingMarkup || 0;
  const due = get(customer, 'due', '0.00');
  const notificationsCnt = customer?.notificationsCnt || 0;
  const acceptedTermsVersion = get(customer, 'acceptedTermsVersion', '');
  const needConfirmMailingAddress = get(customer, 'needConfirmMailingAddress', false);
  const activeCreditCardsCount = get(customer, 'activeCreditCardsCount', 0);
  const blAmountFixed = get(customer, 'blAmountFixed', false);
  const consignments = get(customer, 'consignments', []);

  const setCustomer = useCallback((newCustomer) => {
    window.customer = newCustomer;
    updateState({});

    window.Sentry?.configureScope((scope) => {
      scope.setUser({
        ...customer,
        ip_address: '{{auto}}',
      });
    });
  }, []);

  function initAuthentication() {
    const authenticated = customer && customer.id > 0;
    setIsAuthenticated(authenticated);
  }

  useEffect(() => {
    initAuthentication();
  }, [customer]);

  return {
    setCustomer,
    isAuthenticated,
    id,
    firstName,
    lastName,
    fullName,
    phoneNumberRaw,
    phoneNumber,
    email,
    city,
    countryId,
    countryName,
    zip,
    stateId,
    stateName,
    address,
    company,
    optionalNumber,
    homeNumber,
    mailingAddress,
    mailingApartment,
    mailingAsPhysical,
    mailingCity,
    mailingName,
    mailingPhone,
    mailingStateId,
    mailingZip,
    mailingCountryId,
    invoiceCompany,
    autochargeServices,
    token,
    stateCode,
    balance,
    blAmount,
    blAmountFixed,
    blRemainingAmount,
    blUsedAmount,
    watchlistCurrentCnt,
    currentBidsCount,
    wonBidsCount,
    lotPurchasesCount,
    shippingOrdersCount,
    lostBidsCount,
    lotsWonCount,
    customerParent,
    isMandatoryShipping,
    membershipType,
    isB2BBroker,
    membershipValidity,
    membershipAutoRenewal,
    bidder,
    scheduleA,
    scheduleA2C,
    userDocUploadDisabled,
    userPadUploadDisabled,
    autoShippingDisabled,
    brokerDisplayOnlyLotPurchase,
    shippingPreferredDestinationCountry,
    brokerAllowToChooseSchedule,
    shippingPreferredDestination,
    brokerShippingContainersCount,
    fbId,
    ggId,
    hasBillingAddressSet,
    isBusinessMembership,
    customTransactionFeeMin,
    biddingAmountLimit,
    brokerAllowToSetFixedBP,
    brokerAllowToChangeTransactionFee,
    billTransactionFeeToBrokerAdmin,
    brokerAllowToAddTowingMarkup,
    towingMarkup,
    due,
    notificationsCnt,
    acceptedTermsVersion,
    needConfirmMailingAddress,
    activeCreditCardsCount,
    consignments,
  };
}

export default useCustomerHelper;
