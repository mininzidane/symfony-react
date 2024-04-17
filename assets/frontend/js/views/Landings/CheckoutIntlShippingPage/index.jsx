import React, { useEffect, useState } from 'react';
import Container from 'frontend/js/components/Container';
import ScrollService from 'frontend/js/lib/utils/ScrollService';
import Header from './Header';
import CheckoutStep from './CheckoutStep';
import PaymentStep from './PaymentStep';
import useStyles from './useStyles';
import GeneralNotification from '../../SiteNotifications/GeneralNotification';

function CheckoutIntlShippingPage() {
  const classes = useStyles();

  const [step, setStep] = useState(1);
  const [isGeneralShown, setGeneralShown] = useState(false);
  const [shippingOrder, setShippingOrder] = useState(null);

  function onCheckoutSuccess(order) {
    ScrollService.scrollToTop();
    setShippingOrder(order);
    setStep(2);
  }

  function dispatchSiteNotificationsEvent(isShown) {
    window.dispatchEvent(new CustomEvent('SiteNotifications', { detail: { isShown } }));
  }

  useEffect(() => {
    const isAnyShown = isGeneralShown === true;

    dispatchSiteNotificationsEvent(isAnyShown);
  }, [isGeneralShown]);

  return (
    <>
      <GeneralNotification
        isGeneralMessageDisabled
        isCountryBannerDisabled
        onShow={() => setGeneralShown(true)}
        onHide={() => setGeneralShown(false)}
      />
      <div className={classes.root}>
        <Header />
        <Container className={classes.container}>
          {step === 1 && <CheckoutStep onSuccess={onCheckoutSuccess} />}
          {step === 2 && <PaymentStep shippingOrder={shippingOrder} />}
        </Container>
      </div>
    </>
  );
}

export default CheckoutIntlShippingPage;
