/* eslint-disable react/prop-types */
import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import Row from '../_Shared/Row';
import useStyles from './useStyles';
import SellingBranch from './Values/SellingBranch';
import PrimaryDamage from './Values/PrimaryDamage';
import TitleSaleDoc from './Values/TitleSaleDoc';
import KeyStatus from './Values/KeyStatus';
import Odometer from './Values/Odometer';
import StartCode from './Values/StartCode';

function IaaProperties({ lot, isShortList }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Row
        condition={Boolean(lot.location)}
        label={<FormattedMessage id="lotPage.details.sellingBranch" />}
        value={<SellingBranch lot={lot} />}
      />

      <Row
        condition={Boolean(lot.lossType)}
        label={<FormattedMessage id="lotPage.details.loss" />}
        value={lot.lossType}
      />

      <Row
        condition={Boolean(lot.primaryDamage)}
        label={<FormattedMessage id="shared.label.primaryDamage" />}
        value={<PrimaryDamage lot={lot} />}
      />

      <Row
        condition={!isShortList && Boolean(lot.secondaryDamage)}
        label={<FormattedMessage id="lotPage.details.secondaryDamage" />}
        value={lot.secondaryDamage}
      />

      <Row
        condition={Boolean(lot.titleType)}
        label={<FormattedMessage id="shared.label.docType" />}
        value={<TitleSaleDoc lot={lot} />}
      />

      <Row
        condition={Boolean(lot.title && lot.title.brand)}
        label={<FormattedMessage id="lotPage.details.saleDocBrand" />}
        value={lot.title && lot.title.brand}
      />

      <Row
        condition={!isShortList && Boolean(lot.startCode)}
        label={<FormattedMessage id="lotPage.details.startCode" />}
        value={<StartCode lot={lot} />}
      />

      <Row
        condition={!isShortList && Boolean(lot.keysStatus)}
        label={<FormattedMessage id="lotPage.details.keys" />}
        value={<KeyStatus lot={lot} />}
      />

      <Row
        condition={lot.odometer !== null}
        label={<FormattedMessage id="shared.label.odometer" />}
        value={<Odometer lot={lot} />}
      />

      <Row
        condition={!isShortList && Boolean(lot.airbags)}
        label={<FormattedMessage id="lotPage.details.airbags" />}
        value={lot.airbags}
      />
    </div>
  );
}

export default IaaProperties;
