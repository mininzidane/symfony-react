import React from 'react';
import PropTypes from 'prop-types';

function ACHLogo({ isColored, className }) {
  return (
    <>
      <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" className={className}>
        <rect x="1" y="1" width="58" height="28" rx="1" stroke={isColored ? '#008481' : '#fff'} strokeWidth="2" />
        <rect x="5" y="5" width="24" height="3" rx="1.5" fill={isColored ? '#00C1BF' : '#fff'} />
        <rect x="5" y="12" width="50" height="3" rx="1.5" fill={isColored ? '#00C1BF' : '#fff'} />
        <path
          d="M36 21c1.985 0 1.985 1.988 3.97 1.988 1.986 0 1.979-1.988 3.964-1.988 1.985 0 1.992 1.988 3.977 1.988 1.985 0 1.985-1.988 3.97-1.988"
          stroke="#FDB81E"
          strokeWidth="1.69"
          strokeLinecap="round"
        />
      </svg>
    </>
  );
}

ACHLogo.propTypes = {
  isColored: PropTypes.bool,
  className: PropTypes.string,
};

ACHLogo.defaultProps = {
  isColored: false,
  className: '',
};

export default ACHLogo;
