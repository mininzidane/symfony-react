import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import BaseApiService from 'backend/js/api/BaseApiService';
import BidService from 'backend/js/api/BidService';
import LotService from 'backend/js/api/LotService';
import BidContext from './BidContext';
import {
  // eslint-disable-next-line import/named
  determineBidStatus,
  STATE_UNKNOWN,
} from './BidStates';

const BidContextProvider = ({
  inventoryItem,
  customer,
  currentBid,
  children,
  onSubmitSuccess,
  onSubmitError,
  allowShippingPreorder,
}) => {
  const [loading, setLoading] = useState(true);
  const [feesTable, setFeesTable] = useState({});
  const [bidState, setBidState] = useState(STATE_UNKNOWN);
  const [preorderEnabled, setPreorderEnabled] = useState(false);
  const [preorderParams, setPreorderParams] = useState(null);
  const [submitMessage, setSubmitMessage] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(null);
  const bidService = new BidService();
  const hasCustomer = Boolean(customer && customer.id);
  const canPlaceShippingPreorder = Boolean(allowShippingPreorder && preorderEnabled && preorderParams);

  function clearMessages() {
    setSubmitMessage(null);
    setSubmitSuccess(null);
  }

  function setErrorFromResponse(response) {
    let message = BaseApiService.parseErrorResponse(response);
    if (!message) {
      message = 'Unknown error';
    }

    setSubmitMessage(message);
    setSubmitSuccess(false);
  }

  function setMessageFromResponse({ bidResult }) {
    const { result, message } = bidResult;
    const isSuccess = result === 'success';

    setSubmitMessage(message);
    setSubmitSuccess(isSuccess);
  }

  function initBidState() {
    const { status } = inventoryItem;

    setBidState(determineBidStatus(status, currentBid));
  }

  async function initFeesTable() {
    try {
      const customerId = customer && customer.id;
      const { id, inventoryAuction } = inventoryItem;
      const { fees: inventoryFees } = await LotService.getFees(id, customerId, inventoryAuction);
      setFeesTable(inventoryFees);
    } catch (e) {
      /** Ignore */
    }
  }

  function updateShippingPreorder(params, isShippingEnabled) {
    if (isShippingEnabled) {
      setPreorderParams(params);
      setPreorderEnabled(true);
    } else {
      setPreorderParams(null);
      setPreorderEnabled(false);
    }
  }

  function getBasePayload() {
    const { id: stockNumber, inventoryAuction: auction } = inventoryItem;
    const payload = { auction, stockNumber };
    if (hasCustomer) {
      payload.customerId = customer.id;
    }

    if (canPlaceShippingPreorder) {
      payload.preorder = preorderParams;
    }

    return payload;
  }

  async function submitBid({ amount, startAmount = null }) {
    clearMessages();
    if (!amount) {
      return;
    }

    const payload = { ...getBasePayload(), amount, startAmount };
    try {
      const response = await bidService.submitBid(payload);

      onSubmitSuccess(response);
      setMessageFromResponse(response);
    } catch (e) {
      setErrorFromResponse(e);
      onSubmitError(e);
    }
  }

  async function submitBuyItNow({ buyItNow }) {
    clearMessages();
    if (!buyItNow) {
      return;
    }

    const payload = getBasePayload();
    try {
      const response = await bidService.submitBuyItNow(payload);

      onSubmitSuccess(response);
      setMessageFromResponse(response);
    } catch (e) {
      setErrorFromResponse(e);
      onSubmitError(e);
    }
  }

  async function submitMakeAnOffer({ amount }) {
    clearMessages();
    if (!amount) {
      return;
    }

    const payload = { ...getBasePayload(), amount };

    try {
      const response = await bidService.submitMakeAnOffer(payload);

      onSubmitSuccess(response);
      setMessageFromResponse(response);
    } catch (e) {
      setErrorFromResponse(e);
      onSubmitError(e);
    }
  }

  async function submitLiveBid({ amount }) {
    clearMessages();
    if (!amount) {
      return;
    }

    const payload = { ...getBasePayload(), amount };

    try {
      const response = await bidService.submitLiveBid(payload);

      onSubmitSuccess(response);
      setMessageFromResponse(response);
    } catch (e) {
      setErrorFromResponse(e);
      onSubmitError(e);
    }
  }

  async function keepCurrentBid() {
    clearMessages();
    if (!currentBid) {
      return;
    }

    const { id } = currentBid;
    try {
      const response = await bidService.keepCurrentBid(id);

      onSubmitSuccess(response);
      setMessageFromResponse(response);
    } catch (e) {
      setErrorFromResponse(e);
      onSubmitError(e);
    }
  }

  async function increaseCounterBid({ amount }) {
    clearMessages();
    if (!currentBid) {
      return;
    }

    const payload = { ...getBasePayload(), amount };
    const { id } = currentBid;
    try {
      const response = await bidService.increaseCounterBid(id, payload);

      onSubmitSuccess(response);
      setMessageFromResponse(response);
    } catch (e) {
      setErrorFromResponse(e);
      onSubmitError(e);
    }
  }

  async function acceptMinimumBid() {
    clearMessages();
    const payload = { ...getBasePayload() };
    const { id } = currentBid;
    try {
      const response = await bidService.acceptMinimumBid(id, payload);

      onSubmitSuccess(response);
      setMessageFromResponse(response);
    } catch (e) {
      setErrorFromResponse(e);
      onSubmitError(e);
    }
  }

  useEffect(() => {
    (async () => {
      if (!inventoryItem.sold && hasCustomer) {
        await initFeesTable();
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (inventoryItem) {
        initBidState();
      }

      if (loading) {
        setLoading(false);
      }
    })();
  }, [inventoryItem, currentBid]);

  return (
    <BidContext.Provider
      value={{
        inventoryItem,
        currentBid,
        customer,
        hasCustomer,
        bidState,
        feesTable,
        loading,
        submitMessage,
        submitSuccess,
        allowShippingPreorder,
        preorderEnabled,
        preorderParams,
        submitBid,
        submitLiveBid,
        submitBuyItNow,
        submitMakeAnOffer,
        keepCurrentBid,
        increaseCounterBid,
        acceptMinimumBid,
        updateShippingPreorder,
      }}
    >
      {children}
    </BidContext.Provider>
  );
};

BidContextProvider.propTypes = {
  inventoryItem: PropTypes.object.isRequired,
  customer: PropTypes.object.isRequired,
  currentBid: PropTypes.object,
  children: PropTypes.node.isRequired,
  onSubmitSuccess: PropTypes.func,
  onSubmitError: PropTypes.func,
  allowShippingPreorder: PropTypes.bool,
};

BidContextProvider.defaultProps = {
  currentBid: null,
  onSubmitSuccess: () => null,
  onSubmitError: () => null,
  allowShippingPreorder: false,
};

export default BidContextProvider;
