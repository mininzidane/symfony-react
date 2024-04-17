/* eslint-disable react/prop-types */
import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import Wrapper from 'frontend/js/views/Shared/VehicleVerticalCard/Details/Wrapper';
import Row from 'frontend/js/views/Shared/VehicleVerticalCard/Details/Row';
import { BrokerCell } from 'frontend/js/components/ThemedTable/CustomCells/BrokerCell';
import { StatusCell } from 'frontend/js/components/ThemedTable/LotsWonCells';
import DateTimeService from 'frontend/js/lib/utils/DateTimeService';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import ShippingRow from './ShippingRow';
import DueRow from './DueRow';

function DetailsSection({ lot, lotPurchase }) {
  const { isB2BBroker } = useCustomerHelper();
  const isCopartAuction = Boolean(lot);
  const id = isCopartAuction ? lot.id : `${lotPurchase.auction} ${lotPurchase.lotNumber}`;
  const vin = isCopartAuction ? lot.vin : lotPurchase.vehicleVin;
  const docType = lotPurchase ? `${lotPurchase.ownershipDocState} ${lotPurchase.ownershipDocType}` : null;
  const lotLocation = lot?.location?.name;

  return (
    <Wrapper>
      <Row condition={vin} label={<FormattedMessage id="shared.label.vin" />} value={vin} />
      <Row condition={id} label={<FormattedMessage id="shared.label.lotId" />} value={id} />
      <Row
        condition={isB2BBroker}
        label={<FormattedMessage id="shared.label.bidderName" />}
        value={<BrokerCell lotPurchase={lotPurchase} />}
      />
      <Row condition={lotLocation} label={<FormattedMessage id="shared.label.location" />} value={lotLocation} />
      <Row
        condition={lotPurchase?.saleDate}
        label={<FormattedMessage id="shared.label.saleDate" />}
        value={lotPurchase?.saleDate && DateTimeService.formatFromISOString(lotPurchase.saleDate)}
      />
      <Row condition={docType} label={<FormattedMessage id="shared.label.titleCode" />} value={docType} />
      <Row condition label={<FormattedMessage id="shared.label.status" />} value={<StatusCell />} />
      <ShippingRow />
      <DueRow />
    </Wrapper>
  );
}

export default DetailsSection;
