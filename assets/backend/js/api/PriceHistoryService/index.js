import BaseApiService from '../BaseApiService';

class PriceHistoryService extends BaseApiService {
  getPriceHistory(params = {}) {
    const queryString = PriceHistoryService.objectToQueryParams(params);

    return this.get(this.buildProtectedRequestPath(`api/v1/price-history?${queryString}`, true)).then(
      (data) => data.data,
    );
  }

  downloadPriceHistory(params = {}) {
    const queryString = PriceHistoryService.objectToQueryParams(params);

    return this.get(this.buildProtectedRequestPath(`api/v1/price-history/download?${queryString}`, true), {
      responseType: 'blob',
    }).then((response) => {
      let fileName = PriceHistoryService.getFilenameFromResponse(response);
      if (!fileName) {
        fileName = 'PriceHistory.csv';
      }

      PriceHistoryService.createDownloadFromResponse(response, fileName);
    });
  }

  getSoldMakes() {
    return this.get(this.buildProtectedRequestPath(`api/v1/price-history/make-filters`, true)).then(
      (data) => data.data,
    );
  }

  getSoldModelsByMake(make) {
    return this.get(this.buildProtectedRequestPath(`api/v1/price-history/model-filters?make=${make}`, true)).then(
      (data) => data.data,
    );
  }

  getSoldYears(make = null, model = null) {
    const params = {};
    if (make) {
      params.make = make;
    }

    if (model) {
      params.model = model;
    }

    const queryString = PriceHistoryService.objectToQueryParams(params);
    return this.get(this.buildProtectedRequestPath(`api/v1/price-history/year-filters?${queryString}`, true)).then(
      (data) => data.data,
    );
  }

  getBidAvg(params = {}) {
    const queryString = PriceHistoryService.objectToQueryParams(params);

    return this.get(this.buildProtectedRequestPath(`api/v1/price-history/bid-avg?${queryString}`, true)).then(
      (data) => data.data,
    );
  }

  getLotSoldDamages() {
    return this.get(this.buildProtectedRequestPath(`api/v1/price-history/damage-filters`, true)).then(
      (data) => data.data,
    );
  }

  getLotSoldLocations() {
    return this.get(this.buildProtectedRequestPath(`api/v1/price-history/location-filters`, true)).then(
      (data) => data.data,
    );
  }
}

export default PriceHistoryService;
