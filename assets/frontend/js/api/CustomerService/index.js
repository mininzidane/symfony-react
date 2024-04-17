import { BaseApiServiceInstance } from 'frontend/js/api/BaseApiService';

const CustomerService = {
  getCustomerData() {
    return BaseApiServiceInstance.get(BaseApiServiceInstance.buildRequestPath('member')).then(({ data }) => data);
  },
  getCustomer() {
    return BaseApiServiceInstance.get(BaseApiServiceInstance.buildRequestPath('customer/current', true)).then(
      ({ data }) => data,
    );
  },
  getUploadToken() {
    return BaseApiServiceInstance.get(BaseApiServiceInstance.buildRequestPath('customer/upload-token', true)).then(
      ({ data }) => data,
    );
  },
  updateAutorenewStatus(customerId, payload) {
    return BaseApiServiceInstance.post(
      BaseApiServiceInstance.buildRequestPath(`customer/${customerId}/membership-autorenew`, true),
      payload,
    ).then(({ data }) => data);
  },
  login(payload) {
    return BaseApiServiceInstance.post(BaseApiServiceInstance.buildRequestPath('login'), payload).then(
      ({ data }) => data,
    );
  },
  register(payload) {
    return BaseApiServiceInstance.post(BaseApiServiceInstance.buildRequestPath('register'), payload).then(
      ({ data }) => data,
    );
  },
  uploadUserId(customerId, payload) {
    return BaseApiServiceInstance.post(
      BaseApiServiceInstance.buildRequestPath(`customer/${customerId}/upload-id`, true),
      payload,
    ).then(({ data }) => data);
  },
  updateCustomer(payload) {
    return BaseApiServiceInstance.post(BaseApiServiceInstance.buildRequestPath('customer/current', true), payload).then(
      ({ data }) => data,
    );
  },
  updateCustomerLocale(customerId, payload) {
    return BaseApiServiceInstance.post(
      BaseApiServiceInstance.buildRequestPath(`customer/${customerId}/update-locale`, true),
      payload,
    ).then(({ data }) => data);
  },
  textNotifications(customerId, payload) {
    return BaseApiServiceInstance.post(
      BaseApiServiceInstance.buildRequestPath(`customer/${customerId}/text-notifications`, true),
      payload,
    ).then(({ data }) => data);
  },
  textNotificationsOptOut(customerId) {
    return BaseApiServiceInstance.post(
      BaseApiServiceInstance.buildRequestPath(`customer/${customerId}/text-notifications/opt-out`, true),
    ).then(({ data }) => data);
  },
  changeEmail(payload) {
    return BaseApiServiceInstance.put(
      BaseApiServiceInstance.buildRequestPath('customer/current/email', true),
      payload,
    ).then(({ data }) => data);
  },
  changePhoneNumber(payload) {
    return BaseApiServiceInstance.put(
      BaseApiServiceInstance.buildRequestPath('customer/current/phone-number', true),
      payload,
    ).then(({ data }) => data);
  },
  changePassword(payload) {
    return BaseApiServiceInstance.put(
      BaseApiServiceInstance.buildRequestPath('customer/current/pwd', true),
      payload,
    ).then(({ data }) => data);
  },
  forgotPassword(payload) {
    return BaseApiServiceInstance.post(BaseApiServiceInstance.buildRequestPath('forgot-password', true), payload).then(
      ({ data }) => data,
    );
  },
  resetPassword(payload) {
    return BaseApiServiceInstance.post(
      BaseApiServiceInstance.buildRequestPath('forgot-password/reset', true),
      payload,
    ).then(({ data }) => data);
  },
  acceptTerms(payload) {
    return BaseApiServiceInstance.post(
      BaseApiServiceInstance.buildRequestPath('customer/current/accept-terms', true),
      payload,
    ).then(({ data }) => data);
  },
  unsubscribe(payload) {
    return BaseApiServiceInstance.post(BaseApiServiceInstance.buildRequestPath('unsubscribe', true), payload).then(
      ({ data }) => data,
    );
  },
  getNotifications() {
    return BaseApiServiceInstance.get(BaseApiServiceInstance.buildRequestPath('customer/notifications', true)).then(
      ({ data }) => data,
    );
  },
  hideNotification(token) {
    return BaseApiServiceInstance.put(
      BaseApiServiceInstance.buildRequestPath(`customer/notification/${token}/hide`, true),
    ).then(({ data }) => data);
  },
  getCustomerDocuments() {
    return BaseApiServiceInstance.get(BaseApiServiceInstance.buildRequestPath('customer/documents', true)).then(
      ({ data }) => data,
    );
  },
  generateDocumentEnvelope(payload) {
    return BaseApiServiceInstance.post(
      BaseApiServiceInstance.buildRequestPath(`customer/documents/${payload.token}/envelope`, true),
      { flExport: payload.flExport },
    ).then(({ data }) => data);
  },
  updatePreferredCountry(payload) {
    return BaseApiServiceInstance.post(
      BaseApiServiceInstance.buildRequestPath('customer/preferred-country', true),
      payload,
    ).then(({ data }) => data);
  },
  checkEmail(email) {
    return BaseApiServiceInstance.get(
      BaseApiServiceInstance.buildRequestPath(`customer/check?emailAddress=${encodeURIComponent(email)}`, true),
    ).then(({ data }) => data);
  },
  getSignDocumentUrl(token) {
    return BaseApiServiceInstance.get(
      BaseApiServiceInstance.buildRequestPath(`customer/documents/${token}/sign`, true),
    ).then(({ data }) => data);
  },
  getDocumentStatus(token) {
    return BaseApiServiceInstance.get(
      BaseApiServiceInstance.buildRequestPath(`customer/documents/${token}/status`, true),
    ).then(({ data }) => data);
  },
  updateNotificationSettings({ id, ...payload }) {
    return BaseApiServiceInstance.post(
      BaseApiServiceInstance.buildRequestPath(`customer/${id}/update-notification-settings`, true),
      payload,
    ).then(({ data }) => data);
  },
  getDueInvoiceToken() {
    return BaseApiServiceInstance.get(BaseApiServiceInstance.buildRequestPath('customer/due-invoice-token', true)).then(
      ({ data }) => data,
    );
  },
  getCountriesList() {
    return BaseApiServiceInstance.get(BaseApiServiceInstance.buildRequestPath(`countries`, true)).then(
      ({ data }) => data,
    );
  },
};

export default CustomerService;
