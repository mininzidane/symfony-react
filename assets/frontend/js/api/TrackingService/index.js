import BaseApiService from '../BaseApiService';

class TrackingService extends BaseApiService {
  getShippingOrderTracking({ vin, emailOrToken }) {
    return this.get(
      this.buildRequestPath(`shipping-order/tracking/${encodeURIComponent(emailOrToken)}/${vin}`, true),
    ).then(({ data }) => data);
  }
}

TrackingService.STATUS_AWAITING_PAYMENT = 'Awaiting Payment';
TrackingService.STATUS_AWAITING_PICKUP = 'Awaiting Pickup';
TrackingService.STATUS_CANCELLED = 'Cancelled';
TrackingService.STATUS_DELIVERED = 'Delivered';
TrackingService.STATUS_EXPIRED = 'Expired';
TrackingService.STATUS_IN_TRANSIT = 'In Transit';
TrackingService.STATUS_REMOVED_FROM_WEBSITE = 'Removed from website';
TrackingService.STATUS_SAILING = 'Sailing';
TrackingService.STATUS_WAREHOUSE = 'Warehouse';
TrackingService.STATUS_PORT = 'Port';

export default TrackingService;
