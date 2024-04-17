import React from 'react';
import PropTypes from 'prop-types';

function FlashSuccess({ children, message }) {
  return (
    <div className="alert alert-success">
      <i className="fa fa-check mr-4" />
      {children || <b>{message}</b>}
    </div>
  );
}

FlashSuccess.defaultProps = {
  message: '',
  children: null,
};

FlashSuccess.propTypes = {
  message: PropTypes.string,
  children: PropTypes.node,
};

export default FlashSuccess;
