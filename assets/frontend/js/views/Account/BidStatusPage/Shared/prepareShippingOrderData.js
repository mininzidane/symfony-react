import t from 'frontend/js/api/TranslatorService';

function prepareShippingOrderData(shippingOrder) {
  const prepareData = {
    titleReceived: null,
    keys: null,
    vehicleCategory: null,
    departureDateFromUS: null,
    estDeliveryDate: null,
    bookingId: null,
    containerId: null,
    shippingLine: null,
    shippingLineUrl: null,
    token: null,
    portOfLoading: null,
    portOfDestination: null,
    pickUpDateEst: null,
    pickUpDateAct: null,
    titleStatus: null,
    deliveredToWarehouseEst: null,
    deliveredToWarehouseAct: null,
    documents: [],
    billOfLading: null,
  };

  if (!shippingOrder) {
    return prepareData;
  }

  prepareData.containerId = shippingOrder?.container || null;
  prepareData.bookingId = shippingOrder?.booking || null;
  prepareData.keys = shippingOrder?.vehicleKey || null;
  prepareData.vehicleCategory = shippingOrder?.vehicleCategory || null;
  prepareData.departureDateFromUS = shippingOrder?.etd || null;
  prepareData.titleReceived = shippingOrder?.titleWarehouseReceived || null;
  prepareData.estDeliveryDate = shippingOrder?.eta || null;
  prepareData.shippingLine = shippingOrder?.shippingLine || null;
  prepareData.shippingLineUrl = shippingOrder?.shippingLineUrl || null;
  prepareData.token = shippingOrder.token || null;

  prepareData.portOfLoading = shippingOrder?.originName?.split(',').pop().trim() || null;
  prepareData.portOfDestination = shippingOrder?.destination?.split(' - ').pop().trim() || null;
  prepareData.pickUpDateEst = shippingOrder?.estimatedDelivery;
  prepareData.pickUpDateAct = shippingOrder?.pickedUp;
  prepareData.deliveredToWarehouseEst = shippingOrder?.scheduledPickup;
  prepareData.deliveredToWarehouseAct = shippingOrder?.delivered;
  prepareData.titleStatus = shippingOrder?.titleStatus;
  if (shippingOrder?.billOfLading) {
    prepareData.billOfLading = shippingOrder.billOfLading;
    prepareData.documents.push({ name: t('trackingPage.label.billOfLading'), url: shippingOrder.billOfLading.s3_url });
  }
  if (shippingOrder?.documents) {
    prepareData.documents.push(...shippingOrder.documents);
  }
  return prepareData;
}

export default prepareShippingOrderData;
