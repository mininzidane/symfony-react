import React from 'react';

function Wallet() {
  return (
    <>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fill="rgba(255,255,255,.75)"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37256 18.6274 0 12 0C5.37256 0 0 5.37256 0 12C0 18.6274 5.37256 24 12 24ZM12 20C25.3047 10.4365 16.3384 2.41553 12 7.66016C7.66162 2.41553 -1.30469 10.4365 12 20Z"
        />
      </svg>
      <svg
        className="svg-hover"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="12" fill="#FFE6E6" />
        <path
          opacity="0.75"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 20C25.3049 10.4366 16.3385 2.41561 12 7.66008C7.66146 2.41561 -1.30485 10.4366 12 20Z"
          fill="#CA2127"
        />
      </svg>
    </>
  );
}

export default Wallet;
