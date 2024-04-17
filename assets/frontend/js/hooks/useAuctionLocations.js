import { useQuery } from 'react-query';
import get from 'lodash/get';
import AuctionService from 'frontend/js/api/AuctionService';
import LotService from 'frontend/js/api/LotService';

function useAuctionLocations(auction = LotService.AUCTION_COPART) {
  const { data = {} } = useQuery(['locations_list', auction], () => AuctionService.getAuctionLocations(auction));

  return get(data, 'locations', []);
}

export default useAuctionLocations;
