import { BaseApiServiceInstance } from 'backend/js/api/BaseApiService';

const InventoryService = {
  create(payload) {
    return BaseApiServiceInstance.post(
      BaseApiServiceInstance.buildProtectedRequestPath(`api/v1/inventory`),
      payload,
    ).then((data) => data.data);
  },
  edit(stockNumber, payload) {
    return BaseApiServiceInstance.put(
      BaseApiServiceInstance.buildProtectedRequestPath(`api/v1/inventory/${stockNumber}`),
      payload,
    ).then((data) => data.data);
  },
  searchByVin(vin) {
    return BaseApiServiceInstance.get(
      BaseApiServiceInstance.buildProtectedRequestPath(`api/v1/inventory/search/${vin}`),
    ).then((data) => data.data);
  },
  upload(stockNumber, payload) {
    return BaseApiServiceInstance.post(
      BaseApiServiceInstance.buildProtectedRequestPath(`api/v1/inventory/${stockNumber}/upload`),
      payload,
    ).then((data) => data.data);
  },
  filters(params) {
    return BaseApiServiceInstance.get(BaseApiServiceInstance.buildProtectedRequestPath(`api/v1/inventory/filters`), {
      params,
    }).then((data) => data.data);
  },
  locationCreate(payload) {
    return BaseApiServiceInstance.post(
      BaseApiServiceInstance.buildProtectedRequestPath(`api/v1/inventory/location`),
      payload,
    ).then((data) => data.data);
  },
  locationEdit(id, payload) {
    return BaseApiServiceInstance.put(
      BaseApiServiceInstance.buildProtectedRequestPath(`api/v1/inventory/location/${id}`),
      payload,
    ).then((data) => data.data);
  },
  getCatalogInventoryItem(query) {
    return BaseApiServiceInstance.get(
      BaseApiServiceInstance.buildProtectedRequestPath(`api/v1/inventory/${query}`),
    ).then((data) => data.data);
  },
  addNote(stockNumber, payload) {
    return BaseApiServiceInstance.post(
      BaseApiServiceInstance.buildProtectedRequestPath(`api/v1/inventory/add-note/${stockNumber}`),
      payload,
    ).then((data) => data.data);
  },
  createLotPurchase(stockNumber, payload) {
    return BaseApiServiceInstance.post(
      BaseApiServiceInstance.buildProtectedRequestPath(`api/v1/inventory/${stockNumber}/create-lot-purchase`),
      payload,
    ).then((data) => data.data);
  },
};

export default InventoryService;
