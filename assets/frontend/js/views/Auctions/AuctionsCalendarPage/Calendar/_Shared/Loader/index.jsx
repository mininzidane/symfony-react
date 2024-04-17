import React from 'react';
import SpinnerWheel from 'frontend/js/components/SpinnerWheel';

function Loader() {
  return (
    <div className="pos-r" style={{ minHeight: 300 }}>
      <SpinnerWheel isCentered size={40} thickness={3} />
    </div>
  );
}

export default Loader;
