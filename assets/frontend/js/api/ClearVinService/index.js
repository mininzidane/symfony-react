import { BaseApiServiceInstance } from 'frontend/js/api/BaseApiService';

const ClearVinService = {
  getPreview(lotId, auction) {
    return BaseApiServiceInstance.get(
      BaseApiServiceInstance.buildRequestPath(`clearvin/preview/${lotId}?auction=${auction}`, true),
    ).then(({ data }) => data);
  },
};

export default ClearVinService;
