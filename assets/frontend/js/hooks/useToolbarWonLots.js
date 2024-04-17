import { useState, useEffect } from 'react';
import LotService from 'frontend/js/api/LotService';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import LocalStorageService from 'frontend/js/lib/utils/LocalStorageService';

function useToolbarWonLots() {
  const [wonLots, setWonLots] = useState(null);
  const { isAuthenticated } = useCustomerHelper();
  const lotWonLocalStorageKey = 'Abm::BidStatusLotWon';
  const dismissedLotsIds = LocalStorageService.get(lotWonLocalStorageKey);

  const filterWonLots = (lots) => {
    if (dismissedLotsIds && dismissedLotsIds.length) {
      return lots.filter((lot) => !dismissedLotsIds.includes(lot.id));
    }

    return lots;
  };

  const getUsersCurrentlyWonLot = () => {
    LotService.getUsersCurrentlyWonLot()
      .then((response) => {
        const lots = response && response.data && response.data.contents;

        if (lots && lots.length) {
          setWonLots(filterWonLots(lots));
        }
      })
      .catch(() => {
        /** Ignore */
      });
  };

  function saveDismissedLots(lots) {
    const wonLotsIds = lots.map((lot) => lot.id);
    const newDismissedLotsIds =
      dismissedLotsIds && dismissedLotsIds.length ? [...dismissedLotsIds, ...wonLotsIds] : wonLotsIds;

    LocalStorageService.set(lotWonLocalStorageKey, newDismissedLotsIds);
    setWonLots([]);
  }

  useEffect(() => {
    if (isAuthenticated) {
      getUsersCurrentlyWonLot();
    }
  }, [isAuthenticated]);

  const isBadgeShown = wonLots && wonLots.length > 0;

  return { wonLots, isBadgeShown, saveDismissedLots };
}

export default useToolbarWonLots;
