import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import BidService from 'backend/js/api/BidService';
import RouterService from 'backend/js/api/RouterService';
import LocalStorageService from 'backend/js/lib/utils/LocalStorageService';
import CounterBidContext from './CounterBidContext';

const REFRESH_TIME = 600000; // Refresh every 10 minutes
const REFRESH_STORAGE_KEY = 'ACP::DISABLE_COUNTER_BIDS_REFRESH';
let refreshInterval;

const CounterBidContextProvider = ({ children }) => {
  const [initialized, setInitialized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [bids, setBids] = useState([]);
  const [queryParams, setQueryParams] = useState({});
  const [lastSyncedAt, setLastSyncedAt] = useState(undefined);
  const [totalBids, setTotalBids] = useState(undefined);
  const [soldTodayBids, setSoldTodayBids] = useState(undefined);
  const [touchedTodayBids, setTouchedTodayBids] = useState(undefined);
  const [filterBidCounts, setFilterBidCounts] = useState(undefined);
  const [loadError, setLoadError] = useState(undefined);
  const [refreshEnabled, setRefreshEnabled] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [noteSort, setNoteSort] = useState('note_sort_created_at_desc');
  const bidService = new BidService();

  function loadQueryParams() {
    const currentQueryParams = RouterService.getCurrentQueryParams();
    if (currentQueryParams && Object.keys(currentQueryParams).length) {
      setQueryParams(currentQueryParams);
    }

    return currentQueryParams;
  }

  async function loadCounterBids() {
    setLoading(true);
    try {
      let currentParams;
      if (!initialized) {
        currentParams = loadQueryParams();
      }

      const updateParams = currentParams || queryParams;
      const params = RouterService.serializeQueryParams(updateParams);
      if (initialized) {
        RouterService.replaceQueryParams(queryParams, true);
      }

      const { bids: bidResponse, lastSync: lastSyncAtResponse } = await bidService.getCounterBids(params);
      setBids(bidResponse);
      setLastSyncedAt(lastSyncAtResponse);
    } catch (e) {
      setLoadError(e);
    }

    setLoading(false);
  }

  async function loadCounterBidFilterStats() {
    try {
      const { filterCounts } = await bidService.getCounterBidFilterStats();

      setFilterBidCounts(filterCounts);
    } catch (e) {
      /** Ignore */
    }
  }

  async function loadCounterBidStats() {
    try {
      const {
        lastSync: lastSyncAtResponse,
        totalBids: totalBidsResponse,
        soldToday,
        touchedToday,
      } = await bidService.getCounterBidStats();

      setLastSyncedAt(lastSyncAtResponse);
      setTotalBids(totalBidsResponse);
      setSoldTodayBids(soldToday);
      setTouchedTodayBids(touchedToday);
    } catch (e) {
      /** Ignore */
    }
  }

  async function handlePriorityUpdate(bid, payload) {
    return bidService.updatePriority(bid.id, payload);
  }

  async function applyQueryParams(params) {
    // eslint-disable-next-line no-unused-vars
    const newParamsArr = Object.entries(params).filter(([_, value]) => Boolean(value));
    const newParams = Object.fromEntries(newParamsArr);

    setQueryParams(newParams);
  }

  function initRefresh() {
    const localRefreshSetting = LocalStorageService.get(REFRESH_STORAGE_KEY);
    if (localRefreshSetting) {
      setRefreshEnabled(false);
      return;
    }

    setRefresh(true);
  }

  function triggerFullRefresh() {
    loadCounterBids();
    loadCounterBidStats();
  }

  function handleRefresh() {
    refreshInterval = setInterval(() => {
      if (loading) {
        return;
      }

      triggerFullRefresh();
    }, REFRESH_TIME);
  }

  function handleRefreshDisable() {
    clearInterval(refreshInterval);
  }

  function enableRefresh() {
    setRefresh(true);
  }

  function disableRefresh() {
    setRefresh(false);
  }

  useEffect(() => {
    (async () => {
      await Promise.all([loadCounterBidStats(), loadCounterBids(), loadCounterBidFilterStats()]);

      initRefresh();
      setInitialized(true);
    })();

    return () => disableRefresh();
  }, []);

  useEffect(() => {
    if (!initialized) {
      return;
    }

    (async () => {
      disableRefresh();

      if (initialized) {
        await loadCounterBids();
      }

      enableRefresh();
    })();
  }, [queryParams]);

  useEffect(() => {
    if (!refreshEnabled) {
      return;
    }

    if (refresh) {
      handleRefresh();
    } else {
      handleRefreshDisable();
    }
  }, [refresh, refreshEnabled]);

  return (
    <CounterBidContext.Provider
      value={{
        initialized,
        loading,
        loadError,
        bids,
        queryParams,
        lastSyncedAt,
        totalBids,
        soldTodayBids,
        touchedTodayBids,
        handlePriorityUpdate,
        loadCounterBidStats,
        applyQueryParams,
        enableRefresh,
        disableRefresh,
        triggerFullRefresh,
        setNoteSort,
        noteSort,
        filterBidCounts,
      }}
    >
      {children}
    </CounterBidContext.Provider>
  );
};

CounterBidContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CounterBidContextProvider;
