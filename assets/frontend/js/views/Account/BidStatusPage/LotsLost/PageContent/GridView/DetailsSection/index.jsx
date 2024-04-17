/* eslint-disable react/prop-types */
import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import Wrapper from 'frontend/js/views/Shared/VehicleVerticalCard/Details/Wrapper';
import Row from 'frontend/js/views/Shared/VehicleVerticalCard/Details/Row';
import SaleDate from 'frontend/js/views/Shared/SaleDate';
import StringService from 'frontend/js/lib/utils/StringService';
import BidService from 'frontend/js/api/BidService';
import BidStatusLabel from 'frontend/js/components/BidStatusLabel';
import SalesStatusFormattedMessage from 'frontend/js/views/Shared/SalesStatusFormattedMessage';
import useStyles from './useStyles';

function DetailsSection({ lot }) {
  const classes = useStyles();
  const { vin, id, location, saleStartAt, saleDate, saleStatus, saleStatusString, bidStatus } = lot || {};
  const lotLocation = location && location.name;
  const isCounterBidStatus = BidService.isCounterBidStatus(bidStatus);
  const saleStatusKey = StringService.getStatusKeyFormString(saleStatusString);

  return (
    <Wrapper>
      <Row condition={vin} label={<FormattedMessage id="shared.label.vin" />} value={vin} />
      <Row condition={id} label={<FormattedMessage id="shared.label.lotId" />} value={id} />
      <Row condition={lotLocation} label={<FormattedMessage id="shared.label.location" />} value={lotLocation} />
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
        condition={bidStatus}
        label={<FormattedMessage id="bidStatusPage.bidStatus" />}
        value={
          <div className={classes.bidStatus}>
            <BidStatusLabel bidStatus={bidStatus} />
          </div>
        }
      />
    </Wrapper>
  );
}

export default DetailsSection;
