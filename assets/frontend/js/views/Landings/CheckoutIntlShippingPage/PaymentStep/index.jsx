import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl-phraseapp';
import { useQuery } from 'react-query';
import get from 'lodash/get';
import PaymentService from 'frontend/js/api/PaymentService';
import useSelectedInvoices from 'frontend/js/views/Payment/CheckoutPage/_Context/helpers/useSelectedInvoices';
import useTotal from 'frontend/js/views/Payment/CheckoutPage/_Context/helpers/useTotal';
import Stepper from 'frontend/js/components/Stepper';
import Loader from 'frontend/js/views/Shared/Loader';
import PaymentInformation from './PaymentInformation';
import OrderSummary from './OrderSummary';
import useOrderInfo from '../useOrderInfo';
import useStyles from './useStyles';

function PaymentStep({ shippingOrder }) {
  const classes = useStyles();
  const quote = get(shippingOrder, 'orderInformation.quote', null);
  const token = get(shippingOrder, 'token', '');
  const path = `invoice?shippingOrder=${token}`;

  const { data, isLoading } = useQuery(['invoice-details-data', path], () => PaymentService.getInvoiceDetails(path), {
    cacheTime: 0,
  });

  const invoices = get(data, 'invoices', {});
  const selectedInvoices = useSelectedInvoices(invoices, PaymentService.METHOD.WIRE_TRANSFER);
  const { total } = useTotal(selectedInvoices, PaymentService.PRODUCT.SHIPPING);
  const { destination, origin, vin } = useOrderInfo(quote);

  return (
    <div className={classes.root}>
      <Stepper
        className={classes.stepper}
        active={1}
        steps={[
          <FormattedMessage id="checkoutIntlShippingPage.steps.step1" />,
          <FormattedMessage id="checkoutIntlShippingPage.steps.step2" />,
          <FormattedMessage id="checkoutIntlShippingPage.steps.step3" />,
        ]}
      />

      {isLoading ? (
        <Loader minHeight={250} />
      ) : (
        <div className={classes.grid}>
          <PaymentInformation orderId={token} />
          <OrderSummary
            vin={vin}
            shippingFrom={origin}
            shippingTo={destination}
            invoices={selectedInvoices}
            total={total}
            orderId={token}
          />
        </div>
      )}
    </div>
  );
}

PaymentStep.defaultProps = {
  shippingOrder: null,
};

PaymentStep.propTypes = {
  shippingOrder: PropTypes.object,
};

export default PaymentStep;
