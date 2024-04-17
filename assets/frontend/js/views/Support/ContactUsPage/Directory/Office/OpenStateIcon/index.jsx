/* eslint-disable react/prop-types */
import React from 'react';

function OpenStateIcon({ className, isOpen }) {
  return (
    <div className={className}>
      <svg width="12" height="12" viewBox="0 0 12 12">
        {!isOpen && (
          <path d="M5 1C5 0.447715 5.44772 0 6 0C6.55228 0 7 0.447715 7 1V11C7 11.5523 6.55228 12 6 12C5.44772 12 5 11.5523 5 11V1Z" />
        )}
        <path d="M1 7C0.447715 7 2.4143e-08 6.55228 0 6C-2.41393e-08 5.44772 0.447715 5 1 5L11 5C11.5523 5 12 5.44771 12 6C12 6.55228 11.5523 7 11 7L1 7Z" />
      </svg>
    </div>
  );
}

export default OpenStateIcon;
