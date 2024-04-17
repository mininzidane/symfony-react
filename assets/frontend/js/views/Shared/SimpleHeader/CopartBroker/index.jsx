import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import CountryService from 'frontend/js/api/CountryService';
import CopartBrokerSvg from 'frontend/images/shared/partners/copart-broker-white.svg';
import CopartLoungeSVG from 'frontend/images/shared/partners/copart-lounge-white.svg';
import useStyles from './useStyles';

function CopartBroker({ className }) {
  const classes = useStyles();

  if (CountryService.isCopartLounge()) {
    return <img className={classnames(classes.alterLogo, className)} src={CopartLoungeSVG} alt="Copart Lounge" />;
  }

  return <img className={classnames(classes.root, className)} src={CopartBrokerSvg} alt="Copart Registered Broker" />;
}

CopartBroker.propTypes = {
  className: PropTypes.string,
};

CopartBroker.defaultProps = {
  className: '',
};

export default CopartBroker;
