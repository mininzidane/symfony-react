/* eslint-disable react/prop-types */
import React, { useCallback } from 'react';
import VehicleVerticalCard from 'frontend/js/views/Shared/VehicleVerticalCard';
import preparePurchaseData from 'frontend/js/views/Account/BidStatusPage/Shared/preparePurchaseData';
import prepareShippingOrderData from 'frontend/js/views/Account/BidStatusPage/Shared/prepareShippingOrderData';
import { LotWonContextProvider } from 'frontend/js/context/LotWonContext';
import { useAllPhotosModalContext } from 'frontend/js/context/AllPhotosModal';
import DetailsSection from './DetailsSection';
import ActionsSection from './ActionsSection';

function Card({ invoice }) {
  const [{ setCurrentLot }] = useAllPhotosModalContext();

  const { lot: lotObject, lotPurchase, shippingOrder: invoiceShippingOrder, auction } = invoice || {};
  const lot = !lotObject && !lotPurchase ? { ...invoiceShippingOrder?.lot, inventoryAuction: auction } : lotObject;
  const shippingOrder = lotPurchase?.activeShippingOrder || invoiceShippingOrder;
  if (shippingOrder) {
    shippingOrder.lotPurchase = lotPurchase;
  }

  const { id, fullName, purchaseDate, vin, vehicleType, locationState } = preparePurchaseData(
    lotPurchase,
    lot,
    invoice,
  );

  const { portOfDestination, vehicleCategory, token: shippingOrderToken } = prepareShippingOrderData(shippingOrder);

  const onQuickViewClick = useCallback(() => {
    setCurrentLot(lot);
  }, [lot]);

  return (
    <LotWonContextProvider invoice={invoice}>
      <VehicleVerticalCard
        lot={lot}
        lotPurchase={lotPurchase}
        onQuickViewClick={onQuickViewClick}
        details={
          <DetailsSection
            vin={vin}
            id={id}
            bidderName={fullName}
            location={locationState}
            purchaseDate={purchaseDate}
            vehicleCategory={vehicleCategory}
            vehicleType={vehicleType}
          />
        }
        controls={
          <ActionsSection
            invoice={invoice}
            shippingOrderToken={shippingOrderToken}
            vin={vin}
            portOfDestination={portOfDestination}
            shippingOrder={shippingOrder}
          />
        }
      />
    </LotWonContextProvider>
  );
}

export default Card;
