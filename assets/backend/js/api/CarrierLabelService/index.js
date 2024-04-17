import BaseApiService from '../BaseApiService';

class CarrierLabel extends BaseApiService {
  remove(id) {
    return this.delete(this.buildProtectedRequestPath(`api/v1/label/${id}`));
  }

  generateLabels(id, payload) {
    return this.post(this.buildProtectedRequestPath(`api/v1/title-receive/${id}/generate-labels`), payload).then(
      ({ data }) => data,
    );
  }

  getPdfLinks(formData) {
    return this.post(this.buildProtectedRequestPath(`api/v1/label/pdf-links`), formData).then(({ data }) => data);
  }
}

export default CarrierLabel;
