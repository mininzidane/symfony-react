/* eslint-disable react/prop-types */
import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import NumberService from 'frontend/js/lib/utils/NumberService';
import Wrapper from 'frontend/js/views/Shared/VehicleVerticalCard/Details/Wrapper';
import Row from 'frontend/js/views/Shared/VehicleVerticalCard/Details/Row';
import SaleDate from 'frontend/js/views/Shared/SaleDate';
import useStyles from './useStyles';

function DetailsSection({ lot }) {
  const classes = useStyles();
  const { location, saleStartAt, saleDate } = lot || {};
  const lotLocation = location && location.name;
  const odometer = [NumberService.formatNumber(lot.odometer), lot.odometerType, lot.odometerBrand]
    .filter(Boolean)
    .join(' ');

  return (
    <Wrapper>
      <div className={classes.root}>
        <Row
          condition={lot.odometer !== null}
          label={<FormattedMessage id="shared.label.odometer" />}
          value={odometer}
        />
        <Row condition={lotLocation} label={<FormattedMessage id="shared.label.location" />} value={lotLocation} />
        <Row
          condition={saleStartAt || !saleDate}
          label={<FormattedMessage id="shared.label.saleDate" />}
          value={<SaleDate lot={lot} hasTime={false} />}
        />
      </div>
    </Wrapper>
  );
}

export default DetailsSection;
