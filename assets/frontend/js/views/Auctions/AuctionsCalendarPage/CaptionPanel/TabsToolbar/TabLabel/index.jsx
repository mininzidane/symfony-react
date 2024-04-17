/* eslint-disable react/prop-types */
import React from 'react';

function TabLabel({ label, count, showCount }) {
  return (
    <>
      {label} {showCount && typeof count === 'number' && `(${count})`}
    </>
  );
}

export default TabLabel;
