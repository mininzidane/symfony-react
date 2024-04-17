/* eslint-disable react/prop-types */
import React from 'react';
import RouterService from 'frontend/js/api/RouterService';
import LotService from 'frontend/js/api/LotService';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import Header from './Header';
import SaleState from './SaleState';
import Image from './Image';
import ArrowSvg from './img/arrow.svg';
import useStyles from './useStyles';

function Body({ lot }) {
  const { locationName, id, slug, searchHash, inventoryAuction } = lot;

  const odometerString = LotService.getFormattedOdometerString(lot);
  const isAbmInventory = inventoryAuction === LotService.AUCTION_ABM;
  const href = RouterService.getRoute('lot', { searchHash }, false, { id, slug });
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Image lot={lot} />

      <div className={classes.stats}>
        <Header lot={lot} />

        {odometerString && (
          <div className={classes.stat}>
            <FormattedMessage id="shared.label.lotId" />: {id}
          </div>
        )}

        {locationName && <div className={classes.stat}>{locationName}</div>}

        {!isAbmInventory && <SaleState lot={lot} />}

        {odometerString && (
          <div className={classes.stat}>
            <FormattedMessage id="shared.label.odometer" />: {odometerString}
          </div>
        )}

        <a href={href} className={classes.arrow}>
          <img src={ArrowSvg} alt="Arrow" />
        </a>
      </div>
    </div>
  );
}

export default Body;
