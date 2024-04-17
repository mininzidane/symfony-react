import React, { memo } from 'react';
import PropTypes from 'prop-types';

function TriangleIcon({ className }) {
  return (
    <svg className={className} width="8" height="5" viewBox="0 0 8 5" fill="none">
      <path d="M3.49691e-07 0.499999L8 0.5L4 4.5L3.49691e-07 0.499999Z" />
    </svg>
  );
}

TriangleIcon.propTypes = {
  className: PropTypes.string,
};

TriangleIcon.defaultProps = {
  className: '',
};

export default memo(TriangleIcon);
