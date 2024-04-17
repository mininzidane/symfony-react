import { BaseApiServiceInstance } from 'frontend/js/api/BaseApiService';

const VideoGuidesService = {
  getVideoGuides() {
    return BaseApiServiceInstance.get(BaseApiServiceInstance.buildRequestPath('video-guides', true)).then(
      ({ data }) => data,
    );
  },
  getVideoGuideByKey(key) {
    return BaseApiServiceInstance.get(BaseApiServiceInstance.buildRequestPath(`video-guides/${key}`, true)).then(
      ({ data }) => data,
    );
  },
};

export default VideoGuidesService;
