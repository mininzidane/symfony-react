import React from 'react';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import useIntl from 'frontend/js/hooks/useIntl';
// import Amount from 'frontend/js/components/Amount';
import useStyles from './useStyles';

function VehicleSold() {
  const intl = useIntl();
  const classes = useStyles();
  const { firstName } = useCustomerHelper();
  return (
    <div className={classes.root}>
      <div className={classes.title}>
        {intl.formatMessage({ id: 'consignment.vehicleSold.title' }, { firstName, nbsp: <>&nbsp;</> })}
      </div>
      {/*
        TODO need data
        <div className={classes.content}>
          {intl.formatMessage({ id: 'consignment.vehicleSold.content' }, { amount: "$1,200 USD", date: "Tuesday, Nov 5 2022" })}
        </div>
      */}
    </div>
  );
}

export default VehicleSold;
