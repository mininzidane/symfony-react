import React from 'react';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import Card from '../../Card';
import TimeSvg from './img/ic_average_pickup_time.svg';
import TrackingServiceSvg from './img/ic_tracking_service.svg';
import WarehouseSvg from './img/ic_warehouse.svg';
import useStyles from './useStyles';

function Benefits() {
  const classes = useStyles();

  return (
    <Card title={<FormattedMessage id="checkoutIntlShippingPage.benefits.title" />} hasPadding={false}>
      <div className={classes.root}>
        <div className={classes.benefit}>
          <div className={classes.icon}>
            <img src={TimeSvg} alt="Average Pickup Time" className={classes.timeIcon} />
          </div>
          <div className={classes.title}>
            <FormattedMessage id="checkoutIntlShippingPage.benefits.pickUpTime" />
          </div>
        </div>
        <div className={classes.benefit}>
          <div className={classes.icon}>
            <img src={TrackingServiceSvg} alt="Tracking Service" className={classes.trackingServiceIcon} />
          </div>
          <div className={classes.title}>
            <FormattedMessage id="checkoutIntlShippingPage.benefits.trackingService" />
          </div>
        </div>
        <div className={classes.benefit}>
          <div className={classes.icon}>
            <img src={WarehouseSvg} alt="Warehouse" className={classes.warehouseIcon} />
          </div>
          <div className={classes.title}>
            <FormattedMessage id="checkoutIntlShippingPage.benefits.freeStorage" />
          </div>
        </div>
      </div>
    </Card>
  );
}

export default Benefits;
