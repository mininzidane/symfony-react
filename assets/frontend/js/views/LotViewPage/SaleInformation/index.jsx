/* eslint-disable react/prop-types */
import React from 'react';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { FormattedMessage } from 'react-intl-phraseapp';
import BidService from 'frontend/js/api/BidService';
import LaneItemGridRow from 'frontend/js/views/Shared/LaneItemGridRow';
import Card from '../LotPageCard';
import Row from '../LotPageCard/Row';
import CardIndentedContent from '../LotPageCard/CardIndentedContent';
import Location from './Values/Location';
import Sublot from './Values/Sublot';
import UpdatedAt from './Values/UpdatedAt';
import SaleDate from './Values/SaleDate';
import SaleName from './Values/SaleName';
import SaleStatus from './Values/SaleStatus';
import Pickup from './Values/Offsite/Pickup';
import Preview from './Values/Offsite/Preview';
import LotPageBlock from '../LotPageBlock';
import useStyles from './useStyles';

function SaleInformation({ lot, isAbmInventory }) {
  const classes = useStyles();
  const isCounterBidStatus = BidService.isCounterBidStatus(lot.bidStatus);

  return (
    <LotPageBlock>
      <Card title={<FormattedMessage id="lotPage.saleInfo.title" />}>
        <CardIndentedContent className={classes.root}>
          <Row
            condition={Boolean(lot.location)}
            label={<FormattedMessage id="lotPage.saleInfo.location" />}
            value={<Location lot={lot} />}
          />
          <Row
            condition={!isEmpty(lot.subLotInfo)}
            label={<FormattedMessage id="lotPage.saleInfo.sublot" />}
            value={<Sublot lot={lot} />}
            className={classes.sublot}
          />
          <Row
            condition={!isAbmInventory}
            label={<FormattedMessage id="lotPage.saleInfo.saleDate" />}
            value={<SaleDate lot={lot} />}
          />
          <Row
            condition={Boolean(!isCounterBidStatus && lot.saleStatus)}
            label={<FormattedMessage id="shared.label.saleStatus" />}
            value={<SaleStatus lot={lot} />}
          />
          <Row
            condition={Boolean(get(lot, 'saleLocation.name'))}
            label={<FormattedMessage id="shared.label.saleName" />}
            value={<SaleName lot={lot} />}
          />
          <Row
            condition={Boolean(lot.gridRow || lot.item > 0)}
            label={<FormattedMessage id="lotPage.saleInfo.laneItemGridRow" values={{ wbr: <wbr /> }} />}
            value={<LaneItemGridRow lot={lot} />}
          />
          <Row
            condition={Boolean(lot.lastUpdatedAt)}
            label={<FormattedMessage id="lotPage.saleInfo.lastUpdated" />}
            value={<UpdatedAt lot={lot} />}
          />
          <Row
            condition={!isEmpty(get(lot, 'offsite.preview'))}
            label={<FormattedMessage id="lotPage.saleInfo.previewAndHours" />}
            value={<Preview lot={lot} />}
          />
          <Row
            condition={!isEmpty(get(lot, 'offsite.pickup'))}
            label={<FormattedMessage id="lotPage.saleInfo.afterSalePickUp" />}
            value={<Pickup lot={lot} />}
          />
        </CardIndentedContent>
      </Card>
    </LotPageBlock>
  );
}

export default SaleInformation;
