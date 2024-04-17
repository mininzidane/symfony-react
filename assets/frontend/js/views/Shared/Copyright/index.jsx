/* eslint-disable react/no-danger */
/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import PropTypes from 'prop-types';
import t from 'frontend/js/api/TranslatorService';
import DateTimeService from 'frontend/js/lib/utils/DateTimeService';
import RouterService from 'frontend/js/api/RouterService';

function Copyright({ isShort }) {
  return (
    <>
      <>{t('footer.copyright', { year: DateTimeService.format(new Date(), 'yyyy') })}</>
      {!isShort && (
        <>
          {' '}
          {t('footer.copyright.description', {
            tos: <a href={RouterService.getRoute('termsOfService')}>{t('footer.copyright.tos')}</a>,
            privacy: <a href={RouterService.getRoute('privacy')}>{t('footer.copyright.privacy')}</a>,
            sitemap: <a href={RouterService.getRoute('sitemap')}>{t('footer.copyright.sitemap')}</a>,
            copart: (
              <a href={RouterService.getRoute('copart', false, true)} target="_blank" rel="noreferrer nofollow">
                {t('footer.partners.copart')}
              </a>
            ),
          })}
        </>
      )}
    </>
  );
}

Copyright.propTypes = {
  isShort: PropTypes.bool,
};

Copyright.defaultProps = {
  isShort: false,
};

export default Copyright;
