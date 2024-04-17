import React from 'react';
import useIntl from 'frontend/js/hooks/useIntl';
import Button from 'frontend/js/components/Button';
import ButtonOutlined from 'frontend/js/components/ButtonOutlined';
import Link from 'frontend/js/components/Link';
import RouterService from 'frontend/js/api/RouterService';
import useCheckoutContext from 'frontend/js/views/Payment/CheckoutPage/_Context/useCheckoutContext';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import CongratulationsCard from 'frontend/js/views/Payment/_Shared/Congratulations/Card';
import useStyles from './useStyles';

function WireTransferReceipt() {
  const intl = useIntl();
  const classes = useStyles();
  const { email: customerEmail } = useCustomerHelper();
  const { receipt } = useCheckoutContext();
  const {
    data: { checkoutUrl, continueUrl, invoiceUrl },
  } = receipt;

  const translationSets = {
    invoiceSentToYourEmail: intl.formatMessage({ id: 'receiptPage.invoiceSentToYourEmail' }),
    pleaseCheckYourEmail: intl.formatMessage(
      { id: 'receiptPage.wireTransfer.pleaseCheckYourEmail' },
      {
        strong: () => <strong>{customerEmail}</strong>,
        a: (chunks) => (
          <Link href={invoiceUrl} isTargetBlank>
            {chunks}
          </Link>
        ),
      },
    ),
    pleaseNoteItMayTakeAFewDays: intl.formatMessage(
      { id: 'receiptPage.wireTransfer.pleaseNoteItMayTakeAFewDays' },
      {
        br: <br className="sm-hide" />,
        a: (chunks) => <Link href={checkoutUrl}>{chunks}</Link>,
      },
    ),
    goBack: intl.formatMessage({ id: 'shared.cta.goBack' }),
    continue: intl.formatMessage({ id: 'shared.cta.continue' }),
  };

  return (
    <CongratulationsCard
      title={translationSets.invoiceSentToYourEmail}
      className={classes.root}
      contentClassName={classes.content}
    >
      <div className={classes.wrapText}>
        {translationSets.pleaseCheckYourEmail}
        <br />
        <br />
        <span className="text-red">{translationSets.pleaseNoteItMayTakeAFewDays}</span>
      </div>
      <div className={classes.actions}>
        <ButtonOutlined
          label={translationSets.goBack}
          isBackgroundWhite
          isInline
          onClick={RouterService.reload}
          className={classes.btn}
        />
        <Button href={continueUrl} label={translationSets.continue} isInline className={classes.btn} />
      </div>
    </CongratulationsCard>
  );
}

export default WireTransferReceipt;
