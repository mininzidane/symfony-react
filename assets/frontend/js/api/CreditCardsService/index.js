import { BaseApiServiceInstance } from 'frontend/js/api/BaseApiService';

const CreditCardsService = {
  makePrimary(token) {
    return BaseApiServiceInstance.put(BaseApiServiceInstance.buildRequestPath(`credit-cards/${token}`, true), {
      preferred: true,
    }).then(({ data }) => data);
  },
  addNewCard(payload) {
    return BaseApiServiceInstance.post(BaseApiServiceInstance.buildRequestPath(`credit-cards`, true), payload).then(
      ({ data }) => data,
    );
  },
  editCard(payload, token) {
    return BaseApiServiceInstance.put(
      BaseApiServiceInstance.buildRequestPath(`credit-cards/${token}`, true),
      payload,
    ).then(({ data }) => data);
  },
  removeCard(token) {
    return BaseApiServiceInstance.delete(BaseApiServiceInstance.buildRequestPath(`credit-cards/${token}`, true)).then(
      ({ data }) => data,
    );
  },
  autochargeService(payload) {
    return BaseApiServiceInstance.post(
      BaseApiServiceInstance.buildRequestPath(`member/toggle-autocharge-service`),
      payload,
    ).then(({ data }) => data);
  },
  getCreditCard(token) {
    return BaseApiServiceInstance.get(BaseApiServiceInstance.buildRequestPath(`credit-cards/${token}`, true)).then(
      ({ data }) => data,
    );
  },
  getCreditCards(includeBin) {
    return BaseApiServiceInstance.get(
      BaseApiServiceInstance.buildRequestPath(`credit-cards${includeBin ? `?includeBin=${includeBin}` : ''}`, true),
    ).then(({ data }) => data);
  },
};

export default CreditCardsService;
