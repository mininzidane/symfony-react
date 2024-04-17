import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CopartBrokerSvg from 'frontend/images/shared/partners/copart-broker.svg';
import LanguageService from 'frontend/js/api/LanguageService';
import NortonPng from 'frontend/images/shared/partners/norton.png';
import CardsPng from 'frontend/images/shared/partners/cards.png';
import RouterService from 'frontend/js/api/RouterService';
import useStyles from './useStyles';

function Partners({ greyscale, className }) {
  const classes = useStyles();

  return (
    <div className={classNames(className, classes.root, { [classes.greyscale]: greyscale })}>
      <a
        style={{ flexShrink: 0 }}
        href={RouterService.getRoute('copart', false, true)}
        target="_blank"
        rel="noopener noreferrer nofollow"
      >
        <img src={CopartBrokerSvg} className="img--copart" alt="Copart" />
      </a>

      <a
        style={{ flexShrink: 0 }}
        className="ml-20 mr-20"
        href={`https://trustsealinfo.websecurity.norton.com/splash?form_file=fdf/splash.fdf&dn=www.autobidmaster.com&lang=${LanguageService.getCurrentLocale()}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={NortonPng} style={{ maxWidth: '100%' }} alt="Norton" />
      </a>

      <img src={CardsPng} alt="All major payment cards" />
    </div>
  );
}

Partners.propTypes = {
  greyscale: PropTypes.bool,
  className: PropTypes.string,
};

Partners.defaultProps = {
  greyscale: false,
  className: '',
};

export default Partners;
