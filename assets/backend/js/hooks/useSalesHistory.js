import { useState, useEffect } from 'react';
import LotService from 'backend/js/api/LotService';

function useSalesHistory(vehicleVin = null, withPurchases = false) {
  const [lots, setLots] = useState([]);
  const [purchases, setPurchases] = useState([]);

  const [saleHistoryCacheItem, setSaleHistoryCacheItem] = useState(undefined);
  const [salesHistoryMap, setSalesHistoryMap] = useState({});

  async function getSalesHistory(vin, forceLoad = false) {
    if (salesHistoryMap[vin] && !forceLoad) {
      return salesHistoryMap[vin];
    }
    try {
      const { lots: saleHistoryLots, purchases: purchasesList } = await LotService.getHistory(vin, withPurchases);

      setSaleHistoryCacheItem({ [vin]: saleHistoryLots || [] });
      setPurchases(purchasesList);

      return saleHistoryLots;
    } catch (e) {
      /** Ignore */
    }

    return [];
  }

  useEffect(() => {
    if (saleHistoryCacheItem) {
      const newSalesHistoryMap = {
        ...salesHistoryMap,
        ...saleHistoryCacheItem,
      };

      setSalesHistoryMap(newSalesHistoryMap);
    }
  }, [saleHistoryCacheItem]);

  async function loadLots() {
    if (!vehicleVin) {
      return;
    }

    try {
      const saleHistoryLots = await getSalesHistory(vehicleVin);
      setLots(saleHistoryLots);
    } catch (e) {
      /** Ignore */
    }
  }

  useEffect(() => {
    loadLots();
  }, [vehicleVin]);

  return { lots, getSalesHistory, purchases };
}

export default useSalesHistory;
