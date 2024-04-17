import React from 'react';
import PropTypes from 'prop-types';

function EmailLink({ className, email }) {
  const href = `mailto:${email}`;

  return (
    <a className={className} href={href} itemProp="email">
      {email}
    </a>
  );
}

EmailLink.propTypes = {
  className: PropTypes.string,
  email: PropTypes.string.isRequired,
};

EmailLink.defaultProps = {
  className: '',
};

export default EmailLink;
