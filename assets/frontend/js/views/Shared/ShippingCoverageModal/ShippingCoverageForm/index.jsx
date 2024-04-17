import React from 'react';
import PropTypes from 'prop-types';
import useIntl from 'frontend/js/hooks/useIntl';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import CargoInsurance from './CargoInsurance';
import UnlimitedAuctionStorage from './UnlimitedAuctionStorage';
import useStyles from './useStyles';

function ShippingCoverageForm({ formik, shippingOrder }) {
  const classes = useStyles();
  const intl = useIntl();

  const { lot } = shippingOrder || {};

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className={classes.desc}>
        <FormattedMessage id="trackingPage.modal.desc.oceanShipping" />
      </div>
      <CargoInsurance formik={formik} lot={shippingOrder?.lot} />
      <UnlimitedAuctionStorage
        formik={formik}
        title={intl.formatMessage({ id: 'vehicleCalculator.unlimitedAuctionStorage' })}
        tooltip={intl.formatMessage({ id: 'vehicleCalculator.tooltip.unlimitedAuctionStorage' })}
        value={formik.values.unlimitedAuctionStorage}
        currency={lot && lot.currencyFeeFormat}
        disabled={shippingOrder.unlimitedAuctionStorage}
      />
    </form>
  );
}

ShippingCoverageForm.propTypes = {
  formik: PropTypes.object.isRequired,
  shippingOrder: PropTypes.object.isRequired,
};

export default ShippingCoverageForm;
