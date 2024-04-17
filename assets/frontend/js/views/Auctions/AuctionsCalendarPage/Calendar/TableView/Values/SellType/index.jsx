import LotService from 'frontend/js/api/LotService';

function SellType({ auction }) {
  const inventoryAuction = auction.inventoryAuction?.toUpperCase();

  if (inventoryAuction === LotService.AUCTION_COPART.toUpperCase()) {
    return 'Copart US';
  }

  if (inventoryAuction === LotService.AUCTION_COPART_DE.toUpperCase()) {
    return 'Copart DE';
  }

  return inventoryAuction;
}

export default SellType;
