import { BaseApiServiceInstance } from 'frontend/js/api/BaseApiService';

const SearchService = {
  getSearchResults(query) {
    return BaseApiServiceInstance.get(BaseApiServiceInstance.buildRequestPath(`inventory/search?${query}`, true)).then(
      ({ data }) => data,
    );
  },
  getFilters(query) {
    return BaseApiServiceInstance.get(
      BaseApiServiceInstance.buildRequestPath(`inventory/search/filters?${query}`, true),
    ).then(({ data }) => data);
  },
  getLoungeInventory(query) {
    return BaseApiServiceInstance.get(
      BaseApiServiceInstance.buildRequestPath(`inventory/search/lounge-inventory?${query}`, true),
    ).then(({ data }) => data);
  },
  getNpaInventory() {
    return BaseApiServiceInstance.get(
      BaseApiServiceInstance.buildRequestPath(`inventory/search/npa-popular`, true),
    ).then(({ data }) => data);
  },
  getDeInventory() {
    return BaseApiServiceInstance.get(
      BaseApiServiceInstance.buildRequestPath(`inventory/search/de-popular`, true),
    ).then(({ data }) => data);
  },
};

export default SearchService;
