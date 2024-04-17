import BaseApiService from '../BaseApiService';

class CrmEmailService extends BaseApiService {
  createCrmEmail(payload) {
    return this.post(this.buildProtectedRequestPath(`api/v1/crm-email`), payload).then((data) => data.data);
  }

  updateCrmEmail(crmEmailId, payload) {
    return this.post(this.buildProtectedRequestPath(`api/v1/crm-email/${crmEmailId}`), payload).then(
      (data) => data.data,
    );
  }
}

export default CrmEmailService;
