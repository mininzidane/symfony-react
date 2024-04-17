import BaseApiService from '../BaseApiService';

class CustomerParentService extends BaseApiService {
  createCustomerParent(payload) {
    return this.post(this.buildProtectedRequestPath(`api/v1/customer-parent`), payload).then((data) => data.data);
  }

  updateCustomerParent(customerParentId, payload) {
    return this.post(this.buildProtectedRequestPath(`api/v1/customer-parent/${customerParentId}`), payload).then(
      (data) => data.data,
    );
  }

  partialUpdate(customerParentId, values) {
    return this.post(this.buildProtectedRequestPath(`api/v1/customer-parent/${customerParentId}/partial`), values).then(
      (data) => data.data,
    );
  }

  addNote(customerParentId, payload) {
    return this.post(
      this.buildProtectedRequestPath(`api/v1/customer-parent/${customerParentId}/add-note`),
      payload,
    ).then((data) => data.data);
  }

  uploadFile(customerParentId, formData) {
    return this.post(
      this.buildProtectedRequestPath(`api/v1/customer-parent/${customerParentId}/upload-file`),
      formData,
    ).then((data) => data.data);
  }

  getCustomerParentNotes(customerParentId) {
    return this.get(this.buildProtectedRequestPath(`api/v1/customer-parent/${customerParentId}/notes`)).then(
      (data) => data.data,
    );
  }

  getCustomers(customerParentId, sort, order, page) {
    return this.get(this.buildProtectedRequestPath(`api/v1/customer-parent/${customerParentId}/customers`), {
      params: { sort, order, page },
    }).then((data) => data.data);
  }

  getStats(customerParentId, params) {
    return this.get(this.buildProtectedRequestPath(`api/v1/customer-parent/${customerParentId}/stats`), {
      params,
    }).then((data) => data.data);
  }
}

export default CustomerParentService;
