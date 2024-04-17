import React, { memo } from 'react';
import PropTypes from 'prop-types';
import InternationalSvg from './img/ic_international.svg';

function CountryFlag({ className, iso_2, hasBorder }) {
  const styles = {};
  const src = iso_2 ? `/img/flags/${iso_2.toLowerCase()}.svg` : InternationalSvg;

  if (hasBorder) {
    styles.border = '1px solid #eeeeee';
  }

  return <img className={className} style={styles} src={src} alt={`${iso_2} flag`} />;
}

CountryFlag.propTypes = {
  iso_2: PropTypes.string.isRequired,
  hasBorder: PropTypes.bool,
  className: PropTypes.string,
};

CountryFlag.defaultProps = {
  className: '',
  hasBorder: false,
};

export default memo(CountryFlag);
