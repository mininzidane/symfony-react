import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Collapse } from '@material-ui/core';
import { useQueryClient } from 'react-query';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import useIntl from 'frontend/js/hooks/useIntl';
import LotStatusStates from 'frontend/js/views/LotViewPage/_Shared/LotStatusStates';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import LotShape from 'frontend/js/lib/propshapes/LotShape';
import CustomerShape from 'frontend/js/lib/propshapes/CustomerShape';
import LotService from 'frontend/js/api/LotService';
import BidService from 'frontend/js/api/BidService';
import ShippingOrderService from 'frontend/js/api/ShippingOrderService';
import StringService from 'frontend/js/lib/utils/StringService';
import LocalStorageService from 'frontend/js/lib/utils/LocalStorageService';
import SpinnerWheel from 'frontend/js/components/SpinnerWheel';
import SuspenseWrap from 'frontend/js/components/Suspense/Wrap';
import Fade from 'frontend/js/components/Fade';
import CustomerService from 'frontend/js/api/CustomerService';
import CompanyService from 'frontend/js/api/CompanyService';
import ShippingQuoteContext from 'frontend/js/context/ShippingQuoteContext/ShippingQuoteContext';
import useBidDelta from 'frontend/js/hooks/useBidDelta';
import BuyerPowerService from 'frontend/js/api/BuyerPowerService';
import MembershipService from 'frontend/js/api/MembershipService';
import ViewportService from 'frontend/js/lib/utils/ViewportService';
import useLoadPreorder from 'frontend/js/hooks/useLoadPreorder';
import VehiclePrice from 'frontend/js/views/LotViewPage/VehiclePrice';
import Card from '../LotPageCard';
import CardIndentedContent from '../LotPageCard/CardIndentedContent';
import LotPageBlock from '../LotPageBlock';
import getBidStatusKey from './StatusBadge/getBidStatusKey';
import StatusValues from './StatusValues';
import WonState from './Sections/WonState';
import LiveState from './Sections/LiveState';
import ConfirmationNotification from './Sections/ConfirmationNotification';
import FeesDescription from './Sections/FeesDescription';
import AsIsDisclaimer from './AsIsDisclaimer';
import BidNow from './Sections/BidNow';
import BuyItNowCard from './BuyItNowCard';
import PendingState from './Sections/PendingState';
import UploadIdState from './Sections/UploadIdState';
import InvalidIncrementState from './Sections/InvalidIncrementState';
import ConfirmationActions from './Sections/ConfirmationActions';
import BuyerPowerIncrease from './Sections/BuyerPowerIncrease';
import NoBidBlockedStateNotification from './Sections/NoBidBlockedStateNotification';
import OwnershipDocsBlockedState from './Sections/OwnershipDocsBlockedState';
import ServerResponseState from './Sections/ServerResponseState';
import ShippingPreorder from './Sections/ShippingPreorder';
import CounterBidNotification from './Sections/CounterBidNotification';
import CounterBidForm from './Sections/CounterBidForm';
import MistypedBidForm from './Sections/MistypedBidForm';
import HighBidderNotification from './Sections/HighBidderNotification';
import CardTitle from './CardTitle';
import MembershipUpgradeRequired from './Sections/MembershipUpgradeRequired';
import UpcomingState from './UpcomingState';
import useStyles from './useStyles';

const BiddingTipsModal = React.lazy(() => import('./BiddingTipsModal'));
const Ca2CaModal = React.lazy(() => import('./Ca2CaModal'));
const Fl2FlModal = React.lazy(() => import('./Fl2FlModal'));
const PhoneNumberFormModal = React.lazy(() => import('frontend/js/views/Shared/PhoneNumberFormModal'));
const FinishRegistrationFormModal = React.lazy(() => import('frontend/js/views/Shared/FinishRegistrationFormModal'));

