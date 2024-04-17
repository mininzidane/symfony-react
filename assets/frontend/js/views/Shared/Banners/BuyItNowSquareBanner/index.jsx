import React from 'react';
import ImageMultiRes from 'frontend/js/components/Image/ImageMultiRes';
import Link from 'frontend/js/components/Link';
import LanguageService from 'frontend/js/api/LanguageService';

function importAll(r) {
  const images = {};
  r.keys().forEach((item) => {
    images[item.replace('./', '').replace('.png', '')] = r(item);
  });
  return images;
}

const IMAGES = importAll(require.context('./img'));

function BuyItNowSquareBanner() {
  const locale = LanguageService.getCurrentLocale();
  const x1Img = IMAGES[locale] || IMAGES[LanguageService.DEFAULT_LOCALE];
  const x2Img = IMAGES[`${locale}@2x`] || IMAGES[`${LanguageService.DEFAULT_LOCALE}@2x`];

  return (
    <Link routeParams={['buyItNow']}>
      <ImageMultiRes x1={x1Img} x2={x2Img} alt="Banner" ratio={100} lazy />
    </Link>
  );
}

export default BuyItNowSquareBanner;
