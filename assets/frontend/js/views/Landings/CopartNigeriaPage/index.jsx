import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import RouterService from 'frontend/js/api/RouterService';
import SimpleHeader from 'frontend/js/views/Shared/SimpleHeader';
import Hero from './Hero';
import HowItWorks from './HowItWorks';
import BuyerSupport from './BuyerSupport';
import Shipping from './Shipping';
import ReviewsSection from './ReviewsSection';
import RegisterCtaSection from './RegisterCtaSection';

function CopartNigeriaPage() {
  const { pageType } = useParams();
  const isCheki = pageType === 'cheki';
  const { isAuthenticated } = useCustomerHelper();

  if (isAuthenticated) {
    return <Redirect to={RouterService.getRoute(isCheki ? 'dashboard' : 'autoShippingNigeria')} />;
  }

  return (
    <>
      <div>
        <SimpleHeader />
        <Hero pageType={pageType} />
        <HowItWorks />
        <BuyerSupport />
        <Shipping />
        <ReviewsSection />
        <RegisterCtaSection />
      </div>
    </>
  );
}

export default CopartNigeriaPage;
