/* eslint-disable react/prop-types */
import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import EstRetailValue from 'frontend/js/views/LotViewPage/LotDetails/Properties/Values/EstRetailValue';
import RepairCost from 'frontend/js/views/LotViewPage/LotDetails/Properties/Values/RepairCost';
import TitleSaleDoc from 'frontend/js/views/LotViewPage/LotDetails/IaaProperties/Values/TitleSaleDoc';
import SellingBranch from 'frontend/js/views/LotViewPage/LotDetails/IaaProperties/Values/SellingBranch';
import LotPageBlock from '../LotPageBlock';
import Card from '../LotPageCard';
import CardIndentedContent from '../LotPageCard/CardIndentedContent';
import Row from '../LotPageCard/Row';
import SaleDate from './Values/SaleDate';
import AisleStallRow from './Values/AisleStallRow';
import LaneGridRow from './Values/LaneGridRow';
import useStyles from './useStyles';

function IaaSaleInformation({ lot, isShortList }) {
  const locationOverseas = ['ARE', 'GBR', 'BHR', 'OMN'].includes(lot.locationCountry);
  const acvIsAvailable = Number(lot.acv) > 0;
  const classes = useStyles();

  return (
    <LotPageBlock>
      <Card title={<FormattedMessage id="lotPage.saleInfo.title" />}>
        <CardIndentedContent className={classes.root}>
          <Row
            condition={Boolean(lot.location)}
            label={<FormattedMessage id="lotPage.details.sellingBranch" />}
            value={<SellingBranch lot={lot} />}
          />
          <Row condition label={<FormattedMessage id="lotPage.saleInfo.saleDate" />} value={<SaleDate lot={lot} />} />
          <Row
            condition={Boolean(lot.lane && lot.stallNumber)}
            label={<FormattedMessage id="lotPage.details.laneRun" />}
            value={<LaneGridRow lot={lot} />}
          />
          <Row
            condition={Boolean(lot.gridRow)}
            label={<FormattedMessage id="lotPage.details.aisleStall" />}
            value={<AisleStallRow lot={lot} />}
          />
          <Row
            condition={acvIsAvailable && !locationOverseas}
            label={<FormattedMessage id="lotPage.details.estimatedRetailValue" />}
            value={<EstRetailValue lot={lot} />}
          />
          <Row
            condition={Number(lot.repairCost) > 0}
            label={<FormattedMessage id="lotPage.details.repairCost" />}
            value={<RepairCost lot={lot} />}
          />
          <Row
            condition={!isShortList && Boolean(lot.seller)}
            label={<FormattedMessage id="lotPage.details.seller" />}
            value={lot.seller}
          />
          <Row
            condition={Boolean(lot.titleType)}
            label={<FormattedMessage id="shared.label.docType" />}
            value={<TitleSaleDoc lot={lot} />}
          />
        </CardIndentedContent>
      </Card>
    </LotPageBlock>
  );
}

export default IaaSaleInformation;
