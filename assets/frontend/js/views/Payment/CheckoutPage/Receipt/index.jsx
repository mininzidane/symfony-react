import React from 'react';
import Container from 'frontend/js/components/Container';
import PaymentService from 'frontend/js/api/PaymentService';
import useCheckoutContext from '../_Context/useCheckoutContext';
import DepositReceipt from './DepositReceipt';
import MembershipReceipt from './MembershipReceipt';
import ShippingReceipt from './ShippingReceipt';
import InvoiceReceipt from './InvoiceReceipt';
import CvReportReceipt from './CvReportReceipt';
import useStyles from './useStyles';

function Receipt() {
  const classes = useStyles();
  const { product } = useCheckoutContext();

  return (
    <Container className={classes.root}>
      {[PaymentService.PRODUCT.INVOICE, PaymentService.PRODUCT.PURCHASE_WITH_SHIPPING].includes(product) && (
        <InvoiceReceipt />
      )}
      {product === PaymentService.PRODUCT.DEPOSIT && <DepositReceipt />}
      {product === PaymentService.PRODUCT.MEMBERSHIP && <MembershipReceipt />}
      {product === PaymentService.PRODUCT.SHIPPING && <ShippingReceipt />}
      {product === PaymentService.PRODUCT.CV_REPORT && <CvReportReceipt />}
    </Container>
  );
}

export default Receipt;
