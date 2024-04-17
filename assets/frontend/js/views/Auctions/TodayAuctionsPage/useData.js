import { useQuery } from 'react-query';
import get from 'lodash/get';
import AuctionService from 'frontend/js/api/AuctionService';

function useData(auction) {
  const { isLoading, data } = useQuery(['today auctions', auction], () => AuctionService.getTodayAuctions(auction));
  const allAuctions = [...get(data, 'live', []), ...get(data, 'upcoming', [])];
  const liveAuctions = allAuctions.filter((v) => v.time.stamp * 1000 < Date.now());
  const upcomingAuctions = allAuctions.filter((v) => v.time.stamp * 1000 > Date.now());

  return [{ live: liveAuctions, upcoming: upcomingAuctions }, isLoading && !data];
}

export default useData;
