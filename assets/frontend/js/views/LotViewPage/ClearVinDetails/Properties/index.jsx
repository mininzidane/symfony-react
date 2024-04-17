/* eslint-disable react/prop-types */
import React from 'react';
import classnames from 'classnames';
import { FormattedMessage } from 'react-intl-phraseapp';
import PreviousOwners from './Values/PreviousOwners';
import TitleBrandHistory from './Values/TitleBrandHistory';
import LienImpoundTheft from './Values/LienImpoundTheft';
import SafetyRecalls from './Values/SafetyRecalls';
import Row from './Row';
import AlertIcon from '../img/alert.svg';
import useStyles from './useStyles';

function Properties({ className, clearVinData, hasAuctionSales, auctionSalesCount }) {
  const classes = useStyles();
  const { recalls } = clearVinData || {};

  return (
    <div className={classnames(classes.root, className)}>
      <Row
        condition={Boolean(auctionSalesCount)}
        label={<FormattedMessage id="lotPage.clearVinDetails.salvageAuctionSales" />}
        value={
          <div className="d-f ai-ct">
            <FormattedMessage id="shared.label.records" values={{ count: auctionSalesCount }} />
            &nbsp;
            <img src={AlertIcon} width={15} height={12} alt="" />
          </div>
        }
      />

      <Row
        condition
        label={<FormattedMessage id="lotPage.clearVinDetails.previousOwners" />}
        value={<PreviousOwners />}
      />
      <Row
        condition
        label={<FormattedMessage id="lotPage.clearVinDetails.titleBrandHistory" />}
        value={<TitleBrandHistory />}
      />
      <Row
        condition
        label={<FormattedMessage id="lotPage.clearVinDetails.lienImpoundTheft" />}
        value={<LienImpoundTheft />}
      />
      <Row
        condition={Boolean(recalls)}
        label={<FormattedMessage id="lotPage.clearVinDetails.safetyRecalls" />}
        value={<SafetyRecalls count={recalls} />}
      />
      <Row
        condition={hasAuctionSales}
        label={<FormattedMessage id="lotPage.clearVinDetails.additionalPhotos" />}
        value={
          <FormattedMessage
            id="lotPage.clearVinDetails.additionalPhotos.photos"
            values={{ count: auctionSalesCount * 10 }}
          />
        }
      />
    </div>
  );
}

export default Properties;
