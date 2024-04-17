import React from 'react';
import PropTypes from 'prop-types';

function Value({ value }) {
  if (!value) {
    return <div>—</div>;
  }

  return <div>{value}</div>;
}

Value.propTypes = {
  value: PropTypes.string,
};

Value.defaultProps = {
  value: null,
};

export default Value;
