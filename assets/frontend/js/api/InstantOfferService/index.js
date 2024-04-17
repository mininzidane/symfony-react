import { BaseApiServiceInstance } from 'frontend/js/api/BaseApiService';

const InstantOfferService = {
  createInstantOffer(payload) {
    return BaseApiServiceInstance.post(BaseApiServiceInstance.buildRequestPath(`instant-offer`, true), payload).then(
      ({ data }) => data,
    );
  },

  accept(instantOfferRef) {
    return BaseApiServiceInstance.patch(
      BaseApiServiceInstance.buildRequestPath(`instant-offer/accept/${instantOfferRef}`, true),
    ).then(({ data }) => data);
  },

  getInstantOffer(instantOfferRef, hash) {
    return BaseApiServiceInstance.get(
      BaseApiServiceInstance.buildRequestPath(`instant-offer/ref/${instantOfferRef}?hash=${hash}`, true),
    ).then(({ data }) => data);
  },

  updateInstantOffer(instantOfferRef, formData) {
    return BaseApiServiceInstance.post(
      BaseApiServiceInstance.buildRequestPath(`instant-offer/${instantOfferRef}/update`, true),
      formData,
    ).then(({ data }) => data);
  },

  saveDraft(payload) {
    return BaseApiServiceInstance.post(
      BaseApiServiceInstance.buildRequestPath(`instant-offer/draft`, true),
      payload,
    ).then(({ data }) => data);
  },

  editPayMethod(instantOfferRef, payload) {
    return BaseApiServiceInstance.put(
      BaseApiServiceInstance.buildRequestPath(`instant-offer/pay-method/${instantOfferRef}`, true),
      payload,
    ).then(({ data }) => data);
  },

  editPickupInfo(instantOfferRef, payload) {
    return BaseApiServiceInstance.put(
      BaseApiServiceInstance.buildRequestPath(`instant-offer/pickup/${instantOfferRef}`, true),
      payload,
    ).then(({ data }) => data);
  },

  uploadFiles(instantOfferRef, hash, contentType, formData) {
    return BaseApiServiceInstance.post(
      BaseApiServiceInstance.buildRequestPath(
        `instant-offer/${instantOfferRef}/upload?hash=${hash}&content-type=${contentType}`,
        true,
      ),
      formData,
    ).then(({ data }) => data);
  },

  updateFiles(instantOfferRef, hash, contentType, formData) {
    return BaseApiServiceInstance.post(
      BaseApiServiceInstance.buildRequestPath(
        `instant-offer/${instantOfferRef}/update-files?hash=${hash}&content-type=${contentType}`,
        true,
      ),
      formData,
    ).then(({ data }) => data);
  },

  deleteFile(id, hash) {
    return BaseApiServiceInstance.delete(
      BaseApiServiceInstance.buildRequestPath(`instant-offer/delete-file/${id}?hash=${hash}`, true),
    ).then(({ data }) => data);
  },

  title(instantOfferRef, hash, payload) {
    return BaseApiServiceInstance.put(
      BaseApiServiceInstance.buildRequestPath(`instant-offer/${instantOfferRef}/title?hash=${hash}`, true),
      payload,
    ).then(({ data }) => data);
  },

  removeInstantOffer(instantOfferRef) {
    return BaseApiServiceInstance.delete(
      BaseApiServiceInstance.buildRequestPath(`instant-offer/${instantOfferRef}`, true),
    ).then(({ data }) => data);
  },

  getColors() {
    return BaseApiServiceInstance.get(BaseApiServiceInstance.buildRequestPath('instant-offer/colors', true)).then(
      ({ data }) => data,
    );
  },
};

InstantOfferService.STATUSES = {
  PENDING_REVIEW: 'Pending Review',
  SELLER_FEEDBACK: 'Seller Feedback',
};

InstantOfferService.FILE_CONTENT_TYPES = {
  DOCUMENT: 'document',
  PHOTO: 'photo',
  VIDEO: 'video',
};

InstantOfferService.TITLE_TYPE_LIST = {
  CLEAN_TITLE: 'Clean title',
  SALVAGE_TITLE: 'Salvage title',
  REBUILT_TITLE: 'Rebuilt title',
  I_DO_NOT_HAVE_A_TITLE: 'I do not have a title',
};

InstantOfferService.CONDITION_TYPE_LIST = {
  STARTS_AND_DRIVES: 'Starts and drives',
  STARTS_BUT_DOES_NOT_DRIVE: "Starts but doesn't drive",
  DOES_NOT_START: 'Does not start',
};

InstantOfferService.FLAT_TIRES_LIST = {
  ALL_WHEELS_ARE_MOUNTED: 'All wheels are mounted and tires are inflated',
  ONE_OR_MORE_TIRES_ARE_FLAT: 'One or more tires are flat',
  ONE_OR_MORE_WHEELS_ARE_REMOVED: 'One or more wheels are removed',
};

InstantOfferService.FLOOD_OR_FIRE_DAMAGE_LIST = {
  FIRE: 'Fire',
  FLOOD: 'Flood',
  NONE: 'None',
};

InstantOfferService.CAR_PHOTO_KEYS = {
  PASSENGER_SIDE_FRONT_ANGLE: 'passenger-side-front-angle',
  DRIVER_SIDE_FRONT_ANGLE: 'driver-side-front-angle',
  DRIVER_SIDE_REAR_ANGLE: 'driver-side-rear-angle',
  PASSENGER_SIDE_REAR_ANGLE: 'passenger-side-rear-angle',
  PASSENGER_FRONT_INTERIOR: 'passenger-front-interior',
  PASSENGER_SIDE_REAR_INTERIOR: 'passenger-side-rear-interior',
  INTERIOR: 'interior',
  OPEN_HOOD_ENGINE: 'open-hood-engine',
  ODOMETER: 'odometer',
  VIN: 'vin',
};

InstantOfferService.UNDER_THE_HOOD_LIST = {
  ENGINE_PROPERLY_INSTALLED: 'The engine and transmission are intact and properly installed',
  MISSING_PARTS: 'The engine and/or transmission are missing parts',
  ENGINE_REMOVED: 'The engine and/or transmission are removed',
};

export default InstantOfferService;
