/* eslint-disable react/prop-types */
import React from 'react';
import NumberService from 'frontend/js/lib/utils/NumberService';
import StringService from 'frontend/js/lib/utils/StringService';
import SaleDate from 'frontend/js/views/Shared/SaleDate';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import BidService from 'frontend/js/api/BidService';
import RouterService from 'frontend/js/api/RouterService';
import SalesStatusFormattedMessage from 'frontend/js/views/Shared/SalesStatusFormattedMessage';
import useStyles from './useStyles';
import Row from './Row';
import BuyItNow from './BuyItNow';

function Details({ lot }) {
  const classes = useStyles();

  const {
    id,
    slug,
    title,
    odometer,
    odometerBrand,
    odometerType,
    primaryDamage,
    location,
    saleDate,
    saleStartAt,
    saleStatusString,
    saleStatus,
    vehicleTypeLabel,
    buyItNow,
    currency,
    searchHash,
  } = lot;
  const odometerString = [NumberService.formatNumber(odometer), odometerType, odometerBrand].filter(Boolean).join(' ');
  const isCounterBidStatus = BidService.isCounterBidStatus(lot.bidStatus);
  const saleStatusKey = StringService.getStatusKeyFormString(saleStatusString);
  const lotTitle = title && title.name;
  const lotLocation = location && location.name;

  return (
    <div className={classes.root}>
      <Row condition={lotTitle} label={<FormattedMessage id="shared.label.titleCode" />} value={lotTitle} />
      <Row
        condition={odometer !== null}
        label={<FormattedMessage id="shared.label.odometer" />}
        value={odometerString}
      />
      <Row
        condition={primaryDamage}
        label={<FormattedMessage id="shared.label.primaryDamage" />}
        value={<span className={classes.damage}>{primaryDamage}</span>}
      />
      <Row condition={lotLocation} label={<FormattedMessage id="shared.label.saleLocation" />} value={lotLocation} />
      <Row
        condition={saleStartAt || !saleDate}
        label={<FormattedMessage id="shared.label.saleDate" />}
        value={<SaleDate lot={lot} />}
      />
      <Row
        condition={!isCounterBidStatus && saleStatus}
        label={<FormattedMessage id="shared.label.saleStatus" />}
        value={<SalesStatusFormattedMessage salesStatus={saleStatusKey} />}
      />
      <Row
        condition={vehicleTypeLabel}
        label={<FormattedMessage id="shared.label.vehicleType" />}
        value={vehicleTypeLabel}
      />
      <BuyItNow
        condition={buyItNow}
        href={RouterService.getRoute(
          'lot',
          {
            searchHash,
          },
          false,
          { id, slug },
        )}
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

export default Details;
