/* eslint-disable react/prop-types */
import React, { useCallback } from 'react';
import { usePreviewModalContext } from 'frontend/js/context/PreviewModalContext';
import VehicleVerticalCard from 'frontend/js/views/Shared/VehicleVerticalCard';
import { LotWonContextProvider } from 'frontend/js/context/LotWonContext';
import ActionsSections from './ActionsSections';
import DetailsSection from './DetailsSection';
import useStyles from './useStyles';

function GridView({ invoices }) {
  const classes = useStyles();
  const [{ setCurrentLotId, setIsModalOpen }] = usePreviewModalContext();

  const handleQuickViewClick = useCallback((id) => {
    setCurrentLotId(id);
    setIsModalOpen(true);
  }, []);

  return (
    <div className={classes.root}>
      {invoices.map((invoice) => {
        const { lot: lotObject, lotPurchase, shippingOrder, auction } = invoice;
        const lot = !lotObject && !lotPurchase ? { ...shippingOrder?.lot, inventoryAuction: auction } : lotObject;

        return (
          <LotWonContextProvider invoice={invoice} key={invoice.token}>
            <VehicleVerticalCard
              lot={lot}
              lotPurchase={lotPurchase}
              onQuickViewClick={handleQuickViewClick}
              controls={<ActionsSections />}
              details={<DetailsSection lot={lot} lotPurchase={lotPurchase} />}
            />
          </LotWonContextProvider>
        );
      })}
    </div>
  );
}

export default GridView;
