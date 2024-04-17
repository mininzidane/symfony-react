import React from 'react';
import PropTypes from 'prop-types';
import MuiTable from '@material-ui/core/Table';
import classNames from 'classnames';

function Table({ children, className }) {
  return (
    <MuiTable className={classNames(className, 'table table-bordered table-striped table-hover')}>{children}</MuiTable>
  );
}

Table.defaultProps = {
  className: '',
};

Table.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
  className: PropTypes.string,
};

export default Table;
