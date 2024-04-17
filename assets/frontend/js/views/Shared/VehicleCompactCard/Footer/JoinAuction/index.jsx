import React from 'react';
import PropTypes from 'prop-types';
import Button from 'frontend/js/components/Button';
import FormattedMessage from 'frontend/js/components/FormattedMessage';

function JoinAuction({ href }) {
  return <Button href={href} color="green" label={<FormattedMessage id="joinAuctions" />} />;
}

JoinAuction.propTypes = {
  href: PropTypes.string.isRequired,
};

export default JoinAuction;
