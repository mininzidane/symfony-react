import { BaseApiServiceInstance } from 'frontend/js/api/BaseApiService';

const WatchlistService = {
  getCurrentWatchlistLots(path) {
    return BaseApiServiceInstance.get(BaseApiServiceInstance.buildRequestPath(`watchlist?${path}`, true)).then(
      ({ data }) => data,
    );
  },
  getCompletedWatchlistLots(path) {
    return BaseApiServiceInstance.get(BaseApiServiceInstance.buildRequestPath(`watchlist/complete?${path}`, true)).then(
      ({ data }) => data,
    );
  },
  updateWatchlistNotificationSettings(payload) {
    return BaseApiServiceInstance.post(
      BaseApiServiceInstance.buildRequestPath('watchlist/settings', true),
      payload,
    ).then(({ data }) => data);
  },
};

export default WatchlistService;
