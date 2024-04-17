import React from 'react';
import PropTypes from 'prop-types';

function Checkmark({ isTrue }) {
  if (isTrue) {
    return (
      <div className="svg-icon" style={{ width: 14, height: 11 }}>
        <svg width="14" fill="none" height="11" viewBox="0 0 14 11">
          <path d="M1 5.23529L4.84 9L13 1" stroke="#3BCC6B" strokeWidth="2" />
        </svg>
      </div>
    );
  }

  return (
    <div className="svg-icon" style={{ width: 10, height: 10 }}>
      <svg width="10" height="10" viewBox="0 0 10 10">
        <path d="M0 1.4286L1.42857 3.23928e-05L10 8.57143L8.57143 10L0 1.4286Z" fill="#FF3C3C" />
        <path d="M8.57143 0L10 1.42857L1.42857 9.99997L0 8.5714L8.57143 0Z" fill="#FF3C3C" />
      </svg>
    </div>
  );
}

Checkmark.propTypes = {
  isTrue: PropTypes.bool,
};

Checkmark.defaultProps = {
  isTrue: false,
};

export default Checkmark;
