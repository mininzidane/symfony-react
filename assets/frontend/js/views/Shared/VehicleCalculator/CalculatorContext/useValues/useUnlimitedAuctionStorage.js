import CountryService from 'frontend/js/api/CountryService';
import ShippingOrderService from 'frontend/js/api/ShippingOrderService';
import LotService from 'frontend/js/api/LotService';

function useUnlimitedAuctionStorage({ values }) {
  const isIntl = !CountryService.isDomestic();
  if (!isIntl || values.auction === LotService.AUCTION_COPART_DE) {
    return 0;
  }

  return ShippingOrderService.UNLIMITED_AUCTION_STORAGE;
}

export default useUnlimitedAuctionStorage;
