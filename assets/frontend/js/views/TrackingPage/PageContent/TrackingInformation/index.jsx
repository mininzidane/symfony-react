/* eslint-disable react/prop-types */
import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import TooltipOnHover from 'frontend/js/components/TooltipOnHover';
import Row from 'frontend/js/components/Card/Row';
import CardPlane from 'frontend/js/components/CardPlane';
import PhoneLink from 'frontend/js/components/PhoneLink';
import DateTimeService from 'frontend/js/lib/utils/DateTimeService';
import ShippingOrderService from 'frontend/js/api/ShippingOrderService';
import useStyles from './useStyles';

function TrackingInformation({ shippingOrder }) {
  const classes = useStyles();
  const { internationalType, domesticType } = shippingOrder;

  function formatDate(date) {
    if (!date) {
      return '';
    }

    return DateTimeService.toLocaleDate(DateTimeService.parseDateInLocalTimezone(date), {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  return (
    <CardPlane title={<FormattedMessage id="shared.label.trackingInformation" />} contentClassName={classes.card}>
      <Row
        condition={Boolean(shippingOrder.createdAt)}
        label={<FormattedMessage id="trackingPage.trackingInformation.orderCreated" />}
        value={
          <>
            <span className={classes.value}>{formatDate(shippingOrder.createdAt)}</span>
            <TooltipOnHover
              content={<FormattedMessage id="trackingPage.trackingInformation.tooltip.orderCreated" />}
              badgeTop={-1}
            />
          </>
        }
      />
      <Row
        condition={!shippingOrder.pickupDate && Boolean(shippingOrder.scheduledPickup)}
        label={<FormattedMessage id="trackingPage.trackingInformation.estimatedPickUpDate" />}
        value={
          <>
            <span className={classes.value}>{formatDate(shippingOrder.scheduledPickup)}</span>
            <TooltipOnHover
              content={<FormattedMessage id="trackingPage.trackingInformation.tooltip.noPickUpDate" />}
              badgeTop={-1}
            />
          </>
        }
      />
      <Row
        condition={Boolean(shippingOrder.pickupDate) || !shippingOrder.scheduledPickup}
        label={<FormattedMessage id="trackingPage.trackingInformation.pickUpDate" />}
        value={
          <>
            <span className={classes.value}>
              {shippingOrder.pickupDate ? (
                formatDate(shippingOrder.pickupDate)
              ) : (
                <FormattedMessage id="trackingPage.trackingInformation.awaiting" />
              )}
            </span>
            <TooltipOnHover
              content={<FormattedMessage id="trackingPage.trackingInformation.tooltip.pickUpDate" />}
              badgeTop={-1}
            />
          </>
        }
      />
      {domesticType && (
        <>
          <Row
            condition={!shippingOrder.delivery && Boolean(shippingOrder.estimatedDelivery)}
            label={<FormattedMessage id="trackingPage.trackingInformation.estimatedDelivery" />}
            value={
              shippingOrder.estimatedDelivery ? (
                formatDate(shippingOrder.estimatedDelivery)
              ) : (
                <FormattedMessage id="trackingPage.trackingInformation.awaiting" />
              )
            }
          />
          <Row
            condition={Boolean(shippingOrder.delivery) || !shippingOrder.estimatedDelivery}
            label={<FormattedMessage id="trackingPage.trackingInformation.deliveryDate" />}
            value={
              shippingOrder.delivery ? (
                formatDate(shippingOrder.delivery)
              ) : (
                <FormattedMessage id="trackingPage.trackingInformation.awaiting" />
              )
            }
          />
          <Row
            condition={Boolean(shippingOrder.driver)}
            label={<FormattedMessage id="trackingPage.trackingInformation.contactDriver" />}
            value={
              <>
                {shippingOrder.driver}
                {shippingOrder.driverPhone && (
                  <>
                    {' '}
                    <PhoneLink phone={shippingOrder.driverPhone} />
                  </>
                )}
              </>
            }
          />
        </>
      )}
      {internationalType && (
        <>
          <Row
            condition={Boolean(shippingOrder.delivery)}
            label={
              <FormattedMessage
                id={
                  shippingOrder.shippingType === ShippingOrderService.SHIPPING_TYPE_RORO
                    ? 'trackingPage.trackingInformation.deliveredToPort'
                    : 'trackingPage.trackingInformation.deliveredToWarehouse'
                }
              />
            }
            value={
              <>
                <span className={classes.value}>{formatDate(shippingOrder.delivery)}</span>
                {shippingOrder.shippingType !== ShippingOrderService.SHIPPING_TYPE_RORO && (
                  <TooltipOnHover
                    content={<FormattedMessage id="trackingPage.trackingInformation.tooltip.deliveredToWarehouse" />}
                    badgeTop={-1}
                  />
                )}
              </>
            }
          />
          <Row
            condition={Boolean(shippingOrder.estimatedDeparture)}
            label={<FormattedMessage id="trackingPage.trackingInformation.estimatedDeparture" />}
            value={
              <>
                <span className={classes.value}>{formatDate(shippingOrder.estimatedDeparture)}</span>
                <TooltipOnHover
                  content={<FormattedMessage id="trackingPage.trackingInformation.tooltip.estimatedDeparture" />}
                  badgeTop={-1}
                />
              </>
            }
          />
          <Row
            condition={Boolean(shippingOrder.estimatedArrival)}
            label={<FormattedMessage id="trackingPage.trackingInformation.estimatedArrival" />}
            value={
              <>
                <span className={classes.value}>{formatDate(shippingOrder.estimatedArrival)}</span>
                <TooltipOnHover
                  content={<FormattedMessage id="trackingPage.trackingInformation.tooltip.estimatedArrival" />}
                  badgeTop={-1}
                />
              </>
            }
          />
        </>
      )}
    </CardPlane>
  );
}

export default TrackingInformation;
