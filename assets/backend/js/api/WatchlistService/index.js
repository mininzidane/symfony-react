import BaseApiService from '../BaseApiService';

class WatchlistService extends BaseApiService {
  addToWatchlist(customerId, auction, stockNumber) {
    const payload = { customerId, auction, stockNumber };

    return this.post(this.buildProtectedRequestPath(`api/v1/watchlist/add`), payload).then((data) => data.data);
  }

  removeFromWatchlist(customerId, auction, stockNumber) {
    const payload = { customerId, auction, stockNumber };

    return this.post(this.buildProtectedRequestPath(`api/v1/watchlist/remove`), payload).then((data) => data.data);
  }
}

export default WatchlistService;
