import InstantOfferServiceFrontend from 'frontend/js/api/InstantOfferService';
import BaseApiService from '../BaseApiService';

class InstantOfferService extends BaseApiService {
  editInstantOffer(instantOfferRef, payload) {
    return this.put(this.buildProtectedRequestPath(`api/v1/instant-offers/${instantOfferRef}`), payload).then(
      (data) => data.data,
    );
  }

  editPayMethod(instantOfferRef, payload) {
    return this.put(
      this.buildProtectedRequestPath(`api/v1/instant-offers/${instantOfferRef}/pay-method`),
      payload,
    ).then((data) => data.data);
  }

  recordPaymentMethod(instantOfferRef, payload) {
    return this.put(
      this.buildProtectedRequestPath(`api/v1/instant-offers/${instantOfferRef}/record-payment`),
      payload,
    ).then((data) => data.data);
  }

  acceptOffer(instantOfferRef, payload) {
    return this.put(
      this.buildProtectedRequestPath(`api/v1/instant-offers/${instantOfferRef}/accept-offer`),
      payload,
    ).then((data) => data.data);
  }

  changeOfferAmount(instantOfferRef, payload) {
    return this.put(
      this.buildProtectedRequestPath(`api/v1/instant-offers/${instantOfferRef}/offer-amount`),
      payload,
    ).then((data) => data.data);
  }

  declineOffer(instantOfferRef, payload) {
    return this.put(
      this.buildProtectedRequestPath(`api/v1/instant-offers/${instantOfferRef}/decline-offer`),
      payload,
    ).then((data) => data.data);
  }

  moveToBargainLeads(instantOfferRef, payload) {
    return this.put(
      this.buildProtectedRequestPath(`api/v1/instant-offers/${instantOfferRef}/move-to-bargain-leads`),
      payload,
    ).then((data) => data.data);
  }

  backToLeads(instantOfferRef, payload) {
    return this.put(
      this.buildProtectedRequestPath(`api/v1/instant-offers/${instantOfferRef}/back-to-leads`),
      payload,
    ).then((data) => data.data);
  }

  cancelAcceptedPrice(instantOfferRef, payload) {
    return this.put(
      this.buildProtectedRequestPath(`api/v1/instant-offers/${instantOfferRef}/cancel-accepted-offer`),
      payload,
    ).then((data) => data.data);
  }

  addPickupAddress(instantOfferRef, payload) {
    return this.put(
      this.buildProtectedRequestPath(`api/v1/instant-offers/${instantOfferRef}/pickup-address`),
      payload,
    ).then((data) => data.data);
  }

  addPickupTime(instantOfferRef, payload) {
    return this.put(
      this.buildProtectedRequestPath(`api/v1/instant-offers/${instantOfferRef}/pickup-time`),
      payload,
    ).then((data) => data.data);
  }

  addTitleInfo(instantOfferRef, payload) {
    return this.put(
      this.buildProtectedRequestPath(`api/v1/instant-offers/${instantOfferRef}/title-info`),
      payload,
    ).then((data) => data.data);
  }

  placeShippingOrder(instantOfferRef, payload) {
    return this.post(
      this.buildProtectedRequestPath(`api/v1/instant-offers/${instantOfferRef}/place-shipping-order`),
      payload,
    ).then((data) => data.data);
  }

  editVehicleInfo(instantOfferRef, payload) {
    return this.put(this.buildProtectedRequestPath(`api/v1/instant-offers/${instantOfferRef}/vehicle`), payload).then(
      (data) => data.data,
    );
  }

  completeSale(instantOfferRef, payload) {
    return this.put(
      this.buildProtectedRequestPath(`api/v1/instant-offers/${instantOfferRef}/complete-sale`),
      payload,
    ).then((data) => data.data);
  }

  routingNumber = (value) =>
    this.get(this.buildProtectedRequestPath(`api/v1/routing/${value}/number`)).then(({ data }) => data);

  post2Copart(instantOfferRef, payload) {
    return this.post(
      this.buildProtectedRequestPath(`api/v1/instant-offers/${instantOfferRef}/post2copart`),
      payload,
    ).then((data) => data.data);
  }

  removeConsignment(instantOfferRef) {
    return this.delete(
      this.buildProtectedRequestPath(`api/v1/instant-offers/${instantOfferRef}/remove-consignment`),
    ).then((data) => data.data);
  }

  getTabsOverview(params) {
    return this.get(this.buildProtectedRequestPath(`api/v1/instant-offers/tabs`), { params }).then((data) => data.data);
  }

  getCarrierServiceTypes(instantOfferRef) {
    return this.get(
      this.buildProtectedRequestPath(`api/v1/instant-offers/${instantOfferRef}/carrier-service-types`),
    ).then((data) => data.data);
  }

  createCarrierLabel(instantOfferRef, payload) {
    return this.post(
      this.buildProtectedRequestPath(`api/v1/instant-offers/${instantOfferRef}/carrier-label`),
      payload,
    ).then((data) => data.data);
  }

