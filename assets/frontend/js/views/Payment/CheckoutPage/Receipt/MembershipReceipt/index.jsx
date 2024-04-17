import React, { useEffect } from 'react';
import classnames from 'classnames';
import get from 'lodash/get';
import { FormattedMessage } from 'react-intl-phraseapp';
import useIntl from 'frontend/js/hooks/useIntl';
import PaymentService from 'frontend/js/api/PaymentService';
import RouterService from 'frontend/js/api/RouterService';
import GoogleAnalyticsService from 'frontend/js/api/GoogleAnalyticsService';
import Button from 'frontend/js/components/Button';
import Link from 'frontend/js/components/Link';
import CongratulationsCard from 'frontend/js/views/Payment/_Shared/Congratulations/Card';
import Products from 'frontend/js/views/Payment/_Shared/Congratulations/Products';
import AccountBiddingStatus from 'frontend/js/views/Payment/_Shared/Congratulations/AccountBiddingStatus';
import useCheckoutContext from 'frontend/js/views/Payment/CheckoutPage/_Context/useCheckoutContext';
import Transactions from '../_Shared/Transactions';
import WireTransferReceipt from '../_Shared/WireTransferReceipt';
import useStyles from './useStyles';

function MembershipReceipt() {
  const classes = useStyles();
  const intl = useIntl();

  const ga = new GoogleAnalyticsService();

  const { receipt } = useCheckoutContext();
  const { method, amountToPay } = receipt;

  if (method === PaymentService.METHOD.WIRE_TRANSFER) {
    return <WireTransferReceipt />;
  }

  const { customer: currentCustomer } = window;
  const currentPhoneNumber = get(currentCustomer, 'phoneNumber');
  const {
    data: { continueUrl = '', products = [], transactions = [], membership = {}, customer = {} },
  } = receipt;
  const { blRemainingAmount, balance, phoneNumber, membershipType } = customer;
  const hasDeposit = blRemainingAmount !== 0;
  const phoneUpdated = phoneNumber && currentPhoneNumber !== phoneNumber;

  const translationSets = {
    youCanStartBidding: intl.formatMessage({ id: 'receiptPage.youCanStartBidding' }),
    youAreAlmostReady: intl.formatMessage({ id: 'receiptPage.youAreAlmostReady' }), // TODO Different from the texts in the template
    membership: intl.formatMessage({ id: 'receiptPage.membership' }),
    continueToBidding: intl.formatMessage({ id: 'receiptPage.continueToBidding' }),
    addDepositToStartBidding: intl.formatMessage({ id: 'receiptPage.addDepositToStartBidding' }),
  };

  useEffect(() => {
    ga.sendEvent('submit', 'payment', membershipType.name, amountToPay);
  }, []);

  return (
    <CongratulationsCard subtitle={hasDeposit ? translationSets.youCanStartBidding : translationSets.youAreAlmostReady}>
      <div className="m-0-a" style={{ maxWidth: '480px' }}>
        {products && <Products items={products} />}
        {transactions && <Transactions items={transactions} />}

        <AccountBiddingStatus
          className="mt-20"
          buyerPower={blRemainingAmount}
          deposit={Number(balance)}
          membership={membership}
        />

        <Button
          href={hasDeposit ? continueUrl : RouterService.getRoute('buyerPower')}
          label={translationSets[hasDeposit ? 'continueToBidding' : 'addDepositToStartBidding']}
          className={classnames(classes.continueCta, { 'has-extra-margin': hasDeposit })}
          size="lg"
        />

        {method === PaymentService.METHOD.CREDIT_CARD && phoneUpdated && (
          <div className="text-xs mt-35 sm-mt-30">
            <FormattedMessage
              id="receiptPage.wasSetAsYourMailingAddress"
              values={{
                address: [customer.address, customer.city, get(customer, 'state.code', ''), customer.zip]
                  .filter(Boolean)
                  .join(','),
                phoneNumber: () => <span className="ws-n">{customer.phoneNumber}</span>,
              }}
            />
            <br />
            <FormattedMessage
              id="receiptPage.youCanAlwaysEditIt"
              values={{
                a: (chunks) => (
                  <a href={RouterService.getRoute('contactInfo')} className="ws-n">
                    {chunks}
                  </a>
                ),
              }}
            />
          </div>
        )}
      </div>

      {!hasDeposit && (
        <div className="mt-35 sm-mt-30 ta-c">
          <Link href={continueUrl}>
            <FormattedMessage id="receiptPage.finishThisLater" />
          </Link>
        </div>
      )}
    </CongratulationsCard>
  );
}

export default MembershipReceipt;
