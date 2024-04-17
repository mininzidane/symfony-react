import React from 'react';
import PropTypes from 'prop-types';

function SmsLink({ className, phone }) {
  const strippedPhone = phone.replace(/[^+\d]/g, '');
  const href = `sms:${strippedPhone}`;

  return (
    <a className={className} href={href} itemProp="telephone" content={strippedPhone}>
      {phone}
    </a>
  );
}

SmsLink.propTypes = {
  className: PropTypes.string,
  phone: PropTypes.string.isRequired,
};

SmsLink.defaultProps = {
  className: '',
};

export default SmsLink;