  assignCarrierLabel(instantOfferRef, payload) {
    return this.put(
      this.buildProtectedRequestPath(`api/v1/instant-offers/${instantOfferRef}/assign-carrier-label`),
      payload,
    ).then((data) => data.data);
  }

  sendFileUploadNotification(instantOfferRef, payload) {
    return this.post(
      this.buildProtectedRequestPath(`api/v1/instant-offers/${instantOfferRef}/file-upload-notification`),
      payload,
    ).then((data) => data.data);
  }

  uploadFiles(instantOfferRef, contentType, formData) {
    return this.post(
      this.buildProtectedRequestPath(`api/v1/instant-offers/${instantOfferRef}/upload?content-type=${contentType}`),
      formData,
    ).then(({ data }) => data);
  }

  assignAgent(instantOfferRef, payload) {
    return this.put(
      this.buildProtectedRequestPath(`api/v1/instant-offers/${instantOfferRef}/assign-agent`),
      payload,
    ).then((data) => data.data);
  }

  getFilesByContentType(instantOfferRef, contentType) {
    return this.get(
      this.buildProtectedRequestPath(`api/v1/instant-offers/${instantOfferRef}/files?content-type=${contentType}`),
    ).then(({ data }) => data);
  }

  editNearestLocationQuote(instantOfferRef, payload) {
    return this.put(
      this.buildProtectedRequestPath(`api/v1/instant-offers/${instantOfferRef}/edit-nearest-location-quote`),
      payload,
    ).then((data) => data.data);
  }

  editShippingPrice(instantOfferRef, payload) {
    return this.put(
      this.buildProtectedRequestPath(`api/v1/instant-offers/${instantOfferRef}/edit-shipping-price`),
      payload,
    ).then((data) => data.data);
  }

  getNotes(instantOfferRef) {
    return this.get(this.buildProtectedRequestPath(`api/v1/instant-offers/${instantOfferRef}/notes`)).then(
      ({ data }) => data,
    );
  }

  addNote(instantOfferRef, payload) {
    return this.post(this.buildProtectedRequestPath(`api/v1/instant-offers/${instantOfferRef}/add-note`), payload).then(
      (data) => data.data,
    );
  }

  getFileUploadNotificationTimes(instantOfferRef) {
    return this.get(
      this.buildProtectedRequestPath(`api/v1/instant-offers/${instantOfferRef}/file-upload-notification-times`),
    ).then(({ data }) => data);
  }

  sendLocationEmail(payload) {
    return this.post(this.buildProtectedRequestPath(`api/v1/instant-offers/send-location-email`), payload).then(
      (data) => data.data,
    );
  }
}

InstantOfferService.FILE_CONTENT_TYPES = {
  DOCUMENT: 'document',
  PHOTO: 'photo',
};

InstantOfferService.TITLE_TYPE_LIST = {
  CLEAN_TITLE: 'Clean title',
  SALVAGE_TITLE: 'Salvage title',
  REBUILT_TITLE: 'Rebuilt title',
  I_DO_NOT_HAVE_A_TITLE: 'I do not have a title',
};

InstantOfferService.STATUS = {
  NEW_LEADS: 'New Leads',
  PENDING_REVIEW: 'Pending Review',
  SELLER_FEEDBACK: 'Seller Feedback',
  OFFER_ACCEPTED: 'Offer Accepted',
  AWAITING_PICKUP: 'Awaiting Pick Up',
  DECLINED_LEADS: 'Declined Leads',
  BARGAIN_LEADS: 'Bargain Leads',
  AWAITING_PAYMENT: 'Awaiting Payment',
  AT_AUCTION: 'At Auction',
  SOLD: 'Sold',
};
InstantOfferService.CATEGORY_TEMPLATE = 'syc';

InstantOfferService.ALLOW_TO_SET_AGENT_STATUSES = [
  InstantOfferService.STATUS.NEW_LEADS,
  InstantOfferService.STATUS.BARGAIN_LEADS,
];

InstantOfferService.ALLOW_TO_DECLINE_STATUSES = [
  InstantOfferService.STATUS.NEW_LEADS,
  InstantOfferService.STATUS.BARGAIN_LEADS,
  InstantOfferService.STATUS.OFFER_ACCEPTED,
  InstantOfferService.STATUS.AWAITING_PICKUP,
];

InstantOfferService.ALLOW_TO_MOVE_TO_BARGAIN_STATUSES = [
  InstantOfferService.STATUS.NEW_LEADS,
  InstantOfferService.STATUS.OFFER_ACCEPTED,
  InstantOfferService.STATUS.AWAITING_PICKUP,
];

InstantOfferService.FLAT_TIRES_LIST = InstantOfferServiceFrontend.FLAT_TIRES_LIST;
InstantOfferService.CONDITION_TYPE_LIST = InstantOfferServiceFrontend.CONDITION_TYPE_LIST;
InstantOfferService.UNDER_THE_HOOD_LIST = InstantOfferServiceFrontend.UNDER_THE_HOOD_LIST;
InstantOfferService.FLOOD_OR_FIRE_DAMAGE_LIST = InstantOfferServiceFrontend.FLOOD_OR_FIRE_DAMAGE_LIST;

export default InstantOfferService;
