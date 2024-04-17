import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import InstantOfferService from 'frontend/js/api/InstantOfferService';
import InstantOfferFormPage from './InstantOfferFormPage';
import InstantOfferPage from './InstantOfferPage';

function SellYourCarPage() {
  const { ref: instantOfferRef, hash, version } = useParams();
  const isSellYourCarContinue = Boolean(instantOfferRef) && Boolean(hash);
  const [isLoading, setIsLoading] = useState(isSellYourCarContinue);
  const [isFormShown, setIsFormShown] = useState(isSellYourCarContinue);
  const [customerContacts, setCustomerContacts] = useState(null);
  const [initialInstantOffer, setInitialInstantOffer] = useState(null);

  function handleContactFormSubmit(values) {
    setCustomerContacts(values);
    setIsFormShown(true);
  }

  async function getInstantOffer() {
    setIsLoading(true);
    try {
      const data = await InstantOfferService.getInstantOffer(instantOfferRef, hash);
      setInitialInstantOffer(data?.instantOffer);
    } catch (error) {
      /** ignore */
    }
    setIsLoading(false);
  }

  useEffect(() => {
    if (isSellYourCarContinue) {
      getInstantOffer();
    }

    const $script = document.createElement('script');
    $script.innerHTML =
      "(function(h,o,t,j,a,r){h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};h._hjSettings={hjid:3177340,hjsv:6};a=o.getElementsByTagName('head')[0];r=o.createElement('script');r.async=1;r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;a.appendChild(r);})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');";

    document.body.appendChild($script);

    return () => document.body.removeChild($script);
  }, []);

  if (isFormShown) {
    return (
      <InstantOfferFormPage
        initialInstantOffer={initialInstantOffer}
        customerContacts={customerContacts}
        isLoading={isLoading}
      />
    );
  }

  return <InstantOfferPage onSubmit={handleContactFormSubmit} v2={version === 'v2'} />;
}

export default SellYourCarPage;
