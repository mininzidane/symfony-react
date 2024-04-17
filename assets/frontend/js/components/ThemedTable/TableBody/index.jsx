import React from 'react';
import PropTypes from 'prop-types';
import MuiTableBody from '@material-ui/core/TableBody';

function TableBody({ children, className, ...props }) {
  return (
    <MuiTableBody {...props} className={className}>
      {children}
    </MuiTableBody>
  );
}

TableBody.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any),
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired,
  className: PropTypes.string,
};

TableBody.defaultProps = {
  data: [],
  className: '',
};

export default TableBody;
