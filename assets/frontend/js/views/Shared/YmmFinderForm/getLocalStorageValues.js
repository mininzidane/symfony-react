import LocalStorageService from 'frontend/js/lib/utils/LocalStorageService';

function getLocalStorageValues(localStorageKey) {
  const localStoreParams = LocalStorageService.get(localStorageKey) || {};

  return {
    localMake: localStoreParams.make,
    localModel: localStoreParams.model,
    localYearFrom: localStoreParams.year_from,
    localYearTo: localStoreParams.year_to,
    localLocation: localStoreParams.sale_location_id,
  };
}

export default getLocalStorageValues;
