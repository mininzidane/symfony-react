import { BaseApiServiceInstance } from 'frontend/js/api/BaseApiService';

const CatalogService = {
  getInventory() {
    return BaseApiServiceInstance.get(BaseApiServiceInstance.buildRequestPath('homepage-inventory', true)).then(
      ({ data }) => data,
    );
  },
  getBestDeals() {
    return BaseApiServiceInstance.get(BaseApiServiceInstance.buildRequestPath('best-deals', true)).then(
      ({ data }) => data,
    );
  },
  getVehicleFinderInventory() {
    return BaseApiServiceInstance.get(BaseApiServiceInstance.buildRequestPath('vehicle-finder-inventory', true)).then(
      ({ data }) => data,
    );
  },
};

export default CatalogService;
