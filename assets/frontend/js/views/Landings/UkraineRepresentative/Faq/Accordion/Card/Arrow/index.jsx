import React from 'react';
import PropTypes from 'prop-types';

function Arrow({ className }) {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 129 129"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className={className}
    >
      <g>
        <path
          d="m121.3,34.6c-1.6-1.6-4.2-1.6-5.8,0l-51,51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2
          0,5.8l53.9,53.9c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2 0.1-5.8z"
        />
      </g>
    </svg>
  );
}

Arrow.defaultProps = {
  className: '',
};

Arrow.propTypes = {
  className: PropTypes.string,
};

export default Arrow;
