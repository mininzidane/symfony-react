import React from 'react';
import PropTypes from 'prop-types';
import RouterService from 'frontend/js/api/RouterService';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import DateTimeService from 'frontend/js/lib/utils/DateTimeService';
import SaleDate from 'frontend/js/views/Shared/SaleDate';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import Location from '../Location';
import useStyles from './useStyles';
import Row from './Row';

function Content({ invoice }) {
  const { customerParent } = useCustomerHelper();
  const { lot, lotPurchase, shippingOrder, customer: invoiceCustomer } = invoice;
  const { id, slug, title, saleDate, saleStartAt, location } = lot;
  const lotUrl = RouterService.getRoute('lot', null, false, { id, slug });
  const showAllAssignedBidders = customerParent ? customerParent.showAllAssignedBidders : false; // TODO customer
  const { isAboveSm } = useBreakpoint();

  const isLotPurchase = Boolean(lotPurchase);
  const isShippingOrder = shippingOrder && shippingOrder !== null;
  const lotTitle = title && title.name;
  const showStorage = isLotPurchase && lotPurchase.saleDate && !lotPurchase.storageHasStarted;
  const statsMargin = Boolean((!showStorage && showAllAssignedBidders) || isShippingOrder);
  const classes = useStyles({ statsMargin });

  let { vin, description } = lot;
  if (isShippingOrder) {
    vin = shippingOrder.vin;
    description = shippingOrder.vehicleYearMakeModel;
  }

  return (
    <div className={classes.root}>
      <h2 className={classes.caption}>
        <a href={lotUrl}>{description}</a>
      </h2>

      <div className={classes.stats}>
        {isAboveSm && <Row condition={lotTitle} messageId="shared.label.titleCode" value={lotTitle} />}

        <Row condition messageId="shared.label.lotId" value={id} />

        <Row condition messageId="shared.label.vin" value={vin} />

        <Row
          condition={location}
          messageId="shared.label.location"
          isFlex
          value={
            <div className={classes.location}>
              <Location lot={invoice.lot} />
            </div>
          }
        />

        <Row
          condition={Boolean(saleStartAt || !saleDate)}
          messageId="shared.label.saleDate"
          value={<SaleDate lot={invoice.lot} />}
        />

        <Row
          condition={Boolean(showStorage)}
          messageId="shared.label.storageStartsOn"
          value={isLotPurchase && DateTimeService.formatFromISOString(lotPurchase.storageDate)}
        />

        <Row
          condition={Boolean(showAllAssignedBidders)}
          messageId="shared.label.bidder"
          value={
            <>
              {invoiceCustomer && invoiceCustomer.firstName} {invoiceCustomer && invoiceCustomer.lastName}&nbsp;
              {isLotPurchase && lotPurchase.bidder ? (
                <>#{lotPurchase.bidder.id}</>
              ) : (
                <>{isShippingOrder && invoiceCustomer.bidder && <>#{invoiceCustomer.bidder.id}</>}</>
              )}
            </>
          }
        />
      </div>
    </div>
  );
}

Content.propTypes = {
  invoice: PropTypes.object.isRequired,
};

export default Content;
