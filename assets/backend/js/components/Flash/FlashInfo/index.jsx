import React from 'react';
import PropTypes from 'prop-types';

function FlashInfo({ children, message }) {
  return (
    <div className="alert alert-info">
      <i className="fa fa-info-circle mr-4" />
      &nbsp;
      {children || <b>{message}</b>}
    </div>
  );
}

FlashInfo.defaultProps = {
  message: '',
  children: null,
};

FlashInfo.propTypes = {
  message: PropTypes.string,
  children: PropTypes.node,
};

export default FlashInfo;
