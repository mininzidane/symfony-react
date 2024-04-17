/* eslint-disable import/prefer-default-export */
import { BaseApiServiceInstance } from 'frontend/js/api/BaseApiService';
import RouterService from 'frontend/js/api/RouterService';

const BrokerService = {
  getContainers() {
    return BaseApiServiceInstance.get(
      BaseApiServiceInstance.buildRequestPath('broker-admin/shipping-orders-containers', true),
    ).then(({ data }) => data);
  },
  getShippingOrders(queryString) {
    return BaseApiServiceInstance.get(
      BaseApiServiceInstance.buildRequestPath(`broker-admin/shipping-orders?${queryString}`, true),
    ).then(({ data }) => data);
  },
  getBidders(queryString) {
    return BaseApiServiceInstance.get(
      BaseApiServiceInstance.buildRequestPath(`broker-admin/bidders?${queryString}`, true),
    ).then(({ data }) => data);
  },
  addBidder(payload) {
    return BaseApiServiceInstance.post(
      BaseApiServiceInstance.buildRequestPath('broker-admin/bidders/new', true),
      payload,
    ).then(({ data }) => data);
  },
  updateBidder({ bidderId, ...payload }) {
    return BaseApiServiceInstance.put(
      BaseApiServiceInstance.buildRequestPath(`broker-admin/bidders/${bidderId}`, true),
      payload,
    ).then(({ data }) => data);
  },
};

export const createOrUpdateBidder =
  (queryClient) =>
  ({ customer }) => {
    const sort = RouterService.getQueryParam('sort');
    const order = RouterService.getQueryParam('order');
    const queryString = RouterService.serializeQueryParams({ page: 1, sort, order });

    const bidders = queryClient.getQueryData(['bidders-data', queryString]);

    let found = false;
    const preparedBidders = bidders.data.map((bidder) => {
      if (bidder.id === customer.id) {
        found = true;
        return customer;
      }
      return bidder;
    });

    queryClient.setQueryData(['bidders-data', queryString], {
      data: !found ? [customer, ...preparedBidders] : preparedBidders,
      currentPage: 1,
      size: bidders.size,
      total: bidders.total + 1,
    });
  };

export default BrokerService;
