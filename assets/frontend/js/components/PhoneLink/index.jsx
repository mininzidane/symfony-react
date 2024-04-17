import React from 'react';
import PropTypes from 'prop-types';

function PhoneLink({ className, phone, ...props }) {
  const strippedPhone = phone.replace(/[^+\d]/g, '');
  const href = `tel:${strippedPhone}`;

  return (
    <a className={className} href={href} itemProp="telephone" content={strippedPhone} {...props}>
      {phone}
    </a>
  );
}

PhoneLink.propTypes = {
  className: PropTypes.string,
  phone: PropTypes.string.isRequired,
};

PhoneLink.defaultProps = {
  className: '',
};

export default PhoneLink;
