/* eslint-disable react/prop-types */
import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import useIntl from 'frontend/js/hooks/useIntl';
import TooltipOnHover from 'frontend/js/components/TooltipOnHover';
import Link from 'frontend/js/components/Link';
import Row from 'frontend/js/components/Card/Row';
import CardPlane from 'frontend/js/components/CardPlane';
import useStyles from './useStyles';

function TrackingInformation({ shippingOrder }) {
  const classes = useStyles();
  const intl = useIntl();

  const { lot, internationalType } = shippingOrder;

  const translationSets = {
    awaitingFromAuction: intl.formatMessage({ id: 'trackingPage.vehicleInformation.statuses.awaitingFromAuction' }),
    inProcessing: intl.formatMessage({ id: 'trackingPage.vehicleInformation.statuses.inProcessing' }),
    warehouse: intl.formatMessage({ id: 'trackingPage.vehicleInformation.statuses.warehouse' }),
    sentToAgent: intl.formatMessage({ id: 'trackingPage.vehicleInformation.statuses.sentToAgent' }),
    inTransit: intl.formatMessage({ id: 'trackingPage.vehicleInformation.statuses.inTransit' }),
    inOffice: intl.formatMessage({ id: 'trackingPage.vehicleInformation.statuses.inOffice' }),
    duplicate: intl.formatMessage({ id: 'trackingPage.vehicleInformation.statuses.duplicate' }),
    abandoned: intl.formatMessage({ id: 'trackingPage.vehicleInformation.statuses.abandoned' }),
    DMVProcessing: intl.formatMessage({ id: 'trackingPage.vehicleInformation.statuses.DMVProcessing' }),
    fromUSCustoms: intl.formatMessage({ id: 'trackingPage.vehicleInformation.statuses.fromUSCustoms' }),
    sent: intl.formatMessage({ id: 'trackingPage.vehicleInformation.statuses.sent' }),
    awaitingFromUSCustoms: intl.formatMessage({ id: 'trackingPage.vehicleInformation.statuses.awaitingFromUSCustoms' }),
    pending: intl.formatMessage({ id: 'trackingPage.vehicleInformation.statuses.pending' }),
  };

  const STATUSES = {
    Auction: translationSets.awaitingFromAuction,
    'Need Title': translationSets.awaitingFromAuction,
    Customer: translationSets.awaitingFromAuction,
    'In transit to EH': translationSets.awaitingFromAuction,
    AutoBidMaster: translationSets.inProcessing,
    Warehouse: translationSets.warehouse,
    'Sent to Agent': translationSets.sentToAgent,
    Transit: translationSets.inTransit,
    'Awaiting FedEx Pickup': translationSets.inProcessing,
    'Sent to Auction': translationSets.inProcessing,
    'AutoBidMaster - HOLD': translationSets.inOffice,
    Duplicate: translationSets.duplicate,
    Abandoned: translationSets.abandoned,
    'DMV Processing': translationSets.DMVProcessing,
    'Sent To Customer': translationSets.sent,
    'Sent to Member': translationSets.sent,
    EasyHaul: translationSets.inProcessing,
    'From US Customs': translationSets.awaitingFromUSCustoms,
    Pending: translationSets.pending,
  };

  const hasTrackNumber = shippingOrder.titleStatus === 'Sent To Customer' && Boolean(shippingOrder.titleTrackingNumber);

  return (
    <CardPlane
      title={<FormattedMessage id="shared.label.shippingInformation" />}
      className={classes.shippingInformation}
      contentClassName={classes.card}
    >
      <Row
        condition={Boolean(shippingOrder.titleStatus)}
        label={<FormattedMessage id="trackingPage.vehicleInformation.titleStatus" />}
        value={
          <>
            {STATUSES[shippingOrder.titleStatus] || '—'}
            {hasTrackNumber && (
              <>
                {' '}
                <Link href={shippingOrder.titleTrackingUrl} isTargetBlank>
                  {shippingOrder.titleTrackingNumber}
                </Link>
              </>
            )}
            <TooltipOnHover
              content={<FormattedMessage id="trackingPage.trackingInformation.tooltip.titleStatus" />}
              badgeTop={-1}
            />
          </>
        }
      />
      <Row
        condition={internationalType && Boolean(lot.keysStatus)}
        label={<FormattedMessage id="trackingPage.vehicleInformation.keys" />}
        value={
          <>
            <span className={classes.value}>{lot.keysStatus}</span>
            <TooltipOnHover
              content={<FormattedMessage id="trackingPage.trackingInformation.tooltip.keys" />}
              badgeTop={-1}
            />
          </>
        }
      />
      <Row
        condition={Boolean(shippingOrder.origin)}
        label={<FormattedMessage id="trackingPage.trackingInformation.shippingFrom" />}
        value={shippingOrder.origin}
      />
      <Row
        condition={Boolean(shippingOrder.destination)}
        label={<FormattedMessage id="trackingPage.trackingInformation.shippingTo" />}
        value={
          <>
            <span className={classes.value}>{shippingOrder.destination}</span>
            <TooltipOnHover
              content={
                <FormattedMessage
                  id={
                    internationalType
                      ? 'trackingPage.trackingInformation.tooltip.destination.intl'
                      : 'trackingPage.trackingInformation.tooltip.destination.domestic'
                  }
                />
              }
              badgeTop={-1}
            />
          </>
        }
      />

      {internationalType && (
        <>
          <Row
            condition={Boolean(shippingOrder.booking)}
            label={<FormattedMessage id="trackingPage.trackingInformation.booking" />}
            value={
              <>
                <span className={classes.value}>{shippingOrder.booking}</span>
                <TooltipOnHover
                  content={<FormattedMessage id="trackingPage.trackingInformation.tooltip.booking" />}
                  badgeTop={-1}
                />
              </>
            }
          />
          <Row
            condition={Boolean(shippingOrder.booking)}
            label={<FormattedMessage id="trackingPage.trackingInformation.container" />}
            value={
              <>
                <span className={classes.value}>{shippingOrder.container}</span>
                <TooltipOnHover
                  content={<FormattedMessage id="trackingPage.trackingInformation.tooltip.containerId" />}
                  badgeTop={-1}
                />
              </>
            }
          />
          <Row
            condition={Boolean(shippingOrder.carrier)}
            label={<FormattedMessage id="trackingPage.trackingInformation.shippingLine" />}
            value={
              <>
                <span className={classes.value}>
                  {shippingOrder.carrierUrl ? (
                    <a href={shippingOrder.carrierUrl} target="_blank" rel="noopener noreferrer">
                      {shippingOrder.carrier}
                    </a>
                  ) : (
                    <>{shippingOrder.carrier}</>
                  )}
                </span>
                <TooltipOnHover
                  content={<FormattedMessage id="trackingPage.trackingInformation.tooltip.shippingLine" />}
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
