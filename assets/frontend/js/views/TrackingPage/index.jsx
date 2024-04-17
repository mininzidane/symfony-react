/* eslint-disable react/prop-types */
import React from 'react';
import get from 'lodash/get';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import TrackingService from 'frontend/js/api/TrackingService';
import PageContent from './PageContent';
import LotHeader from './LotHeader';
import useStyles from './useStyles';

function TrackingPage() {
  const { vin, emailOrToken } = useParams();
  const classes = useStyles();

  const trackingService = new TrackingService();

  const { data, isLoading, error, refetch } = useQuery(
    ['tracking-service-data', { vin, emailOrToken }],
    () => trackingService.getShippingOrderTracking({ vin, emailOrToken }),
    { cacheTime: 0 },
  );
  const shippingOrder = get(data, 'shippingOrder[0]', null);

  return (
    <div className={classes.root}>
      {shippingOrder && <LotHeader shippingOrder={shippingOrder} />}
      <PageContent shippingOrder={shippingOrder} loading={isLoading} error={error} refetch={refetch} />
    </div>
  );
}

export default TrackingPage;
