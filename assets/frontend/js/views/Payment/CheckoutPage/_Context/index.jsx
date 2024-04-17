import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PaymentService from 'frontend/js/api/PaymentService';
import CheckoutContext from './CheckoutContext';
import useProductType from './helpers/useProductType';
import useInvoiceDetails from './helpers/useInvoiceDetails';
import usePaymentPayload from './helpers/usePaymentPayload';
import useCheckoutForm from './helpers/useForm';
import usePaymentMethod from './helpers/usePaymentMethod';
import useDiscount from './helpers/useDiscount';
import useTotal from './helpers/useTotal';
import useSelectedInvoices from './helpers/useSelectedInvoices';

const CheckoutContextProvider = ({ children }) => {
  const [receipt, setReceipt] = useState(null);
  const [error, setError] = useState(false);
  const [coupon, setCoupon] = useState(null);
  const [submitForm, setForm] = useCheckoutForm();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentGuide, setPaymentGuide] = useState();
  const [isInvoiceUploaded, setIsInvoiceUploaded] = useState(false);

  const product = useProductType();
  const payload = usePaymentPayload(product, coupon);

  const { invoices, allowedPaymentMethods, isCouponAllowed, payPalEnabledFunds } = useInvoiceDetails(product);
  const [selectedPaymentMethod, setPaymentMethod] = usePaymentMethod(allowedPaymentMethods);
  const selectedInvoices = useSelectedInvoices(invoices, selectedPaymentMethod);

  const { total, totalToPay } = useTotal(selectedInvoices, product);
  const discount = useDiscount(total, coupon);

  async function logPaymentActivity() {
    const paymentType = selectedPaymentMethod.replace(' ', '-').toLowerCase();

    return PaymentService.logPayment(paymentType, payload);
  }

  function handlePaymentSuccess(data) {
    const { customer } = data;
    if (customer) {
      window.customer = customer;
    }

    setReceipt({ method: selectedPaymentMethod, data });
  }

  return (
    <CheckoutContext.Provider
      value={{
        amount: total - discount,
        amountToPay: totalToPay,
        invoices: selectedInvoices,
        product,
        payload,
        paymentMethod: {
          options: allowedPaymentMethods,
          selected: selectedPaymentMethod,
          setPaymentMethod,
          change: (v) => {
            setPaymentMethod(v);
            setForm(null);
            setError(false);
          },
        },
        coupon: {
          allowed: isCouponAllowed,
          applied: Boolean(coupon),
          discount,
          set: setCoupon,
        },
        form: {
          submit: submitForm,
          set: setForm,
          isProcessing,
          setIsProcessing,
        },
        error: {
          shown: error,
          show: () => setError(true),
          hide: () => setError(false),
        },
        paid: Boolean(receipt),
        receipt,
        onSuccess: handlePaymentSuccess,
        logPaymentActivity,
        payPalEnabledFunds,
        payPalVenmoEnabled: payPalEnabledFunds && payPalEnabledFunds.includes('venmo'),
        paymentGuide,
        setPaymentGuide,
        isInvoiceUploaded,
        setIsInvoiceUploaded,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

CheckoutContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CheckoutContextProvider;
