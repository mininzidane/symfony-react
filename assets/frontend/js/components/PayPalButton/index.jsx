import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import useScript from 'frontend/js/hooks/useScript';
import PaymentService from 'frontend/js/api/PaymentService';
import RouterService from 'frontend/js/api/RouterService';
import SpinnerWheel from 'frontend/js/components/SpinnerWheel';
import useStyles from './useStyles';

function PayPalButton({ payload, onSuccess, onCancel, onError, isProcessing, onClick, style, enableFunds }) {
  const paymentMethod = {
    payment: {
      method: PaymentService.METHOD.PAYPAL,
    },
  };

  const ref = useRef();
  const paymentPayload = useRef();
  const classes = useStyles();

  let disabledFunds = [
    'credit',
    'card',
    'bancontact',
    'blik',
    'eps',
    'giropay',
    'ideal',
    'mercadopago',
    'mybank',
    'p24',
    'sepa',
    'sofort',
    'venmo',
  ];

  disabledFunds = disabledFunds.filter((item) => !enableFunds.includes(item)).join(',');

  paymentPayload.current = { ...payload, ...paymentMethod };

  function initPaypal() {
    const createOrder = () => {
      onClick();
      return PaymentService.createPayPalOrder(paymentPayload.current).then((data) => data.orderId);
    };

    const onApprove = (data) =>
      PaymentService.approvePayPalOrder({ ...paymentPayload.current, payPalOrderId: data.orderID }).then(onSuccess);

    const handleCancel = () => {
      PaymentService.deletePayPalOrder(paymentPayload.current);
      onCancel();
    };

    const handleError = () => {
      PaymentService.deletePayPalOrder(paymentPayload.current);
      onError();
    };

    window.paypal
      .Buttons({
        style: {
          shape: 'pill',
          size: 'responsive',
          height: 40,
          color: 'gold',
          label: 'pay',
          tagline: false,
        },
        createOrder,
        onApprove,
        onCancel: handleCancel,
        onError: handleError,
      })
      .render(ref.current);
  }

  const scriptOptions = {
    'client-id': window.payPalClientId,
    'disable-funding': disabledFunds,
    currency: 'USD',
  };

  if (enableFunds) {
    scriptOptions['enable-funding'] = enableFunds.join(',');
  }

  const queryOptions = RouterService.serializeQueryParams(scriptOptions);
  useScript(`https://www.paypal.com/sdk/js?${queryOptions}`, initPaypal);

  return (
    <div className={classes.root}>
      {isProcessing && !enableFunds.includes('card') && (
        <div className={classes.processing}>
          <SpinnerWheel color="blue" size={20} thickness={4} />
        </div>
      )}
      <div ref={ref} style={style} />
    </div>
  );
}

PayPalButton.defaultProps = {
  onSuccess: () => {},
  onError: () => {},
  onCancel: () => {},
  onClick: () => {},
  isProcessing: false,
  style: {},
  enableFunds: [],
};

PayPalButton.propTypes = {
  payload: PropTypes.shape({}).isRequired,
  style: PropTypes.shape({}),
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
  onCancel: PropTypes.func,
  onClick: PropTypes.func,
  isProcessing: PropTypes.bool,
  enableFunds: PropTypes.array,
};

export default PayPalButton;
