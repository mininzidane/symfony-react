/* eslint-disable react/prop-types */
import React from 'react';
import Container from 'frontend/js/components/Container';
import TrackingService from 'frontend/js/api/TrackingService';
import Loader from 'frontend/js/views/Shared/Loader';
import ShippingInformation from './ShippingInformation';
import TrackingInformation from './TrackingInformation';
import OrderInformation from './OrderInformation';
import NotFound from './NotFound';
import StatusSection from './StatusSection';
import TrackingBar from './TrackingBar';
import Documents from './Documents';
import useStyles from './useStyles';

function PageContent({ loading, error, refetch, shippingOrder }) {
  const classes = useStyles();

  if (loading) {
    return <Loader />;
  }

  if (error || !shippingOrder) {
    return <NotFound />;
  }

  const { shippingStatus } = shippingOrder;
  const { STATUS_AWAITING_PICKUP, STATUS_DELIVERED, STATUS_IN_TRANSIT, STATUS_SAILING, STATUS_WAREHOUSE, STATUS_PORT } =
    TrackingService;

  let step = 0;

  if (STATUS_AWAITING_PICKUP === shippingStatus) {
    step = 1;
  }

  if (STATUS_IN_TRANSIT === shippingStatus) {
    step = 2;
  }

  if ([STATUS_WAREHOUSE, STATUS_PORT].includes(shippingStatus)) {
    step = 3;
  }

  if (STATUS_SAILING === shippingStatus) {
    step = 4;
  }

  if (STATUS_DELIVERED === shippingStatus) {
    step = 5;
  }

  return (
    <>
      <StatusSection shippingStatus={shippingStatus} step={step} />
      <TrackingBar step={step} />
      <Container className={classes.root}>
        <div className={classes.info}>
          <TrackingInformation shippingOrder={shippingOrder} />
          <ShippingInformation shippingOrder={shippingOrder} />
          <Documents shippingOrder={shippingOrder} refetch={refetch} />
        </div>
        <OrderInformation shippingOrder={shippingOrder} />
      </Container>
    </>
  );
}

export default PageContent;
