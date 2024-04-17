import { BaseApiServiceInstance } from 'frontend/js/api/BaseApiService';

const SpaMetaDataService = {
  getMetaData(metaKey, locale, additionalArgs = {}) {
    const args = {
      keyword: metaKey,
      ...additionalArgs,
    };

    if (locale) {
      // eslint-disable-next-line no-underscore-dangle
      args._locale = locale;
    }

    const queryString = BaseApiServiceInstance.objectToQueryParams(args);
    return BaseApiServiceInstance.get(BaseApiServiceInstance.buildRequestPath(`seo-content?${queryString}`, true)).then(
      ({ data }) => data,
    );
  },
};

export default SpaMetaDataService;
