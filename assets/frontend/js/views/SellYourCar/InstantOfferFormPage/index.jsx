import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import HeaderSimple from 'frontend/js/views/SiteHeader/Simple';
import FooterSimple from 'frontend/js/views/SiteFooter/Simple';
import SpinnerWheel from 'frontend/js/components/SpinnerWheel';
import InstantOffer from './InstantOffer';
import useStyles from './useStyles';

function InstantOfferFormPage({ isLoading, customerContacts, initialInstantOffer }) {
  const classes = useStyles();

  useEffect(() => {
    ['site-header', 'site-footer', 'scroll-back-button'].forEach((id) => {
      const $el = document.getElementById(id);
      if ($el) {
        $el.style.display = 'none';
      }
    });
    window.scroll(0, 0);
  }, []);

  return (
    <div className={classes.root}>
      <HeaderSimple />
      {isLoading ? (
        <div className={classes.loader}>
          <SpinnerWheel isCentered size={40} thickness={3} />
        </div>
      ) : (
        <InstantOffer customerContacts={customerContacts} initialInstantOffer={initialInstantOffer} />
      )}
      <div className={classes.footer}>
        <FooterSimple />
      </div>
    </div>
  );
}

InstantOfferFormPage.propTypes = {
  isLoading: PropTypes.bool,
  customerContacts: PropTypes.object,
  initialInstantOffer: PropTypes.object,
};

InstantOfferFormPage.defaultProps = {
  isLoading: false,
  customerContacts: {},
  initialInstantOffer: null,
};

export default InstantOfferFormPage;
