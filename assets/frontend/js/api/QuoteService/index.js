import { BaseApiServiceInstance } from 'frontend/js/api/BaseApiService';

const QuoteService = {
  getQuotes(iso2) {
    return BaseApiServiceInstance.get(BaseApiServiceInstance.buildRequestPath(`quote/ocean/${iso2}`, true)).then(
      ({ data }) => data,
    );
  },
};

export default QuoteService;
