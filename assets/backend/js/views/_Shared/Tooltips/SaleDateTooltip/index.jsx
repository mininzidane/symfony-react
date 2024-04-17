import React from 'react';
import Explanation from 'backend/js/components/Explanation';

function SaleDateTooltip() {
  return (
    <>
      Sale Date
      <Explanation>
        Sale Time is the scheduled start time for an auction. Sale times are local to the facility in which a particular
        vehicle is stored.
      </Explanation>
    </>
  );
}

export default SaleDateTooltip;
