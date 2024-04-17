import React from 'react';
import CompanyService from 'frontend/js/api/CompanyService';
import Card from 'frontend/js/components/Card';
import { FormattedMessage } from 'react-intl-phraseapp';
import RouterService from 'frontend/js/api/RouterService';
import Button from 'frontend/js/components/Button';
import PaymentService from 'frontend/js/api/PaymentService';
import DateTimeService from 'frontend/js/lib/utils/DateTimeService';
import NumberService from 'frontend/js/lib/utils/NumberService';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import useCheckoutContext from 'frontend/js/views/Payment/CheckoutPage/_Context/useCheckoutContext';
import CheckmarkSvg from 'frontend/images/shared/various/checkmark-circle-24x24.svg';
import MoneyGramSvg from 'frontend/images/shared/payment-services/moneygram-single-line.svg';
import WireTransferIconSvg from 'frontend/images/shared/payment-services/wire-transfer-icon.svg';
import ZelleSvg from 'frontend/images/shared/payment-services/zelle-short.svg';
import LightningSvg from './img/lightning.svg';
import useStyles from './useStyles';

function SuccessState() {
  const classes = useStyles();
  const { amount, paymentGuide } = useCheckoutContext();
  const { email, phoneNumber } = useCustomerHelper();
  const { METHOD, PAYMENT_SYSTEM_ACCOUNT } = PaymentService;

  const createdDate = new Date();
  const iconMap = {
    [METHOD.ZELLE]: <img src={ZelleSvg} alt="Zelle" width="44" className={classes.logo} />,
    [METHOD.MONEYGRAM]: <img src={MoneyGramSvg} alt="MoneyGram" width="90" className={classes.logo} />,
    [METHOD.WIRE_TRANSFER]: <img src={WireTransferIconSvg} alt="MoneyGram" width="54" className={classes.logo} />,
  };

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <img src={CheckmarkSvg} alt="Checkmark" className={classes.checkmark} />
        <div className={classes.title}>
          <FormattedMessage id="checkoutPage.paymentMethods.guide.success.title" />
        </div>
        <div className={classes.subtitle}>
          <FormattedMessage id="checkoutPage.paymentMethods.guide.success.on" />{' '}
          {DateTimeService.toLocaleDate(createdDate, {
            timeZone: 'America/Los_Angeles',
            weekday: 'long',
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
          })}{' '}
          <FormattedMessage id="shared.time.at" />{' '}
          {DateTimeService.toLocaleTime(createdDate, { timeZone: 'America/Los_Angeles' })}
        </div>

        <div className={classes.rows}>
          <div className={classes.row}>
            <div>
              <FormattedMessage id="checkoutPage.paymentMethods.guide.success.paidTo" />:
            </div>
            <div>
              <strong>
                {paymentGuide === METHOD.ZELLE && PAYMENT_SYSTEM_ACCOUNT.ZELLE}
                {paymentGuide === METHOD.MONEYGRAM && <>AUTOBIDMASTER, LLC ({PAYMENT_SYSTEM_ACCOUNT.MONEYGRAM})</>}
                {paymentGuide === METHOD.WIRE_TRANSFER && CompanyService.companyName}
              </strong>
            </div>
          </div>
          <div className={classes.row}>
            <div>
              <FormattedMessage id="shared.label.paymentMethod" />:
            </div>
            <div className={classes.logoWrap}>{iconMap[paymentGuide]}</div>
          </div>
          <div className={classes.row}>
            <div>
              <FormattedMessage id="shared.label.amount" />:
            </div>
            <div>
              <strong>{NumberService.formatCurrency(amount)} USD</strong>
            </div>
          </div>
        </div>
        <div className={classes.action}>
          <div className={classes.desc}>
            <FormattedMessage
              id="checkoutPage.paymentMethods.guide.success.desc"
              values={{ email: <strong>{email}</strong>, phoneNumber: <strong>{phoneNumber}</strong> }}
            />
          </div>
          {paymentGuide !== METHOD.WIRE_TRANSFER && (
            <div className={classes.highlight}>
              <img src={LightningSvg} alt="icon" />
              <span>
                <FormattedMessage id="checkoutPage.paymentMethods.guide.thisTypicallyTakesAFewMinutes" />
              </span>
            </div>
          )}
          <Button
            href={RouterService.getRoute('searchResults')}
            label={
              <>
                <FormattedMessage id="shared.cta.gotIt" />!
              </>
            }
            isInline
            className={classes.cta}
          />
        </div>
      </Card>
    </div>
  );
}

export default SuccessState;
