import { BaseApiServiceInstance } from 'frontend/js/api/BaseApiService';

const SavedSearchesService = {
  getSavedSearches(queryString) {
    return BaseApiServiceInstance.get(
      BaseApiServiceInstance.buildRequestPath(`saved-searches?showTotals=true&${queryString}`, true),
    ).then(({ data }) => data);
  },
  updateSavedSearch({ id, ...payload }) {
    return BaseApiServiceInstance.post(
      BaseApiServiceInstance.buildRequestPath(`saved-searches/${id}`, true),
      payload,
    ).then(({ data }) => data);
  },
  deleteSavedSearch(id) {
    return BaseApiServiceInstance.delete(
      BaseApiServiceInstance.buildRequestPath(`saved-searches/${id}/delete`, true),
    ).then(({ data }) => data);
  },
  getSavedSearchesCount() {
    return BaseApiServiceInstance.get(BaseApiServiceInstance.buildRequestPath('saved-searches/counter', true)).then(
      ({ data }) => data,
    );
  },
  createSavedSearch(payload) {
    return BaseApiServiceInstance.post(BaseApiServiceInstance.buildRequestPath('saved-searches', true), payload).then(
      ({ data }) => data,
    );
  },
};

export default SavedSearchesService;
