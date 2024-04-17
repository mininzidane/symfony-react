import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import MuiTable from '@material-ui/core/Table';
import useStyles from './useStyles';

function Table({ children, hasShadow, className, ...props }) {
  const classes = useStyles({ hasShadow });

  return (
    <MuiTable {...props} className={classnames('react', classes.root, className)}>
      {children}
    </MuiTable>
  );
}

Table.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
  hasShadow: PropTypes.bool,
  className: PropTypes.string,
};

Table.defaultProps = {
  hasShadow: true,
  className: '',
};

export default Table;
