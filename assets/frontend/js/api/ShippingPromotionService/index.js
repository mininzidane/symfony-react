import BaseApiService from '../BaseApiService';

class ShippingPromotionService extends BaseApiService {
  getShippingPromotionData() {
    return this.get(this.buildRequestPath(`lot-purchase/high-bid-won`)).then(({ data }) => data);
  }
}

export default ShippingPromotionService;
