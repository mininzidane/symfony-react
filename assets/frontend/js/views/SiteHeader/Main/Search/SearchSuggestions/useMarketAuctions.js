import { useMemo } from 'react';
import BootstrapService from 'frontend/js/api/BootstrapService';
import LotService from 'frontend/js/api/LotService';

const availableAuctions = BootstrapService.getAvailableAuctions();
function useMarketAuctions(marketKey) {
  return useMemo(() => {
    let marketAuctions = availableAuctions;
    if (marketKey === LotService.MARKET_DE) {
      marketAuctions = availableAuctions.filter((auction) => auction === LotService.AUCTION_COPART_DE);
    } else if (marketKey === LotService.MARKET_US_CAN) {
      marketAuctions = availableAuctions.filter((auction) => auction !== LotService.AUCTION_COPART_DE);
    }

    return marketAuctions.join(',');
  }, [marketKey]);
}

export default useMarketAuctions;
