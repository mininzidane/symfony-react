import React from 'react';
import ReactMetaTags from 'react-meta-tags';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import LanguageService from 'frontend/js/api/LanguageService';
import RouterService from 'frontend/js/api/RouterService';
import useSeoData from 'frontend/js/hooks/useSeoData';

const Meta = ({ metaKey }) => {
  const params = useParams();
  const [seo, isLoading] = useSeoData(metaKey, params);

  const customAlternateLangs = [
    // there is no ko in AVAILABLE_LOCALES vs prod
    // 'ko',
    { 'ru-UA': 'ru' },
    { 'ru-RU': 'ru' },
    { 'ru-GE': 'ru' },
    { 'ru-BY': 'ru' },
    { 'x-default': 'en' },
  ];
  const alternateLangs = [
    ...LanguageService.AVAILABLE_LOCALES.filter((aLocale) => !['ru'].includes(aLocale)),
    ...customAlternateLangs,
  ];
  const alternateLinks = alternateLangs.map((lang) => {
    let langKey = lang;
    let langValue = lang;

    if (typeof lang === 'object') {
      [[langKey, langValue]] = Object.entries(lang);
    }

    const href = window.location.origin + RouterService.replaceLocaleInPath(window.location.pathname, langValue);

    return <link id={`alternate-${langKey}`} rel="alternate" hrefLang={langKey} href={href} key={langKey} />;
  });

  const common = (
    <>
      {alternateLinks}

      <link href={window.location.origin + window.location.pathname} rel="canonical" />

      <meta name="og:url" content={window.location.href} />
      <meta name="og:locale" content="en_US" />
      <meta name="twitter:site" content="@autobidmaster" />
    </>
  );

  if (isLoading) {
    return common;
  }

  const { title = '', description = '', keywords = '', image, ogType, noIndex, follow, canonicalUrl, details } = seo;

  const latitude = details?.latitude;
  const longitude = details?.longitude;
  const hasPoint = Boolean(latitude && longitude);

  return (
    <ReactMetaTags>
      <title>{title}</title>
      <meta name="og:title" content={title} />
      <meta name="twitter:title" content={title} />

      <meta name="description" content={description} />
      <meta name="og:description" content={description} />
      <meta name="twitter:description" content={description} />

      <meta name="keywords" content={keywords} />

      {image ? (
        <>
          <meta property="og:image" content={image} />
          <meta name="twitter:type" content="summary_large_image" />
          <meta name="twitter:image" content={image} />
        </>
      ) : (
        <meta name="twitter:type" content="summary" />
      )}

      {ogType ? <meta name="og_type" content={ogType} /> : <meta name="og_type" content="website" />}

      {common}

      {noIndex && <meta name="robots" content={follow ? 'noindex follow' : 'noindex'} />}
      {canonicalUrl && <link href={canonicalUrl} rel="canonical" />}

      {hasPoint && (
        <>
          <meta name="place:location:latitude" content={latitude} />
          <meta name="place:location:longitude" content={longitude} />
        </>
      )}
    </ReactMetaTags>
  );
};

Meta.propTypes = {
  metaKey: PropTypes.string.isRequired,
};

export default Meta;
