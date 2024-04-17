import React from 'react';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';

function VehicleCalculatorBlockPlaceholder() {
  const { isBelowSm } = useBreakpoint();

  return <div style={{ height: isBelowSm ? 840 : 567 }} />;
}

VehicleCalculatorBlockPlaceholder.propTypes = {};

export default VehicleCalculatorBlockPlaceholder;
