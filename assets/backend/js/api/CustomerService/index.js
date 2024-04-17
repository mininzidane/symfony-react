import BaseApiService from '../BaseApiService';

class CustomerService extends BaseApiService {
  getCustomer(customerId) {
    return this.get(this.buildProtectedRequestPath(`api/v1/customer/${customerId}`)).then(({ data }) => data);
  }

  updateCustomer(customerId, payload) {
    return this.post(this.buildProtectedRequestPath(`api/v1/customer/${customerId}`), payload).then(({ data }) => data);
  }

  changeTextNotifications(customerId, payload) {
    return this.put(this.buildProtectedRequestPath(`api/v1/${customerId}/text-notifications`), payload).then(
      (data) => data.data,
    );
  }

  getUnpaidInvoices(customerId) {
    return this.get(this.buildProtectedRequestPath(`api/v1/customer/${customerId}/unpaid-invoices`)).then(
      (data) => data.data,
    );
  }

  uploadId(customerId, payload) {
    return this.post(this.buildProtectedRequestPath(`api/v1/customer/${customerId}/upload-id`), payload).then(
      (data) => data.data,
    );
  }

  addNote(customerId, payload) {
    return this.post(this.buildProtectedRequestPath(`api/v1/customer/${customerId}/add-note`), payload).then(
      (data) => data.data,
    );
  }

  suggestSearch(q) {
    return this.get(this.buildProtectedRequestPath(`customers/detailed-suggest-search?q=${q}`)).then(
      (data) => data.data,
    );
  }

  getNotesGroupList(customerId, category, params) {
    const queryString = BaseApiService.objectToQueryParams(params);
    return this.get(
      this.buildProtectedRequestPath(`api/v1/customer/${customerId}/${category}/note-groups?${queryString}`),
    ).then((data) => data.data);
  }

  getNotesByGroup(customerId, categoryKey, params) {
    const queryString = BaseApiService.objectToQueryParams(params);
    return this.get(
      this.buildProtectedRequestPath(`api/v1/customer/${customerId}/${categoryKey}/notes?${queryString}`),
    ).then((data) => data.data);
  }

  createGroupNote(customerId, categoryKey, payload) {
    return this.post(
      this.buildProtectedRequestPath(`api/v1/customer/${customerId}/note-groups/${categoryKey}`),
      payload,
    ).then((data) => data.data);
  }
}

CustomerService.STATUSES = {
  A: 'Active',
  I: 'Inactive',
  S: 'Suspended',
  T: 'Terminated',
  V: 'Vacant',
  R: 'Reset',
};

export default CustomerService;
