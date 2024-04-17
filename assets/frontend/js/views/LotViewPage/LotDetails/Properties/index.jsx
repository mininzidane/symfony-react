/* eslint-disable react/prop-types */
import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import LotService from 'frontend/js/api/LotService';
import RunAndDriveDesc from 'frontend/js/views/LotViewPage/LotDetails/Properties/Values/RunAndDriveDesc';
import CountryService from 'frontend/js/api/CountryService';
import Odometer from './Values/Odometer';
import PrimaryDamage from './Values/PrimaryDamage';
import AuctionVerification from './Values/AuctionVerification';
import EstRetailValue from './Values/EstRetailValue';
import RepairCost from './Values/RepairCost';
import DocType from './Values/DocType';
import Category from './Values/Category';
import PreAccidentValue from './Values/PreAccidentValue';
import SpecialNote from './Values/SpecialNote';
import KeysStatus from './Values/KeysStatus';
import useStyles from './useStyles';
import Row from '../_Shared/Row';

function Properties({ lot, isShortList }) {
  const classes = useStyles();
  const locationOverseas = ['ARE', 'GBR', 'BHR', 'OMN'].includes(lot.locationCountry);
  const acvIsAvailable = Number(lot.acv) > 0;
  const { inventoryAuction } = lot;
  const isAbmInventory = inventoryAuction === LotService.AUCTION_ABM;
  const isNpa = inventoryAuction === LotService.AUCTION_NPA;
  const isUsa = CountryService.isUsa();

  return (
    <div className={classes.root}>
      {lot.title && lot.title.name && (
        <>
          <Row
            condition={!locationOverseas}
            label={<FormattedMessage id="shared.label.titleCode" />}
            value={<DocType lot={lot} />}
          />
          <Row
            condition={locationOverseas && Boolean(lot.title.type)}
            label={<FormattedMessage id="lotPage.details.category" />}
            value={<Category lot={lot} />}
          />
        </>
      )}

      <Row
        condition={!isShortList && Boolean(lot.seller)}
        label={<FormattedMessage id="lotPage.details.seller" />}
        value={lot.seller}
      />
      <Row
        condition={lot.odometer !== null}
        label={<FormattedMessage id="shared.label.odometer" />}
        value={<Odometer lot={lot} />}
      />
      <Row
        condition={!isShortList && lot.lotCondition !== '' && !isAbmInventory && !isNpa}
        label={<FormattedMessage id="lotPage.details.auctionHighlights" />}
        value={<AuctionVerification lot={lot} isUsa={isUsa} />}
      />
      {isUsa && LotService.CONDITION_RUN_AND_DRIVE_CODE === lot.lotCondition && <RunAndDriveDesc />}
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
        condition={Number(lot.repairCost) > 0}
        label={<FormattedMessage id="lotPage.details.repairCost" />}
        value={<RepairCost lot={lot} />}
      />

      <Row
        condition={!isShortList && acvIsAvailable && !locationOverseas}
        label={
          <FormattedMessage id={isNpa ? 'lotPage.details.estimatedValue' : 'lotPage.details.estimatedRetailValue'} />
        }
        value={<EstRetailValue lot={lot} />}
      />
      <Row
        condition={!isShortList && acvIsAvailable && locationOverseas}
        label={<FormattedMessage id="lotPage.details.preAccidentValue" />}
        value={<PreAccidentValue lot={lot} />}
      />

      <Row
        condition={Boolean(lot.bodyStyle)}
        label={<FormattedMessage id="shared.label.bodyStyle" />}
        value={lot.bodyStyle}
      />
      <Row
        condition={!isShortList && Boolean(lot.vehicleTypeLabel)}
        label={<FormattedMessage id="shared.label.vehicleType" />}
        value={lot.vehicleTypeLabel}
        isUpperCase
      />
      <Row condition={Boolean(lot.color)} label={<FormattedMessage id="shared.label.color" />} value={lot.color} />
      <Row
        condition={Boolean(lot.engineSize)}
        label={<FormattedMessage id="lotPage.details.engine" />}
        value={lot.engineSize}
      />
      <Row
        condition={!isShortList && Boolean(lot.cylinders)}
        label={<FormattedMessage id="lotPage.details.cylinders" />}
        value={lot.cylinders}
      />
      <Row
        condition={!isShortList && Boolean(lot.transmission)}
        label={<FormattedMessage id="shared.label.transmission" />}
        value={lot.transmission}
        isUpperCase
      />
      <Row
        condition={!isShortList && Boolean(lot.drive)}
        label={<FormattedMessage id="lotPage.details.drive" />}
        value={lot.drive}
      />
      <Row
        condition={!isShortList && Boolean(lot.fuel)}
        label={<FormattedMessage id="lotPage.details.fuel" />}
        value={lot.fuel}
      />
      <Row
        condition={!isShortList && Boolean(lot.keysStatus)}
        label={<FormattedMessage id="lotPage.details.keys" />}
        value={<KeysStatus lot={lot} />}
      />
      <Row
        condition={!isShortList}
        label={<FormattedMessage id="lotPage.details.specialNote" />}
        value={<SpecialNote lot={lot} />}
      />
    </div>
  );
}

export default Properties;
