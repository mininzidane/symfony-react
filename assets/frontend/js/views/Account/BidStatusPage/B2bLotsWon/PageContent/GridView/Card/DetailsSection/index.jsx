/* eslint-disable react/prop-types */
import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import DateCell from 'frontend/js/views/Account/BidStatusPage/Shared/TableCells/DateCell';
import Wrapper from 'frontend/js/views/Shared/VehicleVerticalCard/Details/Wrapper';
import Row from 'frontend/js/views/Shared/VehicleVerticalCard/Details/Row';
import VehicleCategoryCell from 'frontend/js/views/Account/BidStatusPage/Shared/TableCells/VehicleCategoryCell';
import ValueCell from 'frontend/js/views/Account/BidStatusPage/Shared/TableCells/ValueCell';

function DetailsSection({ vin, id, bidderName, location, purchaseDate, vehicleCategory, vehicleType }) {
  return (
    <Wrapper>
      <Row condition={vin} label={<FormattedMessage id="shared.label.vin" />} value={vin} />
      <Row condition={id} label={<FormattedMessage id="shared.label.lotId" />} value={id} />
      <Row
        condition
        label={<FormattedMessage id="shared.label.vehicleType" />}
        value={
          vehicleCategory ? (
            <VehicleCategoryCell vehicleCategory={vehicleCategory} />
          ) : (
            <ValueCell value={vehicleType} emptyValue="" />
          )
        }
      />
      <Row condition={location} label={<FormattedMessage id="shared.label.location" />} value={location} />
      <Row
        condition={purchaseDate}
        label={<FormattedMessage id="shared.label.purchaseDate" />}
        value={<DateCell date={purchaseDate} />}
      />
      <Row condition={bidderName} label={<FormattedMessage id="shared.label.bidderName" />} value={bidderName} />
    </Wrapper>
  );
}

export default DetailsSection;
