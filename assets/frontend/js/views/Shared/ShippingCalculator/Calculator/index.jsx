import React from 'react';
import PropTypes from 'prop-types';
import Card from 'frontend/js/components/Card';
import VehicleCalculator from 'frontend/js/views/Shared/VehicleCalculator';
import BootstrapService from 'frontend/js/api/BootstrapService';
import useStyles from './useStyles';

function Calculator({ onOrderIntent, isMobileView, defaultValues }) {
  const isMandatoryInsurance = BootstrapService.getAppValue('isMandatoryInsurance', true);
  const classes = useStyles();

  return (
    <Card className={classes.root} elevation={2}>
      <VehicleCalculator
        defaultValues={defaultValues}
        isMobileView={isMobileView}
        isLegacyView
        config={{
          input: {
            price: false,
            insurance: isMandatoryInsurance,
            lotIdOrVin: true,
            auctionLocationId: true,
            vehicleType: false,
            countryId: true,
            destinationId: true,
            USPortId: true,
          },
          receipt: {
            price: false,
            fees: false,
            shipping: true,
            insurance: isMandatoryInsurance,
            unlimitedAuctionStorage: isMandatoryInsurance,
            electricFee: true,
            countryRates: false,
            subTotal: false,
          },
          orderShipping: true,
        }}
        onOrderIntent={onOrderIntent}
      />
    </Card>
  );
}

Calculator.defaultProps = {
  defaultValues: {},
  isMobileView: false,
  onOrderIntent: () => {},
};

Calculator.propTypes = {
  defaultValues: PropTypes.shape({}),
  isMobileView: PropTypes.bool,
  onOrderIntent: PropTypes.func,
};

export default Calculator;
