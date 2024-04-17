import React from 'react';
import PropTypes from 'prop-types';

function FlashMessage({ type, message }) {
  if (!message) {
    return null;
  }

  if (type === 'success') {
    return (
      <div className="alert alert-success">
        <i className="fa fa-check" /> <b>{message}</b>
      </div>
    );
  }

  if (type === 'alert') {
    return (
      <div className="alert alert-warning">
        <i className="fa fa-bell-o" /> <b>{message}</b>
      </div>
    );
  }

  if (type === 'error') {
    return (
      <div className="alert alert-danger">
        <i className="fa fa-ban" /> <b>{message}</b>
      </div>
    );
  }

  return (
    <div className="alert alert-info">
      <i className="fa fa-info-circle" /> <b>{message}</b>
    </div>
  );
}

FlashMessage.defaultProps = {
  type: 'info',
};

FlashMessage.propTypes = {
  type: PropTypes.string,
  message: PropTypes.string.isRequired,
};

export default FlashMessage;
