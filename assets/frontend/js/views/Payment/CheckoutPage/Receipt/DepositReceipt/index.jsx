import React, { useEffect, useState } from 'react';
import useIntl from 'frontend/js/hooks/useIntl';
import PaymentService from 'frontend/js/api/PaymentService';
import RouterService from 'frontend/js/api/RouterService';
import GoogleAnalyticsService from 'frontend/js/api/GoogleAnalyticsService';
import Button from 'frontend/js/components/Button';
import useCheckoutContext from 'frontend/js/views/Payment/CheckoutPage/_Context/useCheckoutContext';
import CongratulationsCard from 'frontend/js/views/Payment/_Shared/Congratulations/Card';
import AccountBiddingStatus from 'frontend/js/views/Payment/_Shared/Congratulations/AccountBiddingStatus';
import Products from 'frontend/js/views/Payment/_Shared/Congratulations/Products';
import Transactions from '../_Shared/Transactions';
import WireTransferReceipt from '../_Shared/WireTransferReceipt';
import LotSimpleCard from './LotSimpleCard';
import UploadUserId from './UploadUserId';

function DepositReceipt() {
  const intl = useIntl();
  const [hasCustomerId, setHasCustomerId] = useState(false);
  const { receipt } = useCheckoutContext();
  const { method, amountToPay } = receipt;

  const ga = new GoogleAnalyticsService();

  if (method === PaymentService.METHOD.WIRE_TRANSFER) {
    return <WireTransferReceipt />;
  }

  const translationSets = {
    continueToBidding: intl.formatMessage({ id: 'receiptPage.continueToBidding' }),
    yourBuyerPowerIsNowSet: intl.formatMessage({ id: 'receiptPage.yourBuyerPowerIsNowSet' }),
    youCanStartBidding: intl.formatMessage({ id: 'receiptPage.youCanStartBidding' }),
  };

  const {
    data: { continueUrl, products = [], transactions = [], membership = {}, lot = null, customer = {} },
  } = receipt;
  const { id: customerId, blRemainingAmount, balance, identityDocumentCount, userDocUploadDisabled } = customer;

  function handleSubmitSuccess(customerData) {
    window.customer = customerData;
    setHasCustomerId(true);
  }

  const isCustomerUploadPhoto = !identityDocumentCount && !userDocUploadDisabled && !hasCustomerId;

  useEffect(() => {
    ga.sendEvent('submit', 'payment', 'balance', amountToPay);
  }, []);

  return (
    <CongratulationsCard title={translationSets.yourBuyerPowerIsNowSet} subtitle={translationSets.youCanStartBidding}>
      <div className="m-0-a" style={{ maxWidth: '480px' }}>
        {products && <Products items={products} />}
        {transactions && <Transactions items={transactions} />}

        <AccountBiddingStatus
          className="mt-20"
          buyerPower={blRemainingAmount}
          deposit={Number(balance)}
          membership={membership}
        />
        {lot && <LotSimpleCard lot={lot} className="mt-30" />}
        {isCustomerUploadPhoto && (
          <UploadUserId className="pt-30" customerId={customerId} onSubmitSuccess={handleSubmitSuccess} />
        )}
        {!isCustomerUploadPhoto && (
          <Button
            href={continueUrl || RouterService.getRoute('buyerPower')}
            label={translationSets.continueToBidding}
            className="mt-30"
            size="lg"
          />
        )}
      </div>
      <div className="pb-25 sm-pb-10" />
    </CongratulationsCard>
  );
}

export default DepositReceipt;
