/* eslint-disable react/prop-types */
import React from 'react';
import RouterService from 'frontend/js/api/RouterService';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import Header from './Header';
import VehicleImage from './VehicleImage';
import Vin from './Vin';
import LotId from './LotId';
import Odometer from './Odometer';
import DocType from './DocType';
import SaleState from './SaleState';
import ShippingStatus from './ShippingStatus';
import Shipping from './Shipping';
import Due from './Due';
import ArrowSvg from './img/arrow.svg';
import useStyles from './useStyles';

function Body({ lot, lotPurchase, hasShipping, hasVin, hasOdometer, hasDocType, hasDue, hasBidderName, imageBlock }) {
  const classes = useStyles();
  const locationString = lot && (lot.locationName || lot.location?.name);

  return (
    <div className={classes.root}>
      {imageBlock || <VehicleImage lot={lot} />}

      <div className={classes.stats}>
        <Header lot={lot} lotPurchase={lotPurchase} />

        {hasVin && <Vin className={classes.stat} lot={lot} lotPurchase={lotPurchase} />}

        <LotId className={classes.stat} lot={lot} lotPurchase={lotPurchase} />

        {hasBidderName && (
          <div className={classes.stat}>
            <FormattedMessage id="shared.label.bidderName" />: {lotPurchase?.customer?.firstName}{' '}
            {lotPurchase?.customer?.lastName}
          </div>
        )}

        {locationString && <div className={classes.stat}>{locationString}</div>}

        <SaleState lot={lot} lotPurchase={lotPurchase} />

        {hasOdometer && <Odometer className={classes.stat} lot={lot} />}

        {hasDocType && <DocType className={classes.stat} lot={lot} lotPurchase={lotPurchase} />}

        {hasShipping && (
          <>
            <ShippingStatus />
            <Shipping />
          </>
        )}

        {hasDue && <Due />}

        {lot && (
          <a
            href={RouterService.getRoute(
              'lot',
              {
                searchHash: lot.searchHash,
              },
              false,
              { id: lot.id, slug: lot.slug },
            )}
            className={classes.arrow}
          >
            <img src={ArrowSvg} alt="Arrow" />
          </a>
        )}
      </div>
    </div>
  );
}

export default Body;
