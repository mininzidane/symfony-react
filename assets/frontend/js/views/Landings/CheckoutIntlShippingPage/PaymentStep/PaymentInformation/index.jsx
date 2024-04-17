import React from 'react';
import PropTypes from 'prop-types';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import RadioButton from 'frontend/js/components/Form/RadioButton';
import WireTransferBlue from 'frontend/images/shared/payment-services/wire-transfer-blue.svg';
import Card from '../../Card';
import useStyles from './useStyles';

function PaymentInformation({ orderId }) {
  const classes = useStyles();
  const { email } = useCustomerHelper();
  return (
    <Card title={<FormattedMessage id="shared.label.paymentInformation" />} className={classes.root}>
      <div className={classes.description}>
        <FormattedMessage id="checkoutIntlShippingPage.paymentStep.orderDescription" values={{ orderId }} />
      </div>
      <div className={classes.methodsTitle}>
        <FormattedMessage id="shared.label.paymentMethod" />
      </div>

      <div className={classes.radioButton}>
        <RadioButton
          id="membership-auto-renew-enable"
          label={<FormattedMessage id="shared.label.bankWireTransfer" />}
          value
          isChecked
          name="bankWireTransfer"
        />

        <img src={WireTransferBlue} alt="Wire Transfer" width="28" />
      </div>

      <FormattedMessage
        id="checkoutIntlShippingPage.paymentStep.methodDescription"
        values={{ email }}
        className={classes.info}
      />
    </Card>
  );
}

PaymentInformation.propTypes = {
  orderId: PropTypes.string,
};

PaymentInformation.defaultProps = {
  orderId: null,
};

export default PaymentInformation;
