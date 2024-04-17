/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import ContainerFullScreen from 'frontend/js/components/ContainerFullScreen';
import Container from 'frontend/js/components/Container';
import useCheckoutContext from '../_Context/useCheckoutContext';
import Summary from './Summary';
import HeaderLabel from './HeaderLabel';
import PaymentForm from './PaymentForm';
import SuccessState from './SuccessState';
import PaymentGuide from './Guide';
import useStyles from './useStyles';

function Payment({ coupon }) {
  const classes = useStyles();
  const { invoices, paymentGuide, isInvoiceUploaded } = useCheckoutContext();

  if (!invoices) {
    return null;
  }

  if (isInvoiceUploaded) {
    return (
      <>
        <ContainerFullScreen isUltraWide>
          <HeaderLabel />
        </ContainerFullScreen>

        <Container>
          <SuccessState />
        </Container>
      </>
    );
  }

  if (paymentGuide) {
    return (
      <>
        <ContainerFullScreen isUltraWide>
          <HeaderLabel />
        </ContainerFullScreen>

        <Container>
          <PaymentGuide method={paymentGuide} />
        </Container>
      </>
    );
  }

  return (
    <>
      <ContainerFullScreen isUltraWide>
        <HeaderLabel />
      </ContainerFullScreen>

      <Container className={classes.layoutContainer}>
        <PaymentForm />
        <Summary couponApplied={coupon} hasInnerTitle />
      </Container>
    </>
  );
}

Payment.propTypes = {
  coupon: PropTypes.object,
};

Payment.defaultProps = {
  coupon: null,
};

export default Payment;
