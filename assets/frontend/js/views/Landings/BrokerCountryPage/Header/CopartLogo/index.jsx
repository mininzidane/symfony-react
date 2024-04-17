import React from 'react';
import PropTypes from 'prop-types';
import CountryService from 'frontend/js/api/CountryService';
import CopartLoungeLogoSvg from 'frontend/images/shared/partners/copart-lounge-white.svg';
import CopartLogoSvg from 'frontend/images/shared/partners/copart-logo-ru.svg';
import useStyles from './useStyles';

function CopartLogo({ iso2 }) {
  const classes = useStyles();

  if (CountryService.isCountryWithLounge(iso2)) {
    return <img src={CopartLoungeLogoSvg} alt="Copart" className={classes.loungeLogo} />;
  }

  return <img src={CopartLogoSvg} alt="Copart" className={classes.logo} />;
}

CopartLogo.propTypes = {
  iso2: PropTypes.string.isRequired,
};

export default CopartLogo;
