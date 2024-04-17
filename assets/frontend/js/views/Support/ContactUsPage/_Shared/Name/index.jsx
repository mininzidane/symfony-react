import React from 'react';
import PropTypes from 'prop-types';
import OfficeLocationShape from 'frontend/js/lib/propshapes/OfficeLocationShape';

function Name({ data, className }) {
  return <span className={className}>{data.name} </span>;
}

Name.propTypes = {
  data: OfficeLocationShape,
  className: PropTypes.string,
};

Name.defaultProps = {
  data: {},
  className: '',
};

export default Name;
