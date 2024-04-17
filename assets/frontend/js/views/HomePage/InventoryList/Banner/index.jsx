import React from 'react';
import ImageMultiRes from 'frontend/js/components/Image/ImageMultiRes';
import Link from 'frontend/js/components/Link';
import LanguageService from 'frontend/js/api/LanguageService';
import BannerPng from './img/banner.png';
import Banner2xPng from './img/banner@2x.png';
import BannerRuPng from './img/banner_ru.png';
import BannerRu2xPng from './img/banner_ru@2x.png';

const defaultLocale = LanguageService.DEFAULT_LOCALE;

const bannerLocaleMap = {
  [defaultLocale]: { x1: BannerPng, x2: Banner2xPng },
  ru: { x1: BannerRuPng, x2: BannerRu2xPng },
};

function Banner() {
  const locale = LanguageService.getCurrentLocale();
  const x1Img = (bannerLocaleMap[locale] && bannerLocaleMap[locale].x1) || bannerLocaleMap[defaultLocale].x1;
  const x2Img = (bannerLocaleMap[locale] && bannerLocaleMap[locale].x2) || bannerLocaleMap[defaultLocale].x2;

  return (
    <Link routeParams={['buyItNow']}>
      <ImageMultiRes x1={x1Img} x2={x2Img} alt="Banner" ratio={292} lazy />
    </Link>
  );
}

export default Banner;
