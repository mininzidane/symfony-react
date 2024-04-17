import React from 'react';
import useIntl from 'frontend/js/hooks/useIntl';
import RouterService from 'frontend/js/api/RouterService';
import Container from 'frontend/js/components/Container';
import useCheckoutContext from 'frontend/js/views/Payment/CheckoutPage/_Context/useCheckoutContext';
import CongratulationsCard from 'frontend/js/views/Payment/_Shared/Congratulations/Card';
import AccountBiddingStatus from 'frontend/js/views/Payment/_Shared/Congratulations/AccountBiddingStatus';
import Products from 'frontend/js/views/Payment/_Shared/Congratulations/Products';
import Transactions from 'frontend/js/views/Payment/CheckoutPage/Receipt/_Shared/Transactions';
import Button from 'frontend/js/components/Button';

function InvoiceReceipt() {
  const intl = useIntl();

  const { receipt } = useCheckoutContext();
  const {
    data: { products = [], transactions = [], membership = {}, customer = {} },
  } = receipt;
  const { blRemainingAmount, balance } = customer;

  const translationSets = {
    title: intl.formatMessage({ id: 'receiptPage.paymentReceived' }),
    continueToPurchases: intl.formatMessage({ id: 'receiptPage.continueToPurchases' }),
  };

  return (
    <Container>
      <CongratulationsCard title={translationSets.title}>
        {products && <Products items={products} />}
        {transactions && <Transactions items={transactions} />}

        <AccountBiddingStatus
          className="mt-20"
          buyerPower={blRemainingAmount}
          deposit={Number(balance)}
          membership={membership}
        />

        <Button
          href={RouterService.getRoute('purchases')}
          label={translationSets.continueToPurchases}
          className="mt-30"
          size="lg"
        />

        <div className="pb-35 sm-pb-15" />
      </CongratulationsCard>
    </Container>
  );
}

export default InvoiceReceipt;
