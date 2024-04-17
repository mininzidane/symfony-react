import LotService from 'frontend/js/api/LotService';
import useAuctionLocations from 'frontend/js/hooks/useAuctionLocations';

function useAuctionLocation(id, auction = LotService.AUCTION_COPART) {
  const locations = useAuctionLocations(auction);

  const location = locations.find((item) => item.id === id);
  return location;
}

export default useAuctionLocation;