function BidInformation({ lot, customer, onCustomerUpdate }) {
  const SLIDE_ANIMATION_DURATION = 300;
  const LOT_CONFIRMATION_KEY = 'ABM::ConfirmationState';
  const BIDDING_TIPS_DISABLED_KEY = 'Abm::BiddingTipsDisabled';
  const { htmlDecode } = StringService;
  const {
    id: lotId,
    suggestedBid,
    suggestedOffer,
    currentBid,
    startingBid,
    makeAnOffer,
    buyItNow,
    currency,
    bidStatus: currentBidStatus,
    currentCustomerBid: lotCustomerBid,
    minimumBid,
    fl2Fl: isFl2Fl = false,
    ca2CaPhysicalLocation: isCa2Ca = false,
    status = 1,
    inventoryAuction,
    currencyFeeFormat,
    FAKE,
    blockedUpcomingBid,
  } = lot;

  const isAbmInventory = inventoryAuction === LotService.AUCTION_ABM;

  if (blockedUpcomingBid) {
    return <UpcomingState lot={lot} />;
  }

  const HIGH_BIDDER_STATUS_KEY = 'high_bidder';
  const classes = useStyles();
  const intl = useIntl();
  const { isBelowSm } = useBreakpoint();
  const [isPending, setIsPending] = useState(false);
  const [isBidInfoReceived, setBidInfoReceived] = useState(false);
  const [lotState, setLotState] = useState(null);
  const [formType, setFormType] = useState(LotStatusStates.FORM_PRELIMINARY_BID);
  const [bidStatus, setBidStatus] = useState(htmlDecode(currentBidStatus));
  const [maxBid, setMaxBid] = useState(suggestedBid);
  const [customerBid, setCustomerBid] = useState(lotCustomerBid);
  const [counterBid, setCounterBid] = useState(suggestedBid || 0);
  const [startBid, setStartBid] = useState(startingBid);
  const [bidType, setBidType] = useState(BidService.BID_TYPES.MAX_BID);
  const [oneMoreIncrement, setOneMoreIncrement] = useState(false);
  const [isStartBidAvailable, setIsStartBidAvailable] = useState(false);
  const [bidInputTouched, setBidInputTouched] = useState(false);
  const [offer, setOffer] = useState(suggestedOffer || 0);
  const [fees, setFees] = useState({});
  const [bpDepositNeeded, setBpDepositNeeded] = useState(0);
  const [bpAmountNeeded, setBpAmountNeeded] = useState(0);
  const [bpAttemptedAmount, setBpAttemptedAmount] = useState(0);
  const [serverResponse, setServerResponse] = useState(undefined);
  const [lotPurchase, setLotPurchase] = useState(undefined);
  const [stateTermsModalOpen, setStateTermsModalOpen] = useState(false);
  const [stateTermsAccepted, setStateTermsAccepted] = useState(false);
  const [stateTermsCb, setStateTermsCb] = useState(false);
  const [initValidateState, setInitValidateState] = useState(undefined);
  const maxBidDelta = useBidDelta(maxBid, inventoryAuction);
  const [shippingCountries, setShippingCountries] = useState([]);
  const [customQuoteSent, setCustomQuoteSent] = useState(false);
  const [maxBidUpdateDispatchTimeout, setMaxBidUpdateDispatchTimeout] = useState(1000);
  const [isState2StateAccepted, setIsState2StateAccepted] = useState(true);
  const { preorder, handlePreorderUpdate } = useLoadPreorder(lotId, lot.inventoryAuction);
  const {
    isAuthenticated,
    fbId,
    ggId,
    isMandatoryShipping,
    autoShippingDisabled,
    shippingPreferredDestination,
    lotsWonCount,
  } = useCustomerHelper(customer);
  const isRegisteredThroughSocialMedia = Boolean(fbId || ggId);

  const [isPreorderEnabled, setIsPreorderEnabled] = useState(autoShippingDisabled !== true);
  const [isPreorderAvailable, setIsPreorderAvailable] = useState(
    !isMandatoryShipping || Boolean(shippingPreferredDestination),
  );
  const [phoneNumberModalOpen, setPhoneNumberModalOpen] = useState(false);
  const [isFinishRegistrationModalOpen, setIsFinishRegistrationModalOpen] = useState(false);
  const [modalSubmitSuccessType, setModalSubmitSuccessType] = useState(null);
  const [biddingTipsModalOpen, setBiddingTipsModalOpen] = useState(false);
  const [isMaoWithBidIncluded, setIsMaoWithBidIncluded] = useState(true);

  const queryClient = useQueryClient();
  const isMistypedBidAvailable =
    !isStartBidAvailable &&
    BidService.STATUS_HIGH_BIDDER === bidStatus &&
    lotCustomerBid &&
    lotCustomerBid.maxBid > currentBid &&
    inventoryAuction !== LotService.AUCTION_IAA;

  const {
    initShippingFromCustomer,
    updateShippingQuote,
    getQuoteParams,
    getPreorderParams,
    hasValidPreorderParams,
    requiresCustomQuote,
    hasValidCustomQuoteParams,
    getCustomQuoteParams,
    isState2StateShipping: isS2Sshipping,
  } = useContext(ShippingQuoteContext);

  const bidService = new BidService();
  const isState2StateShipping = isS2Sshipping(lot);
  const isState2StatePreorder = isState2StateShipping && isPreorderAvailable;

  let isGuestMembership;

  if (isAuthenticated) {
    isGuestMembership = customer.membershipType.level === MembershipService.LEVEL.GUEST;
  }

  const translationSets = {
    ifFinalBidIs: intl.formatMessage({ id: 'shared.fee.ifFinalBidIs' }),
    ctaConfirmBid: intl.formatMessage({ id: 'lotPage.cta.confirmBid' }),
    labelOffer: intl.formatMessage({ id: 'lotPage.label.offer' }),
    ctaConfirmOffer: intl.formatMessage({ id: 'lotPage.cta.confirmOffer' }),
    labelBINPrice: intl.formatMessage({ id: 'lotPage.label.BINPrice' }),
    ctaConfirmPurchase: intl.formatMessage({ id: 'lotPage.cta.confirmPurchase' }),
    serverErrorTitle: intl.formatMessage({ id: 'lotPage.bid.serverErrorTitle' }),
    serverErrorBody: intl.formatMessage(
      { id: 'lotPage.bid.serverErrorBody' },
      {
        EmailLink: <a href={CompanyService.email.href}>{CompanyService.email.raw.toLowerCase()}</a>,
      },
    ),
  };

  function onRequestLogin() {
    window.dispatchEvent(new CustomEvent('openAuthModal'));
  }

  function saveConfirmStateToStorage(validateCallback) {
    const storage = {
      lotId,
      maxBid,
      counterBid,
      startBid,
      offer,
      validateCallback,
    };

    LocalStorageService.set(LOT_CONFIRMATION_KEY, storage);
  }

  function deleteConfirmStateFromStorage() {
    LocalStorageService.delete(LOT_CONFIRMATION_KEY);
  }

  function handleMaxBidChange(value) {
    setMaxBid(value);
  }

  function handleBidInputFocus() {
    setBidInputTouched(true);
  }

  function validateCurrentBidAmount() {
    return maxBid > currentBid && maxBid > 0;
  }

  function validateOfferAmount() {
    return makeAnOffer && suggestedOffer && offer >= suggestedOffer;
  }

  function validateIncrementAmount() {
    const { increment, decrement } = maxBidDelta;

    return maxBid % increment === 0 || maxBid % decrement === 0;
  }

  function validateCustomerId() {
    const { userDocUploadDisabled, identityDocumentCount } = customer;
    if (userDocUploadDisabled) {
      return true;
    }

    return identityDocumentCount > 0;
  }

  function validateCustomerBuyerPower(amount = 0) {
    const { blRemainingAmount } = customer;
    let adjustedBlRemainingAmount = blRemainingAmount;
    if (
      currentBid &&
      (currentBidStatus === BidService.STATUS_HIGH_BIDDER || BidService.COUNTER_BID_STATUSES.includes(currentBidStatus))
    ) {
      adjustedBlRemainingAmount = blRemainingAmount + currentBid;
    }

    setBpDepositNeeded(0);
    setBpAmountNeeded(0);
    setBpAttemptedAmount(amount);

    if (!amount || amount > adjustedBlRemainingAmount) {
      let totalCost = amount;
      if (amount) {
        totalCost = amount - blRemainingAmount;
      }

      if (!amount || amount <= BuyerPowerService.minDepositThreshold) {
        totalCost = BuyerPowerService.minDepositAmount;
      }

      if (
        totalCost > BuyerPowerService.minDepositThreshold ||
        blRemainingAmount > BuyerPowerService.minDepositThreshold
      ) {
        totalCost = Math.ceil(totalCost / 10);
      }

      setBpDepositNeeded(amount);
      setBpAmountNeeded(totalCost);

      return false;
    }

    return true;
  }

  function validateCustomerMembership(amount = 0) {
    const { membershipType } = customer;
    const maximumBid = membershipType?.biddingLimitAmount || 0;
    const isInvalid = maximumBid && amount > maximumBid;

    return !isInvalid;
  }

  function resetError() {
    setServerResponse(undefined);
  }

  function showPhoneNumberModal(typeName) {
    if (isRegisteredThroughSocialMedia) {
      setIsFinishRegistrationModalOpen(true);
    } else {
      setPhoneNumberModalOpen(true);
    }

    setModalSubmitSuccessType(typeName);
  }

  function isBiddingTipsDisabled() {
    const isTipsDisabled = LocalStorageService.get(BIDDING_TIPS_DISABLED_KEY);
    return lotsWonCount !== 0 || isTipsDisabled;
  }

  function showBiddingTipsModal(typeName) {
    setBiddingTipsModalOpen(true);
    setModalSubmitSuccessType(typeName);
  }

  function setValidatedBidState(hasPhoneNumber) {
    resetError();
    let errorState;

    if (!validateCurrentBidAmount()) {
      errorState = LotStatusStates.ERROR_INVALID_AMOUNT;
    } else if (!validateIncrementAmount()) {
      errorState = LotStatusStates.ERROR_INVALID_INCREMENT;
    } else if (!validateCustomerMembership(maxBid)) {
      errorState = LotStatusStates.ERROR_NEED_UPGRADE_MEMBERSHIP;
      setBpAttemptedAmount(maxBid);
    } else if (!validateCustomerBuyerPower(maxBid)) {
      errorState = LotStatusStates.ERROR_BP_INCREASE;
      saveConfirmStateToStorage('setValidatedBidState');
    } else if (!validateCustomerId()) {
      errorState = LotStatusStates.ERROR_UPLOAD_ID;
    }

    if (!errorState && !customer.phoneNumber && !hasPhoneNumber) {
      showPhoneNumberModal('bidNow');
      return;
    }

    if (!errorState && !isBiddingTipsDisabled()) {
      showBiddingTipsModal('bidNow');
      return;
    }

    setLotState(
      errorState || (currentBid > 0 ? LotStatusStates.CONFIRM_INCREASE_BID : LotStatusStates.CONFIRM_PRELIMINARY_BID),
    );
  }

  function setValidatedBuyItNowState(hasPhoneNumber) {
    resetError();
    let errorState;

    if (!validateCustomerMembership(buyItNow)) {
      errorState = LotStatusStates.ERROR_NEED_UPGRADE_MEMBERSHIP;
    } else if (!validateCustomerBuyerPower(buyItNow)) {
      errorState = LotStatusStates.ERROR_BP_INCREASE;
      saveConfirmStateToStorage('setValidatedBuyItNowState');
    } else if (!validateCustomerId()) {
      errorState = LotStatusStates.ERROR_UPLOAD_ID;
    }

    if (!errorState && !customer.phoneNumber && !hasPhoneNumber) {
      showPhoneNumberModal('buyItNow');
      return;
    }

    if (!errorState && !isBiddingTipsDisabled()) {
      showBiddingTipsModal('buyItNow');
      return;
    }

    setLotState(errorState || LotStatusStates.CONFIRM_BUY_IT_NOW);
  }

  function setValidatedMakeAnOfferState(hasPhoneNumber) {
    resetError();
    let errorState;

    if (!validateOfferAmount()) {
      errorState = LotStatusStates.ERROR_INVALID_AMOUNT;
    } else if (!validateCustomerMembership(offer)) {
      errorState = LotStatusStates.ERROR_NEED_UPGRADE_MEMBERSHIP;
    } else if (!validateCustomerBuyerPower(offer)) {
      errorState = LotStatusStates.ERROR_BP_INCREASE;
      saveConfirmStateToStorage('setValidatedMakeAnOfferState');
    } else if (!validateCustomerId()) {
      errorState = LotStatusStates.ERROR_UPLOAD_ID;
    }

    if (!errorState && !customer.phoneNumber && !hasPhoneNumber) {
      return showPhoneNumberModal('makeAnOffer');
    }

    if (!errorState && !isBiddingTipsDisabled()) {
      return showBiddingTipsModal('makeAnOffer');
    }

    setLotState(errorState || LotStatusStates.CONFIRM_MAKE_AN_OFFER);

    return errorState;
  }

  function setValidatedCounterBidState(hasPhoneNumber) {
    resetError();
    let errorState;

    if (!validateCustomerMembership(counterBid)) {
      errorState = LotStatusStates.ERROR_NEED_UPGRADE_MEMBERSHIP;
    } else if (!validateCustomerBuyerPower(counterBid)) {
      errorState = LotStatusStates.ERROR_BP_INCREASE;
      saveConfirmStateToStorage('setValidatedCounterBidState');
    }

    if (!errorState && !customer.phoneNumber && !hasPhoneNumber) {
      showPhoneNumberModal('counterBid');
      return;
    }

    setLotState(errorState || LotStatusStates.CONFIRM_COUNTER_BID);
  }

  function scrollToBidInfo() {
    const $bidInfoCard = document.getElementById('lot-page-bid-info-card');
    if ($bidInfoCard) {
      const offset = ViewportService.offset($bidInfoCard).top;
      window.scroll({ top: offset - 120, behavior: 'smooth' });
    }
  }

  function handleBidNowSubmit() {
    if (!isAuthenticated) {
      return onRequestLogin();
    }
    if (isBelowSm) {
      scrollToBidInfo();
    }
    return setValidatedBidState();
  }

  function handleBuyItNowSubmit() {
    if (!isAuthenticated) {
      return onRequestLogin();
    }
    if (isBelowSm) {
      scrollToBidInfo();
    }
    return setValidatedBuyItNowState();
  }

  function handleMakeAnOfferSubmit() {
    if (!isAuthenticated) {
      return onRequestLogin();
    }
    if (isBelowSm) {
      scrollToBidInfo();
    }
    return setValidatedMakeAnOfferState();
  }

  function handleCounterBidSubmit() {
    if (!isAuthenticated) {
      return onRequestLogin();
    }
    if (isBelowSm) {
      scrollToBidInfo();
    }
    return setValidatedCounterBidState();
  }

  async function handleCustomerFileUpload(fileList) {
    if (!isAuthenticated) {
      onRequestLogin();
      return false;
    }

    const formData = new FormData();
    Object.keys(fileList).forEach((key) => {
      formData.append(`image_${key}`, fileList[key]);
    });

    return CustomerService.uploadUserId(customer.id, formData);
  }

  function handleCustomerFileUploadSuccess(updatedCustomer) {
    onCustomerUpdate(updatedCustomer);
    setInitValidateState('setValidatedBidState');
  }

  function handleMistypedBid() {
    if (!isAuthenticated) {
      onRequestLogin();
    } else {
      resetError();
      setLotState(LotStatusStates.FORM_MISTYPED_BID);
    }
  }

  function handleKeepBidSubmit() {
    if (!isAuthenticated) {
      onRequestLogin();
    } else {
      setLotState(LotStatusStates.CONFIRM_KEEP_BID);
    }
  }

  function handleAcceptBidSubmit() {
    if (!isAuthenticated) {
      onRequestLogin();
    } else {
      setLotState(LotStatusStates.CONFIRM_ACCEPT_BID);
    }
  }

  function handlePhoneSubmitSuccess(updatedCustomer) {
    onCustomerUpdate(updatedCustomer);
    initShippingFromCustomer(updatedCustomer);
    setIsFinishRegistrationModalOpen(false);
    if (modalSubmitSuccessType === 'bidNow') {
      setValidatedBidState(true);
    } else if (modalSubmitSuccessType === 'buyItNow') {
      setValidatedBuyItNowState(true);
    } else if (modalSubmitSuccessType === 'makeAnOffer') {
      setValidatedMakeAnOfferState(true);
    } else if (modalSubmitSuccessType === 'counterBid') {
      setValidatedCounterBidState(true);
    }
  }

  function shouldShowStateTermsModal() {
    return (isFl2Fl || isCa2Ca) && stateTermsAccepted === false;
  }

  function handleStateTermsModalOpen(cb) {
    setStateTermsAccepted(false);
    setStateTermsModalOpen(true);
    setStateTermsCb(cb);
  }

  function handleStateTermsConfirm() {
    setStateTermsAccepted(true);
    setStateTermsModalOpen(false);
  }

  function handleExistingPreorder(shippingOrder) {
    if (shippingOrder) {
      setIsPreorderAvailable(false);
    }
  }

  async function updateCurrentBidInformation(force = false) {
    if (FAKE) {
      return;
    }

    try {
      const queryParams = { id: lot.id, auction: lot.inventoryAuction, force };

      const data = await queryClient.fetchQuery(
        ['current-bid-info-data', queryParams],
        () => LotService.getCurrentBidInfo(queryParams),
        { cacheTime: 0 },
      );

      if (data) {
        const lotQuery = ['lot-info-data', `Lot:${lot.id}_${lot.inventoryAuction?.toLowerCase()}`];
        const lotInfoData = queryClient.getQueryData(lotQuery);

        queryClient.setQueryData(lotQuery, {
          ...lotInfoData,
          lot: data.lot,
        });
      }
    } catch (e) {
      /** Ignore */
    }
  }

  async function handleServerResponse(response) {
    const {
      result,
      maximumBid,
      bidStatus: updatedBidStatus,
      currentCustomerBid: bidCustomerBid,
      updateBid = false,
      suggestedBid: suggestion,
    } = response;
    const isSuccess = Boolean(result === 'success');
    const isError = Boolean(result === 'error');
    const disabledVideoGuideNotificationsKey = 'Abm::VideoNotificationsDisabled';
    const disabledNotifications = LocalStorageService.get(disabledVideoGuideNotificationsKey) || [];

    if (maximumBid && maximumBid > maxBid) {
      setMaxBid(maximumBid);
    }

    if (bidCustomerBid) {
      setCustomerBid(bidCustomerBid);
    }

    if (suggestion) {
      setOffer(suggestion);
    }

    let responseState = LotStatusStates.SUBMIT_RESPONSE;
    if (isSuccess || updateBid) {
      const isWon = bidCustomerBid && bidCustomerBid.status === BidService.STATUS_YOU_WON;
      if (!isWon) {
        responseState = LotStatusStates.FORM_STATE;
      }
      LocalStorageService.set(disabledVideoGuideNotificationsKey, [...disabledNotifications, 'bidding']);
      await updateCurrentBidInformation(updateBid);
    }

    if (isSuccess && isStartBidAvailable) {
      setLotState(responseState);
    }

    if (isError) {
      setLotState(LotStatusStates.FORM_STATE);
      deleteConfirmStateFromStorage();
      setServerResponse(response);
      return;
    }

    setServerResponse(response);
    setBidStatus(htmlDecode(updatedBidStatus));
    setLotState(responseState);
  }

  async function submitCustomQuote() {
    const customQuoteParams = getCustomQuoteParams(lot);
    try {
      await ShippingOrderService.submitCustomQuoteRequest(customQuoteParams);
      setCustomQuoteSent(true);
    } catch (error) {
      /** Ignore */
    }
  }

  async function submitShippingPreorder() {
    const preorderParams = getPreorderParams(lot);
    preorderParams.source = lotState === LotStatusStates.WON ? 'bidding_preorder_won' : 'bidding_preorder';
    try {
      const { shippingOrder } = await ShippingOrderService.shippingPreorder(preorderParams);
      handlePreorderUpdate(shippingOrder);
    } catch (e) {
      /** Ignore */
    }
  }

  async function submitBidPreorderIfResponseValid(response) {
    if (!response) {
      return;
    }

    const { result } = response;
    const isPreorderAllowed = Boolean(isPreorderAvailable && isPreorderEnabled && result === 'success');

    if (isPreorderAllowed) {
      if (requiresCustomQuote && !customQuoteSent && hasValidCustomQuoteParams(lot)) {
        await submitCustomQuote();
      }

      if (!requiresCustomQuote && hasValidPreorderParams(lot)) {
        await submitShippingPreorder();
      }
    }
  }

  function getInternalServerErrorResponse() {
    return {
      result: 'error',
      title: translationSets.serverErrorTitle,
      message: translationSets.serverErrorBody,
      isRenderMessage: true,
      reload: true,
    };
  }

  async function submitBidToServer(
    submitFn,
    payload = false,
    showStateConfirmWarning = false,
    stateConfirmCallback = undefined,
  ) {
    if (showStateConfirmWarning && shouldShowStateTermsModal()) {
      handleStateTermsModalOpen(stateConfirmCallback);
      return null;
    }

    setIsPending(true);
    try {
      const response = await bidService[submitFn](lotId, payload);
      await handleServerResponse(response);

      return response;
    } catch (error) {
      setServerResponse(getInternalServerErrorResponse());
      setLotState(LotStatusStates.FORM_STATE);
    } finally {
      setIsPending(false);
    }

    return null;
  }

  async function handleKeepBidConfirm() {
    await submitBidToServer('submitKeepCurrentBid', { auction: inventoryAuction });
  }

  async function handleCounterBidConfirm() {
    const payload = {
      amount: counterBid,
      auction: inventoryAuction,
    };

    const response = await submitBidToServer('submitCounterBid', payload, true, 'handleCounterBidConfirm');
    await submitBidPreorderIfResponseValid(response);
  }

  async function handleAcceptBidConfirm() {
    await submitBidToServer('submitAcceptMinimumBid', { auction: inventoryAuction });
  }

  function getPreliminaryBidPayload(customPayloadValues) {
    const payload = {
      amount: maxBid,
      auction: inventoryAuction,
    };

    if (isStartBidAvailable && startBid) {
      payload.startAmount = startBid;
    }

    if (currentBid > 0) {
      payload.jumpCurrentBidFlag = bidType === BidService.BID_TYPES.MONSTER_BID;
      payload.oneMoreIncrement = oneMoreIncrement;
    }

    return { ...payload, ...customPayloadValues };
  }

  async function sendBidConfirm(payload) {
    const response = await submitBidToServer('submitPreliminaryBid', payload, true, 'handleBidConfirm');
    await submitBidPreorderIfResponseValid(response);
  }

  async function handleBidConfirm() {
    const payload = getPreliminaryBidPayload();
    await sendBidConfirm(payload);
  }

  async function handleMakeAnOfferConfirm() {
    if (setValidatedMakeAnOfferState()) {
      // stop if error state
      return;
    }

    if (isMaoWithBidIncluded) {
      const payload = getPreliminaryBidPayload({ amount: offer, includeOffer: true });
      await sendBidConfirm(payload);
      return;
    }

    const payload = {
      amount: offer,
      auction: inventoryAuction,
    };

    const response = await submitBidToServer('submitMakeAnOffer', payload, true, 'handleMakeAnOfferConfirm');
    await submitBidPreorderIfResponseValid(response);
  }

  async function handleBuyItNowConfirm() {
    const response = await submitBidToServer(
      'submitBuyItNow',
      { auction: inventoryAuction },
      true,
      'handleBuyItNowConfirm',
    );
    await submitBidPreorderIfResponseValid(response);
  }

  async function handleMistypedBidSubmit(amount) {
    if (!isAuthenticated) {
      onRequestLogin();
      return;
    }

    if (!isMistypedBidAvailable) {
      return;
    }

    await submitBidToServer('submitMistypedBid', { amount, auction: inventoryAuction });
  }

  async function handleStateTermsConfirmSubmit() {
    switch (stateTermsCb) {
      case 'handleBidConfirm':
        await handleBidConfirm();
        break;
      case 'handleMakeAnOfferConfirm':
        await handleMakeAnOfferConfirm();
        break;
      case 'handleBuyItNowConfirm':
        await handleBuyItNowConfirm();
        break;
      case 'handleCounterBidConfirm':
        await handleCounterBidConfirm();
        break;
      default:
        break;
    }

    setStateTermsCb(undefined);
  }

  async function initLotFees() {
    try {
      const { fees: lotFees } = await LotService.getLotFees(lot.id, { auction: lot.inventoryAuction });
      setFees(lotFees);
    } catch (e) {
      /** Ignore */
    }
  }

  async function initLotPurchase() {
    try {
      const { lotPurchase: purchaseDetails } = await LotService.getLotPurchase(lot.id, lot.inventoryAuction, true);

      setLotPurchase(purchaseDetails);
    } catch (e) {
      /** Ignore */
    }
  }

  async function initFromValidateCallback(validateCallback) {
    switch (validateCallback) {
      case 'setValidatedBidState':
        setValidatedBidState();
        break;
      case 'setValidatedBuyItNowState':
        setValidatedBuyItNowState();
        break;
      case 'setValidatedMakeAnOfferState':
        setValidatedMakeAnOfferState();
        break;
      case 'setValidatedCounterBidState':
        setValidatedCounterBidState();
        break;
      default:
        break;
    }

    setInitValidateState(undefined);
  }

  async function initConfirmStateFromCache() {
    const storage = LocalStorageService.get(LOT_CONFIRMATION_KEY);
    if (storage && storage.lotId === lotId) {
      const {
        maxBid: storageMaxBid,
        counterBid: storageCounterBid,
        startBid: storageStartBid,
        offer: storageOffer,
        validateCallback,
      } = storage;
      if (storageMaxBid) {
        setMaxBid(storageMaxBid);
      }

      if (storageCounterBid) {
        setCounterBid(storageCounterBid);
      }

      if (storageStartBid) {
        setStartBid(storageStartBid);
      }

      if (storageOffer) {
        setOffer(storageOffer);
      }

      if (validateCallback) {
        setInitValidateState(validateCallback);
      }
    }

    deleteConfirmStateFromStorage();
  }

  async function initShippingCountries() {
    try {
      const result = await ShippingOrderService.getShippingCountriesList();
      setShippingCountries(result);
    } catch (error) {
      /** Ignore */
    }
  }

  async function getShippingQuote() {
    try {
      const payload = getQuoteParams(lot);
      if (!ShippingOrderService.areQuoteParamsValid(payload)) {
        throw new Error('Not valid params');
      }
      const quote = await ShippingOrderService.getQuote(payload);
      updateShippingQuote(quote);
    } catch (error) {
      updateShippingQuote({});
    }
  }

  function determineBidStateByStatus() {
    setLotState(LotStatusStates.getStateByLot(lot));
    setFormType(LotStatusStates.getFormTypeByLotStatus(status));
  }

  function handleSubmitCancel() {
    resetError();
    setLotState(LotStatusStates.FORM_STATE);
    deleteConfirmStateFromStorage();
    if (isBelowSm) {
      scrollToBidInfo();
    }
  }

  function handleBiddingTipsSubmitSuccess() {
    LocalStorageService.set(BIDDING_TIPS_DISABLED_KEY, true);
    setBiddingTipsModalOpen(false);

    if (modalSubmitSuccessType === 'bidNow') {
      setValidatedBidState(true);
    } else if (modalSubmitSuccessType === 'buyItNow') {
      setValidatedBuyItNowState(true);
    } else if (modalSubmitSuccessType === 'makeAnOffer') {
      setValidatedMakeAnOfferState(true);
    }
  }

  useEffect(() => {
    if (FAKE) {
      setBidInfoReceived(true);
      return;
    }

    (async () => {
      const isWon = status === LotService.STATUS_YOU_WON;

      if (isAuthenticated) {
        initShippingCountries();
        await initShippingFromCustomer(customer);

        if (!isWon) {
          initLotFees();
          updateCurrentBidInformation();
        } else {
          await initLotPurchase();
        }
      }

      await determineBidStateByStatus();
      await initConfirmStateFromCache();

      setBidInfoReceived(true);
    })();
  }, []);

  useEffect(() => {
    handleExistingPreorder(preorder);
  }, [preorder]);

  useEffect(() => {
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('MaxBidUpdate', { detail: { maxBid, manual: bidInputTouched } }));
      setMaxBidUpdateDispatchTimeout(0);
    }, maxBidUpdateDispatchTimeout);
  }, [maxBid, bidInputTouched]);

  useEffect(() => {
    if ((isCa2Ca || isFl2Fl) && stateTermsAccepted && stateTermsCb) {
      handleStateTermsConfirmSubmit();
    }
  }, [stateTermsAccepted]);

  useEffect(() => {
    if (initValidateState) {
      initFromValidateCallback(initValidateState);
    }
  }, [initValidateState]);

  useEffect(() => {
    setIsStartBidAvailable(Boolean(startingBid > 0 && currentBid === 0));
    setStartBid(startingBid);
  }, [startingBid, currentBid]);

  useEffect(() => {
    if (suggestedBid && suggestedBid > maxBid) {
      setMaxBid(suggestedBid);
    }
  }, [suggestedBid]);

  useEffect(() => {
    if (lotCustomerBid && (!customerBid || customerBid.maxBid !== lotCustomerBid.maxBid)) {
      setCustomerBid(lotCustomerBid);
    }
  }, [lotCustomerBid]);

  const hasBuyItNowCard =
    lotState === LotStatusStates.NO_BID_BLOCKED ||
    lotState === LotStatusStates.OWNERSHIP_DOCS_BLOCKED ||
    (lotState === LotStatusStates.FORM_STATE && formType === LotStatusStates.FORM_PRELIMINARY_BID);

  if (isAbmInventory && lotState === LotStatusStates.FORM_STATE) {
    return <VehiclePrice customer={customer} lot={lot} onBuyItNowClick={handleBuyItNowSubmit} />;
  }

  return (
    <>
      <LotPageBlock>
        <Card
          id="lot-page-bid-info-card"
          title={<CardTitle lotState={lotState} timeout={SLIDE_ANIMATION_DURATION / 2} />}
        >
          {isBidInfoReceived === false ? (
            <div className="bid-information__container is-spinner-container">
              <SpinnerWheel size={30} thickness={3} isCentered style={{ marginTop: '-40px' }} />
            </div>
          ) : (
            <div className={classes.cardBody}>
              <StatusValues
                timeout={SLIDE_ANIMATION_DURATION}
                lotState={lotState}
                isAuthenticated={isAuthenticated}
                currentBid={currentBid}
                customerBid={customerBid}
                bidStatus={bidStatus}
                lot={lot}
                isGuestMembership={isGuestMembership}
                formType={formType}
                serverResponse={serverResponse}
                inventoryAuction={inventoryAuction}
              />

              {lotState === LotStatusStates.WON && <WonState customer={customer} lot={lot} lotPurchase={lotPurchase} />}

              {lotState === LotStatusStates.LIVE && (
                <div className={classes.bidContainer}>
                  <LiveState lot={lot} />
                  <AsIsDisclaimer />
                </div>
              )}

              {lotState === LotStatusStates.AWAITING_APPROVAL && (
                <div className={classes.bidContainer}>
                  <CounterBidNotification lot={lot} customerBid={customerBid} />
                  <AsIsDisclaimer />
                </div>
              )}

              <Collapse in={!!serverResponse === true} timeout={SLIDE_ANIMATION_DURATION} unmountOnExit mountOnEnter>
                <div>
                  {getBidStatusKey(bidStatus) === HIGH_BIDDER_STATUS_KEY &&
                  !!serverResponse &&
                  serverResponse.result !== 'error' ? (
                    <HighBidderNotification customer={customer} setCustomer={onCustomerUpdate} />
                  ) : (
                    <ServerResponseState
                      customer={customer}
                      serverResponse={serverResponse}
                      onCancel={handleSubmitCancel}
                      customQuoteSent={customQuoteSent}
                      inventoryAuction={inventoryAuction}
                    />
                  )}

                  {lotState !== LotStatusStates.FORM_STATE && (
                    <AsIsDisclaimer serverResponse={serverResponse} inventoryAuction={inventoryAuction} />
                  )}
                </div>
              </Collapse>

              <Collapse
                in={
                  lotState === LotStatusStates.CONFIRM_PRELIMINARY_BID ||
                  lotState === LotStatusStates.CONFIRM_INCREASE_BID
                }
                timeout={SLIDE_ANIMATION_DURATION}
                unmountOnExit
                mountOnEnter
              >
                <div className={classes.bidContainer}>
                  <ConfirmationNotification
                    amount={maxBid}
                    type={lotState === LotStatusStates.CONFIRM_INCREASE_BID ? 'increaseBid' : 'bidNow'}
                    amountDetails={isStartBidAvailable ? { startBid, maxBid } : null}
                    onOneMoreIncrementChange={setOneMoreIncrement}
                    oneMoreIncrement={oneMoreIncrement}
                    currencyFeeFormat={currencyFeeFormat}
                  />
                  <FeesDescription priceLabel={translationSets.ifFinalBidIs} lot={lot} fees={fees} amount={maxBid} />
                  {isPreorderAvailable && (
                    <ShippingPreorder
                      isState2StateShipping={isState2StateShipping}
                      isState2StateAccepted={isState2StateAccepted}
                      setIsState2StateAccepted={setIsState2StateAccepted}
                      preorderEnabled={isPreorderEnabled}
                      shippingCountries={shippingCountries}
                      onPreorderEnableChange={setIsPreorderEnabled}
                      onTriggerQuoteUpdate={getShippingQuote}
                    />
                  )}
                  <ConfirmationActions
                    amount={maxBid}
                    type={lotState === LotStatusStates.CONFIRM_INCREASE_BID ? 'increaseBid' : 'bidNow'}
                    isState2StatePreorder={isState2StatePreorder}
                    isState2StateAccepted={isState2StateAccepted}
                    confirmLabel={translationSets.ctaConfirmBid}
                    onConfirm={handleBidConfirm}
                    onCancel={handleSubmitCancel}
                    marginTop={14}
                    lot={lot}
                  />
                </div>
              </Collapse>

              {isMistypedBidAvailable && (
                <Collapse
                  in={lotState === LotStatusStates.FORM_MISTYPED_BID}
                  timeout={SLIDE_ANIMATION_DURATION}
                  unmountOnExit
                  mountOnEnter
                >
                  <div className={classes.bidContainer}>
                    <MistypedBidForm
                      auction={inventoryAuction}
                      currency={currency}
                      maxBid={lotCustomerBid.maxBid}
                      currentBid={currentBid}
                      onMistypedBidConfirm={handleMistypedBidSubmit}
                      onCancel={handleSubmitCancel}
                    />
                  </div>
                </Collapse>
              )}

              {makeAnOffer === true && (
                <Collapse
                  in={lotState === LotStatusStates.CONFIRM_MAKE_AN_OFFER}
                  timeout={SLIDE_ANIMATION_DURATION}
                  unmountOnExit
                  mountOnEnter
                >
                  <div className={classes.bidContainer}>
                    <ConfirmationNotification amount={offer} type="makeAnOffer" currencyFeeFormat={currencyFeeFormat} />
                    <FeesDescription priceLabel={translationSets.labelOffer} lot={lot} fees={fees} amount={offer} />
                    {isPreorderAvailable && (
                      <ShippingPreorder
                        isState2StateShipping={isState2StateShipping}
                        isState2StateAccepted={isState2StateAccepted}
                        setIsState2StateAccepted={setIsState2StateAccepted}
                        preorderEnabled={isPreorderEnabled}
                        shippingCountries={shippingCountries}
                        onPreorderEnableChange={setIsPreorderEnabled}
                        onTriggerQuoteUpdate={getShippingQuote}
                      />
                    )}
                    <ConfirmationActions
                      amount={offer}
                      type="makeAnOffer"
                      lot={lot}
                      isState2StatePreorder={isState2StatePreorder}
                      isState2StateAccepted={isState2StateAccepted}
                      confirmLabel={translationSets.ctaConfirmOffer}
                      onConfirm={handleMakeAnOfferConfirm}
                      onCancel={handleSubmitCancel}
                      offer={offer}
                      minOffer={suggestedOffer}
                      onOfferChange={setOffer}
                      marginTop={14}
                      isAuthenticated={isAuthenticated}
                      isGuestMembership={isGuestMembership}
                      isMaoWithBidIncluded={isMaoWithBidIncluded}
                      setIsMaoWithBidIncluded={setIsMaoWithBidIncluded}
                    />
                  </div>
                </Collapse>
              )}

              {buyItNow > 0 && (
                <Collapse
                  in={lotState === LotStatusStates.CONFIRM_BUY_IT_NOW}
                  timeout={SLIDE_ANIMATION_DURATION}
                  unmountOnExit
                  mountOnEnter
                >
                  <div className={classes.bidContainer}>
                    <ConfirmationNotification amount={buyItNow} type="buyItNow" currencyFeeFormat={currencyFeeFormat} />
                    <FeesDescription
                      priceLabel={translationSets.labelBINPrice}
                      lot={lot}
                      fees={fees}
                      amount={buyItNow}
                    />
                    {isPreorderAvailable && (
                      <ShippingPreorder
                        isState2StateShipping={isState2StateShipping}
                        isState2StateAccepted={isState2StateAccepted}
                        setIsState2StateAccepted={setIsState2StateAccepted}
                        preorderEnabled={isPreorderEnabled}
                        shippingCountries={shippingCountries}
                        onPreorderEnableChange={setIsPreorderEnabled}
                        onTriggerQuoteUpdate={getShippingQuote}
                      />
                    )}
                    <ConfirmationActions
                      amount={buyItNow}
                      type="buyItNow"
                      lot={lot}
                      isState2StatePreorder={isState2StatePreorder}
                      isState2StateAccepted={isState2StateAccepted}
                      confirmLabel={translationSets.ctaConfirmPurchase}
                      onConfirm={handleBuyItNowConfirm}
                      onCancel={handleSubmitCancel}
                      marginTop={14}
                    />
                  </div>
                </Collapse>
              )}

              {formType === LotStatusStates.FORM_COUNTER_BID && (
                <>
                  <Collapse
                    in={lotState === LotStatusStates.CONFIRM_KEEP_BID}
                    timeout={SLIDE_ANIMATION_DURATION}
                    unmountOnExit
                    mountOnEnter
                  >
                    <div className={classes.bidContainer}>
                      <ConfirmationNotification
                        amount={customerBid ? customerBid.currentBid : 0}
                        type="keepBid"
                        currencyFeeFormat={currencyFeeFormat}
                      />
                      <ConfirmationActions
                        amount={customerBid ? customerBid.currentBid : 0}
                        type="keepBid"
                        lot={lot}
                        isState2StatePreorder={isState2StatePreorder}
                        isState2StateAccepted={isState2StateAccepted}
                        confirmLabel={translationSets.ctaConfirmBid}
                        onConfirm={handleKeepBidConfirm}
                        onCancel={handleSubmitCancel}
                        marginTop={14}
                      />
                    </div>
                  </Collapse>

                  <Collapse
                    in={lotState === LotStatusStates.CONFIRM_COUNTER_BID}
                    timeout={SLIDE_ANIMATION_DURATION}
                    unmountOnExit
                    mountOnEnter
                  >
                    <div className={classes.bidContainer}>
                      <ConfirmationNotification
                        amount={counterBid}
                        type="counterBid"
                        currencyFeeFormat={currencyFeeFormat}
                      />
                      {isPreorderAvailable && (
                        <ShippingPreorder
                          isState2StateShipping={isState2StateShipping}
                          isState2StateAccepted={isState2StateAccepted}
                          setIsState2StateAccepted={setIsState2StateAccepted}
                          preorderEnabled={isPreorderEnabled}
                          shippingCountries={shippingCountries}
                          onPreorderEnableChange={setIsPreorderEnabled}
                          onTriggerQuoteUpdate={getShippingQuote}
                        />
                      )}
                      <ConfirmationActions
                        amount={counterBid}
                        type="counterBid"
                        lot={lot}
                        isState2StatePreorder={isState2StatePreorder}
                        isState2StateAccepted={isState2StateAccepted}
                        confirmLabel={translationSets.ctaConfirmBid}
                        onConfirm={handleCounterBidConfirm}
                        onCancel={handleSubmitCancel}
                        marginTop={14}
                      />
                    </div>
                  </Collapse>

                  <Collapse
                    in={lotState === LotStatusStates.CONFIRM_ACCEPT_BID}
                    timeout={SLIDE_ANIMATION_DURATION}
                    unmountOnExit
                    mountOnEnter
                  >
                    <div className={classes.bidContainer}>
                      <ConfirmationNotification
                        amount={minimumBid}
                        type="acceptMinimum"
                        currencyFeeFormat={currencyFeeFormat}
                      />
                      <ConfirmationActions
                        amount={minimumBid}
                        type="acceptMinimum"
                        lot={lot}
                        isState2StatePreorder={isState2StatePreorder}
                        isState2StateAccepted={isState2StateAccepted}
                        confirmLabel={translationSets.ctaConfirmBid}
                        onConfirm={handleAcceptBidConfirm}
                        onCancel={handleSubmitCancel}
                        marginTop={14}
                      />
                    </div>
                  </Collapse>
                </>
              )}

              <Collapse
                in={lotState === LotStatusStates.ERROR_UPLOAD_ID}
                timeout={SLIDE_ANIMATION_DURATION}
                unmountOnExit
                mountOnEnter
              >
                <UploadIdState
                  bidContainerClasses={classes.bidContainer}
                  onCancel={handleSubmitCancel}
                  onSubmit={handleCustomerFileUpload}
                  onSubmitSuccess={handleCustomerFileUploadSuccess}
                />
              </Collapse>

              <Collapse
                in={lotState === LotStatusStates.ERROR_BP_INCREASE}
                timeout={SLIDE_ANIMATION_DURATION}
                unmountOnExit
                mountOnEnter
              >
                <BuyerPowerIncrease
                  lot={lot}
                  bidContainerClasses={classes.bidContainer}
                  attemptedAmount={bpAttemptedAmount}
                  bpIncreaseAmount={bpDepositNeeded}
                  additionalDepositAmount={bpAmountNeeded}
                  isState2StatePreorder={isState2StatePreorder}
                  isState2StateAccepted={isState2StateAccepted}
                  onCancel={handleSubmitCancel}
                />
              </Collapse>

              {isAuthenticated && (
                <Collapse
                  in={lotState === LotStatusStates.ERROR_NEED_UPGRADE_MEMBERSHIP}
                  timeout={SLIDE_ANIMATION_DURATION}
                  unmountOnExit
                  mountOnEnter
                >
                  <MembershipUpgradeRequired
                    membershipType={customer.membershipType}
                    bidContainerClasses={classes.bidContainer}
                    attemptedAmount={bpAttemptedAmount}
                    isState2StatePreorder={isState2StatePreorder}
                    isState2StateAccepted={isState2StateAccepted}
                    onCancel={handleSubmitCancel}
                    lot={lot}
                  />
                </Collapse>
              )}

              <Collapse
                in={lotState === LotStatusStates.ERROR_INVALID_INCREMENT}
                timeout={SLIDE_ANIMATION_DURATION}
                unmountOnExit
                mountOnEnter
              >
                <InvalidIncrementState
                  auction={inventoryAuction}
                  bidContainerClasses={classes.bidContainer}
                  amount={maxBid}
                />
              </Collapse>

              <Collapse
                in={lotState === LotStatusStates.NO_BID_BLOCKED}
                timeout={SLIDE_ANIMATION_DURATION}
                unmountOnExit
                mountOnEnter
              >
                <NoBidBlockedStateNotification />
                <CardIndentedContent className={classes.bidNow}>
                  <BidNow
                    customer={customer}
                    lot={lot}
                    fees={fees}
                    currentBid={currentBid}
                    maxBid={maxBid}
                    onMaxBidChange={handleMaxBidChange}
                    onFocus={handleBidInputFocus}
                    onRequestLogin={onRequestLogin}
                    isContactUs
                  />
                </CardIndentedContent>
                <AsIsDisclaimer />
              </Collapse>

              <Collapse
                in={lotState === LotStatusStates.OWNERSHIP_DOCS_BLOCKED}
                timeout={SLIDE_ANIMATION_DURATION}
                unmountOnExit
                mountOnEnter
              >
                <OwnershipDocsBlockedState />
                <CardIndentedContent className={classes.bidNow}>
                  <BidNow
                    customer={customer}
                    lot={lot}
                    fees={fees}
                    currentBid={currentBid}
                    maxBid={maxBid}
                    onMaxBidChange={handleMaxBidChange}
                    onFocus={handleBidInputFocus}
                    onRequestLogin={onRequestLogin}
                    isContactUs
                  />
                </CardIndentedContent>
                <AsIsDisclaimer />
              </Collapse>

              <Fade isOpen={lotState === LotStatusStates.FORM_STATE}>
                <div className={classes.bidContainer}>
                  {formType === LotStatusStates.FORM_PRELIMINARY_BID && (
                    <>
                      <CardIndentedContent className={classes.bidNow}>
                        <BidNow
                          customer={customer}
                          lot={lot}
                          fees={fees}
                          currentBid={currentBid}
                          customerMaxBid={customerBid?.maxBid}
                          startBid={startBid}
                          onStartBidChange={setStartBid}
                          maxBid={maxBid}
                          bidType={bidType}
                          isStartBidAvailable={isStartBidAvailable}
                          startBidMinimum={startingBid}
                          onMaxBidChange={handleMaxBidChange}
                          onBidTypeChange={setBidType}
                          onSubmitBid={handleBidNowSubmit}
                          onRequestLogin={onRequestLogin}
                          onFocus={handleBidInputFocus}
                          isMistypedBidAvailable={isMistypedBidAvailable}
                          onMistypedBid={handleMistypedBid}
                        />
                        <AsIsDisclaimer />
                      </CardIndentedContent>
                    </>
                  )}

                  {formType === LotStatusStates.FORM_COUNTER_BID && (
                    <>
                      <CounterBidNotification lot={lot} customerBid={customerBid} />
                      <CounterBidForm
                        lot={lot}
                        counterBid={counterBid}
                        customerBid={customerBid}
                        onCounterBidChange={setCounterBid}
                        onKeepBidSubmit={handleKeepBidSubmit}
                        onCounterBidSubmit={handleCounterBidSubmit}
                        onAcceptBidSubmit={handleAcceptBidSubmit}
                      />
                      <AsIsDisclaimer />
                    </>
                  )}
                </div>
              </Fade>

              <PendingState isShown={isPending} />

              {isFl2Fl && (
                <SuspenseWrap fallback={null} init={stateTermsModalOpen}>
                  <Fl2FlModal
                    isOpen={stateTermsModalOpen}
                    onConfirm={handleStateTermsConfirm}
                    onClose={() => setStateTermsModalOpen(false)}
                  />
                </SuspenseWrap>
              )}

              {isCa2Ca && (
                <SuspenseWrap fallback={null} init={stateTermsModalOpen}>
                  <Ca2CaModal
                    isOpen={stateTermsModalOpen}
                    onConfirm={handleStateTermsConfirm}
                    onClose={() => setStateTermsModalOpen(false)}
                  />
                </SuspenseWrap>
              )}

              <SuspenseWrap fallback={null} init={phoneNumberModalOpen}>
                <PhoneNumberFormModal
                  isOpen={phoneNumberModalOpen}
                  onSubmitSuccess={handlePhoneSubmitSuccess}
                  onClose={() => setPhoneNumberModalOpen(false)}
                />
              </SuspenseWrap>

              <SuspenseWrap fallback={null} init={isFinishRegistrationModalOpen}>
                <FinishRegistrationFormModal
                  isOpen={isFinishRegistrationModalOpen}
                  onSubmitSuccess={handlePhoneSubmitSuccess}
                />
              </SuspenseWrap>

              <SuspenseWrap fallback={null} init={biddingTipsModalOpen}>
                <BiddingTipsModal
                  lot={lot}
                  fees={fees}
                  isOpen={biddingTipsModalOpen}
                  onSubmitSuccess={handleBiddingTipsSubmitSuccess}
                  onClose={() => setBiddingTipsModalOpen(false)}
                  type={modalSubmitSuccessType}
                  customer={customer}
                  maxBid={maxBid}
                  onRequestLogin={onRequestLogin}
                />
              </SuspenseWrap>
            </div>
          )}
        </Card>
      </LotPageBlock>

      {Boolean(hasBuyItNowCard && buyItNow) && (
        <LotPageBlock>
          <BuyItNowCard
            lot={lot}
            isContactUs={lotState !== LotStatusStates.FORM_STATE}
            onBuyItNow={handleBuyItNowSubmit}
            onMakeAnOffer={handleMakeAnOfferSubmit}
          />
        </LotPageBlock>
      )}
    </>
  );
}

BidInformation.propTypes = {
  lot: LotShape,
  customer: CustomerShape,
  onCustomerUpdate: PropTypes.func,
};

BidInformation.defaultProps = {
  lot: null,
  customer: {},
  onCustomerUpdate: () => null,
};

export default BidInformation;
