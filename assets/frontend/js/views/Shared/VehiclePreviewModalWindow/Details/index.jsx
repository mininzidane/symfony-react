/* eslint-disable react/prop-types */
import React from 'react';
import BidService from 'frontend/js/api/BidService';
import RouterService from 'frontend/js/api/RouterService';
import NumberService from 'frontend/js/lib/utils/NumberService';
import StringService from 'frontend/js/lib/utils/StringService';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import Button from 'frontend/js/components/Button';
import LotService from 'frontend/js/api/LotService';
import BidStatusFormattedMessage from 'frontend/js/views/Shared/BidStatusFormattedMessage';
import SalesStatusFormattedMessage from 'frontend/js/views/Shared/SalesStatusFormattedMessage';
import Odometer from './Values/Odometer';
import PrimaryDamage from './Values/PrimaryDamage';
import EstRetailValue from './Values/EstRetailValue';
import Row from './Row';
import useStyles from './useStyles';

function Details({ lot }) {
  const classes = useStyles();
  const { getStatusKeyFormString } = StringService;
  const { formatCurrency } = NumberService;
  const {
    id,
    slug,
    title,
    odometer,
    primaryDamage,
    currentBid,
    saleStatusString,
    saleStatus,
    bidStatus,
    currency,
    bodyStyle,
    engineSize,
    color,
    acv,
    locationCountry,
    searchHash,
    inventoryAuction,
  } = lot;

  const isNpa = inventoryAuction === LotService.AUCTION_NPA;
  const isCounterBidStatus = BidService.isCounterBidStatus(lot.bidStatus);
  const saleStatusKey = getStatusKeyFormString(saleStatusString);
  const bidStatusKey = getStatusKeyFormString(bidStatus);
  const IsAcvAvailable = Number(acv) > 0;
  const isOverseasLocation = ['ARE', 'GBR', 'BHR', 'OMN'].includes(locationCountry);
  const lotTitle = title && title.name;

  return (
    <div className={classes.root}>
      <div className={classes.section}>
        <Row
          condition={Boolean(bidStatus)}
          label={<FormattedMessage id="shared.label.currentBid" />}
          value={<BidStatusFormattedMessage bidStatus={bidStatusKey} />}
        />

        <Row
          condition={Boolean(!isCounterBidStatus && saleStatus)}
          label={<FormattedMessage id="shared.label.saleStatus" />}
          value={<SalesStatusFormattedMessage salesStatus={saleStatusKey} />}
        />

        <Row
          condition={currentBid !== null && !isCounterBidStatus}
          label={<FormattedMessage id="shared.label.currentBid" />}
          value={
            <>
              {formatCurrency(currentBid)} <span className={classes.currency}>{currency}</span>
            </>
          }
        />
      </div>
      <div className={classes.section}>
        <Row
          condition={IsAcvAvailable && !isOverseasLocation}
          label={
            <FormattedMessage id={isNpa ? 'lotPage.details.estimatedValue' : 'lotPage.details.estimatedRetailValue'} />
          }
          value={<EstRetailValue lot={lot} />}
        />

        <Row condition={lotTitle} label={<FormattedMessage id="shared.label.titleCode" />} value={lotTitle} />

        <Row
          condition={odometer !== null}
          label={<FormattedMessage id="shared.label.odometer" />}
          value={<Odometer lot={lot} />}
        />

        <Row
          condition={Boolean(primaryDamage)}
          label={<FormattedMessage id="shared.label.primaryDamage" />}
          value={<PrimaryDamage lot={lot} />}
        />

        <Row
          condition={Boolean(bodyStyle)}
          label={<FormattedMessage id="shared.label.bodyStyle" />}
          value={bodyStyle}
        />

        <Row condition={Boolean(color)} label={<FormattedMessage id="shared.label.color" />} value={color} />

        <Row
          condition={Boolean(engineSize)}
          label={<FormattedMessage id="lotPage.details.engine" />}
          value={engineSize}
        />
      </div>

      <Button
        color="blue"
        size="lg"
        label={<FormattedMessage id="shared.cta.seeFullLotDetails" />}
        href={RouterService.getRoute(
          'lot',
          {
            searchHash,
          },
          false,
          { id, slug },
        )}
      />
    </div>
  );
}

export default Details;
