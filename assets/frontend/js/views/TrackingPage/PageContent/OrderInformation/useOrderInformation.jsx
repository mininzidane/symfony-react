import get from 'lodash/get';

function useOrderInformation(shippingOrder) {
  const pickUpImages = get(shippingOrder, 'driverImages', []);
  const auctionImages = get(shippingOrder, 'lot.images', []);
  const warehouseImages = get(shippingOrder, 'warehouseImages', []);
  const isInternational = get(shippingOrder, 'internationalType', false);
  const lot = get(shippingOrder, 'lot', {});

  const vehicle = lot && `${lot.year} ${lot.make} ${lot.model}`;

  const needsDocuments = {
    consignee: isInternational && !get(shippingOrder, 'consignee', false),
    bos: !get(shippingOrder, 'bosCount', false),
    userID: !get(shippingOrder, 'customer.identityDocumentCount', false),
    wireConfirmation: !get(shippingOrder, 'wireConfirmation', false),
    oceanInsurance: !get(shippingOrder, 'oceanInsurance', false),
  };

  return {
    auctionImages,
    pickUpImages,
    warehouseImages,
    isInternational,
    vehicle,
    needsDocuments,
    downloadDocuments: shippingOrder.documents,
    unloadingImages: shippingOrder?.unloadingImages || [],
  };
}

export default useOrderInformation;
