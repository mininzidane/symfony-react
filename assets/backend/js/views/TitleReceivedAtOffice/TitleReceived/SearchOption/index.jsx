import React from 'react';
import PropTypes from 'prop-types';

function TitleReceivedSearchOption(props) {
  const {
    vehicle: { description, vin, lot, vehicle_status, title_status },
    sycCount,
  } = props;

  if (sycCount) {
    return <div>No matches found in purchases. {sycCount} record(s) found in SYC</div>;
  }

  return (
    <div>
      {description} VIN: {vin} Lot#: {lot} [{vehicle_status}/{title_status}]
    </div>
  );
}

TitleReceivedSearchOption.defaultProps = {
  vehicle: {},
  sycCount: null,
};

TitleReceivedSearchOption.propTypes = {
  vehicle: PropTypes.shape({
    description: PropTypes.string,
    vin: PropTypes.string,
    lot: PropTypes.string,
    vehicle_status: PropTypes.string,
    title_status: PropTypes.string,
  }),
  sycCount: PropTypes.number,
};

export default TitleReceivedSearchOption;
