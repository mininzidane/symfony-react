import React from 'react';
import PropTypes from 'prop-types';

function FlashError({ message }) {
  return (
    <div className="alert alert-danger">
      <i className="fa fa-ban mr-4" />
      &nbsp;
      <b>{message}</b>
    </div>
  );
}

FlashError.defaultProps = {
  message: '',
};

FlashError.propTypes = {
  message: PropTypes.string,
};

export default FlashError;
