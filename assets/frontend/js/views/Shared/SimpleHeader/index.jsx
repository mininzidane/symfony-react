/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import t from 'frontend/js/api/TranslatorService';
import Logo from './Logo';
import CopartBroker from './CopartBroker';
import useStyles from './useStyles';
import LockIcon from './img/lock.svg';

function SiteHeaderSimple({ centerText }) {
  const classes = useStyles();

  useEffect(() => {
    document.getElementById('site-header-for-seo')?.remove();
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.logos}>
        <Logo />
        <CopartBroker />
      </div>

      <div className={classes.centerText}>
        {centerText || <FormattedMessage id="landings.abmIsEasyToUse.disc100.pageTitle" />}
      </div>

      <div className={classes.securedArea}>
        <img src={LockIcon} className={classes.securedAreaIcon} alt="Lock Icon" />
        <span className={classes.securedAreaText}>{t('header.secured_area')}</span>
      </div>
    </div>
  );
}

export default SiteHeaderSimple;
