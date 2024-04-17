/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import NumberService from 'frontend/js/lib/utils/NumberService';
import StringService from 'frontend/js/lib/utils/StringService';
import SaleDate from 'frontend/js/views/Shared/SaleDate';
import LotStatusStates from 'frontend/js/views/LotViewPage/_Shared/LotStatusStates';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import BidService from 'frontend/js/api/BidService';
import RouterService from 'frontend/js/api/RouterService';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import LotService from 'frontend/js/api/LotService';
import SalesStatusFormattedMessage from 'frontend/js/views/Shared/SalesStatusFormattedMessage';
import useStyles from './useStyles';
import Row from './Row';
import BuyItNow from './BuyItNow';

function DetailsSection({ lot, onBuyItNowButtonClick }) {
  const classes = useStyles();
  const { isAuthenticated } = useCustomerHelper();

  const {
    id,
    slug,
    title,
    odometer,
    primaryDamage,
    location,
    locationName,
    saleDate,
    saleStartAt,
    saleStatusString,
    saleStatus,
    vehicleTypeLabel,
    buyItNow,
    currency,
    searchHash,
    inventoryAuction,
  } = lot;

  const odometerString = LotService.getFormattedOdometerString(lot);
  const isCounterBidStatus = BidService.isCounterBidStatus(lot.bidStatus);
  const saleStatusKey = StringService.getStatusKeyFormString(saleStatusString);
  const lotTitle = title && title.name;
  const lotLocation = (location && location.name) || locationName;
  const isAbmInventory = inventoryAuction === LotService.AUCTION_ABM;

  const { getStateByLot, LIVE } = LotStatusStates;
  const lotState = getStateByLot(lot);
  const isLive = lotState === LIVE;

  return (
    <div className={classes.wrapper}>
      <Row
        condition={odometer !== null}
        label={<FormattedMessage id="shared.label.odometer" />}
        value={odometerString}
      />
      <Row condition={lotTitle} label={<FormattedMessage id="shared.label.titleCode" />} value={lotTitle} />
      <Row
        condition={primaryDamage}
        label={<FormattedMessage id="shared.label.damage" />}
        value={<span className={classes.damage}>{primaryDamage}</span>}
      />
      <Row
        condition={lotLocation && !isAbmInventory}
        label={<FormattedMessage id="shared.label.location" />}
        value={lotLocation}
      />
      <Row
        condition={(saleStartAt || !saleDate) && !isAbmInventory}
        label={<FormattedMessage id="shared.label.saleDate" />}
        value={<SaleDate lot={lot} />}
      />
      <Row
        condition={!isCounterBidStatus && saleStatus}
        label={<FormattedMessage id="shared.label.saleStatus" />}
        value={<SalesStatusFormattedMessage salesStatus={saleStatusKey} />}
      />
      <Row
        condition={vehicleTypeLabel && !isAuthenticated}
        label={<FormattedMessage id="shared.label.damagedSalvage" />}
        value={vehicleTypeLabel}
      />
      <BuyItNow
        condition={buyItNow && !isLive}
        onBuyItNowButtonClick={onBuyItNowButtonClick}
        isAbmInventory={isAbmInventory}
        href={RouterService.getRoute('lot', { searchHash }, false, { id, slug })}
        label={
          <>
            <FormattedMessage id="shared.cta.buyItNow" /> ({currency})
          </>
        }
        value={<span>{NumberService.formatCurrency(buyItNow)}</span>}
      />
    </div>
  );
}

export default DetailsSection;
