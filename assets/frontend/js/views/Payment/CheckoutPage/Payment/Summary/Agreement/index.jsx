import React from 'react';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import RouterService from 'frontend/js/api/RouterService';
import TooltipOnHover from 'frontend/js/components/TooltipOnHover';
import Link from 'frontend/js/components/Link';
import PaymentService from 'frontend/js/api/PaymentService';
import useCheckoutContext from 'frontend/js/views/Payment/CheckoutPage/_Context/useCheckoutContext';
import useStyles from './useStyles';

function Agreement() {
  const classes = useStyles();
  const { getLocalizedHcRoute } = RouterService;
  const { product, paymentMethod } = useCheckoutContext();

  const translationValues = {
    cancellationPolicy: product === PaymentService.PRODUCT.MEMBERSHIP,
    a: (chunks) => (
      <Link href={RouterService.getRoute('terms')} isTargetBlank isNoWrap>
        {chunks}
      </Link>
    ),
    button: (chunks) => (
      <TooltipOnHover
        content={
          <>
            <FormattedMessage id="shared.access.membershipCancellations" />{' '}
            <Link
              href={`${getLocalizedHcRoute('hcRulesAndPolicies')}#membership-rules-policies-0-1`}
              isTargetBlank
              isNoWrap
            >
              <FormattedMessage id="shared.label.readMore" />
            </Link>
          </>
        }
        trigger={chunks}
        triggerClassName={classes.trigger}
        maxWidth={400}
        isFlipEnabled={false}
      />
    ),
  };

  function getTranslationKey() {
    switch (paymentMethod.selected) {
      case PaymentService.METHOD.WIRE_TRANSFER:
        return 'checkoutPage.agreement.wireTransfer';
      case PaymentService.METHOD.PAYPAL:
        return 'checkoutPage.agreement.paypal';
      case PaymentService.METHOD.APPLE_PAY:
        return 'checkoutPage.agreement.applePay';
      case PaymentService.METHOD.GOOGLE_PAY:
        return 'checkoutPage.agreement.googlePay';
      default:
        return 'checkoutPage.agreement.creditCard';
    }
  }

  return (
    <div className={classes.root}>
      <FormattedMessage id={getTranslationKey()} values={translationValues} />
    </div>
  );
}

export default Agreement;
