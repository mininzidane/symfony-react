/* eslint-disable react/prop-types */
import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import LotPageBlock from 'frontend/js/views/LotViewPage/LotPageBlock';
import CardIndentedContent from 'frontend/js/views/LotViewPage/LotPageCard/CardIndentedContent';
import Card from '../LotPageCard';
import Row from '../LotPageCard/Row';
import ExteriorInterior from './Values/ExteriorInterior';
import useStyles from './useStyles';

function IaaLotDescription({ lot, isShortList }) {
  const classes = useStyles();

  return (
    <LotPageBlock>
      <Card title={<FormattedMessage id="shared.label.vehicleDescription" />} className={classes.root}>
        <CardIndentedContent>
          <Row
            condition={!isShortList && Boolean(lot.vehicleType)}
            label={<FormattedMessage id="shared.label.vehicleType" />}
            value={lot.vehicleType}
            isUpperCase
          />
          <Row
            condition={Boolean(lot.bodyStyle)}
            label={<FormattedMessage id="shared.label.bodyStyle" />}
            value={lot.bodyStyle}
          />
          <Row
            condition={Boolean(lot.engineSize)}
            label={<FormattedMessage id="lotPage.details.engine" />}
            value={lot.engineSize}
          />
          <Row
            condition={!isShortList && Boolean(lot.transmission)}
            label={<FormattedMessage id="shared.label.transmission" />}
            value={lot.transmission}
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
            condition={!isShortList && Boolean(lot.cylinders)}
            label={<FormattedMessage id="lotPage.details.cylinders" />}
            value={lot.cylinders}
          />
          <Row
            condition={Boolean(lot.restraintSystem)}
            label={<FormattedMessage id="lotPage.details.restraintSystem" />}
            value={lot.restraintSystem}
          />
          <Row
            condition={Boolean(lot.color)}
            label={<FormattedMessage id="lotPage.details.exteriorInterior" />}
            value={<ExteriorInterior lot={lot} />}
          />
          <Row
            condition={Boolean(lot.manufacturedIn)}
            label={<FormattedMessage id="lotPage.details.manufacturedIn" />}
            value={lot.manufacturedIn}
          />
          <Row
            condition={Boolean(lot.vehicleClass)}
            label={<FormattedMessage id="shared.label.vehicleClass" />}
            value={lot.vehicleClass}
          />
          <Row condition={Boolean(lot.model)} label={<FormattedMessage id="shared.label.model" />} value={lot.model} />
          <Row
            condition={Boolean(lot.series)}
            label={<FormattedMessage id="lotPage.details.series" />}
            value={lot.series}
          />
        </CardIndentedContent>
      </Card>
    </LotPageBlock>
  );
}

IaaLotDescription.propTypes = {};

export default IaaLotDescription;
