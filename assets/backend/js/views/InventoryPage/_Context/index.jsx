import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import BidService from 'backend/js/api/BidService';
import LotPurchaseService from 'backend/js/api/LotPurchaseService';
import WatchlistService from 'backend/js/api/WatchlistService';
import InventoryPageContext from './InventoryPageContext';
import useLot from '../../../hooks/useLot';

const InventoryPageContextProvider = ({ inventoryId, auction, customer, assignBidAccess, children }) => {
  const [inventoryItem, , refetch] = useLot(inventoryId, auction, customer && customer.id);
  const [canAssignBid, setCanAssignBid] = useState(false);
  const [isWatched, setIsWatched] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(true);
  const [lotPurchase, setLotPurchase] = useState(null);
  const [currentBid, setCurrentBid] = useState(null);
  const [customerHasHighBid, setCustomerHasHighBid] = useState(false);
  const lotPurchaseService = new LotPurchaseService();
  const bidService = new BidService();
  const watchlistService = new WatchlistService();
  const hasCustomer = Boolean(customer && customer.id);

  async function loadCurrentHighBid() {
    try {
      const customerId = hasCustomer ? customer.id : null;
      const { inventoryAuction, id: stockNumber } = inventoryItem;
      const { bid } = await bidService.getInventoryBidDetails(inventoryAuction, stockNumber, customerId);

      setCurrentBid(bid);
    } catch (e) {
      /** Ignore */
    }
  }

  async function addToWatchlist() {
    if (!customer) {
      return;
    }

    try {
      await watchlistService.addToWatchlist(customer.id, inventoryItem.inventoryAuction, inventoryItem.id);
      setIsWatched(true);
    } catch (e) {
      /** Ignore */
    }
  }

  async function removeFromWatchlist() {
    if (!customer) {
      return;
    }

    try {
      await watchlistService.removeFromWatchlist(customer.id, inventoryItem.inventoryAuction, inventoryItem.id);
      setIsWatched(false);
    } catch (e) {
      /** Ignore */
    }
  }

  async function handleIsWatchedUpdate(updateWatchedValue) {
    if (updateWatchedValue) {
      await addToWatchlist();
    } else {
      await removeFromWatchlist();
    }
  }

  function initCanAssignBid() {
    if (assignBidAccess) {
      const { currentCustomerBid = null } = inventoryItem;
      if ((currentBid && currentBid.bidReAssignable) || (currentCustomerBid && currentCustomerBid.bidReAssignable)) {
        setCanAssignBid(true);
      }
    }
  }

  function initHighBid() {
    if (
      customer &&
      currentBid &&
      currentBid.customer.id === customer.id &&
      BidService.WINNING_BID_STATUES.includes(currentBid.status)
    ) {
      setCustomerHasHighBid(true);
    }
  }

  async function loadLotPurchase() {
    try {
      const { lotPurchase: lotPurchaseResponse } = await lotPurchaseService.getLotPurchaseByCustomerAndInventory(
        customer && customer.id,
        inventoryItem.inventoryAuction,
        inventoryItem.id,
      );

      if (lotPurchaseResponse) {
        setLotPurchase(lotPurchaseResponse);
      }
    } catch (e) {
      /** Ignore */
    }
  }

  async function reloadInventoryItem() {
    await refetch();
  }

  useEffect(() => {
    (async () => {
      if (inventoryItem) {
        await loadLotPurchase();
        await loadCurrentHighBid();
        initCanAssignBid();
        setLoadingDetails(false);
      }
    })();
  }, [inventoryItem]);

  useEffect(() => {
    if (inventoryItem) {
      initHighBid();
      initCanAssignBid();
    }
  }, [currentBid]);

  return (
    <InventoryPageContext.Provider
      value={{
        inventoryItem,
        customer,
        isWatched,
        currentBid,
        lotPurchase,
        canAssignBid,
        loadingDetails,
        hasCustomer,
        customerHasHighBid,
        handleIsWatchedUpdate,
        reloadInventoryItem,
      }}
    >
      {children}
    </InventoryPageContext.Provider>
  );
};

InventoryPageContextProvider.propTypes = {
  inventoryId: PropTypes.number.isRequired,
  auction: PropTypes.string.isRequired,
  customer: PropTypes.object,
  assignBidAccess: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

InventoryPageContextProvider.defaultProps = {
  customer: null,
  assignBidAccess: false,
};

export default InventoryPageContextProvider;
