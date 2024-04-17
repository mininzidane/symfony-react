import RouterService from 'frontend/js/api/RouterService';
import AuctionService from 'frontend/js/api/AuctionService';

function preparePurchaseData(lotPurchase, lot, invoice) {
  const prepareData = {
    id: null,
    href: null,
    auction: null,
    fullName: null,
    purchaseDate: null,
    vehicleImage: null,
    ymm: null,
    vin: null,
    vehicleType: null,
    locationState: null,
    portOfLoading: null,
    titleStatus: null,
  };

  const { firstName, lastName } = lotPurchase?.customer || invoice?.customer || {};
  prepareData.fullName = firstName || lastName ? `${firstName} ${lastName}` : null;

  if (lot) {
    const { id, slug, largeImage, location, vehicleTypeLabel } = lot;
    prepareData.href = RouterService.getRoute('lot', null, false, { id, slug });
    if (location) {
      prepareData.locationState = location?.name;
    }
    prepareData.vehicleImage = largeImage;
    prepareData.vehicleType = vehicleTypeLabel;
  }

  if (!lotPurchase && lot) {
    const { id, year, make, model, vin, inventoryAuction } = lot;
    prepareData.id = id;
    prepareData.auction = inventoryAuction;
    prepareData.ymm = `${year} ${make} ${model}`;
    prepareData.vin = vin;
  }

  if (!lotPurchase && !lot && invoice?.shippingOrder?.lot) {
    const { id, year, make, model, vin } = invoice.shippingOrder.lot;
    prepareData.id = id;
    prepareData.ymm = `${year} ${make} ${model}`;
    prepareData.vin = vin;
    prepareData.auction = invoice.auction;
  }

  if (lotPurchase) {
    const {
      lotNumber,
      auction,
      auctionLocation,
      saleDate,
      saleLocation,
      vehicleYear,
      vehicleMake,
      vehicleModel,
      vehicleVin,
      vehicleTypeLabel,
      titleStatus,
    } = lotPurchase;
    prepareData.id = lotNumber;
    prepareData.auction = auction || prepareData.auction || AuctionService.auctionNames.COPART;
    if (auctionLocation) {
      prepareData.auctionFullName = `${auctionLocation?.auction} ${auctionLocation?.name}`;
    }
    prepareData.purchaseDate = saleDate;
    prepareData.ymm = `${vehicleYear} ${vehicleMake} ${vehicleModel}`;
    prepareData.vin = vehicleVin;
    prepareData.vehicleType = vehicleTypeLabel || prepareData.vehicleType || null;
    prepareData.titleStatus = titleStatus;
    if (saleLocation) {
      prepareData.locationState = saleLocation?.name;
    }
  }

  return prepareData;
}

export default preparePurchaseData;
