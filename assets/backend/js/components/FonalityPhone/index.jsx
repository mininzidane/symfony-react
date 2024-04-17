import React from 'react';
import PropTypes from 'prop-types';

function FonalityPhone({ className, phone, ...props }) {
  const strippedPhone = phone.replace(/[^+\d]/g, '');
  const href = `tel:${strippedPhone}`;

  return (
    <a className={className} href={href} data-fonality="true" {...props}>
      {strippedPhone}
    </a>
  );
}

FonalityPhone.propTypes = {
  className: PropTypes.string,
  phone: PropTypes.string.isRequired,
};

FonalityPhone.defaultProps = {
  className: '',
};

export default FonalityPhone;
