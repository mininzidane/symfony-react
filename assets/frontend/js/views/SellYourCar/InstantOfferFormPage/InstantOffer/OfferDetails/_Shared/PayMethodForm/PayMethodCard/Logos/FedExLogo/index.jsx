import React from 'react';
import PropTypes from 'prop-types';

function FedExLogo({ isColored, className }) {
  return (
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 75 23" className={className}>
      <g clipPath="url(#svg_fedex_a)">
        <path
          opacity={isColored ? '1' : '.2'}
          d="m59.952 7.772 2.978 3.282 2.867-3.282h6.122L65.936 14.5l6.065 6.783h-6.369l-2.95-3.308-2.923 3.308h-6.15l6.012-6.755-6.012-6.756h6.343Z"
          fill={isColored ? '#FF5900' : '#fff'}
        />
        <path
          opacity={isColored ? '1' : '.2'}
          d="M53.61 7.772v4.565H46.8v4.189h6.81v4.757H41.797V0H53.61v4.744H46.8v3.028h6.81Z"
          fill={isColored ? '#FF5900' : '#fff'}
        />
        <path
          d="M36.811 0v8.71h-.055c-1.104-1.268-2.482-1.709-4.081-1.709-3.276 0-5.744 2.228-6.61 5.172-.989-3.244-3.537-5.233-7.315-5.233-3.068 0-5.491 1.377-6.755 3.621V7.772H5.653V4.744h6.921V0H0v21.283h5.653v-8.946h5.635a8.48 8.48 0 0 0-.258 2.104c0 4.439 3.392 7.555 7.72 7.555 3.64 0 6.039-1.709 7.307-4.824h-4.845c-.655.937-1.152 1.214-2.462 1.214-1.519 0-2.829-1.325-2.829-2.896h9.865c.428 3.526 3.175 6.567 6.944 6.567 1.626 0 3.115-.8 4.025-2.15h.055v1.378h4.983V0h-4.982ZM16.079 12.4c.314-1.352 1.363-2.235 2.672-2.235 1.441 0 2.436.856 2.698 2.235h-5.37Zm17.707 5.643c-1.837 0-2.979-1.712-2.979-3.499 0-1.91.993-3.747 2.979-3.747 2.059 0 2.879 1.837 2.879 3.747 0 1.811-.869 3.499-2.879 3.499Z"
          fill={isColored ? '#2A007C' : '#fff'}
        />
      </g>
      <defs>
        <clipPath id="svg_fedex_a">
          <path fill="#fff" d="M0 0h75v23H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

FedExLogo.propTypes = {
  isColored: PropTypes.bool,
  className: PropTypes.string,
};

FedExLogo.defaultProps = {
  isColored: false,
  className: '',
};

export default FedExLogo;
