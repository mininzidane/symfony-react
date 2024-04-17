import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import MuiTable from '@material-ui/core/Table';
import useStyles from './useStyles';

function Table({ children, hasShadow, hasHoverEffect, ...props }) {
  const classes = useStyles();

  return (
    <MuiTable
      {...props}
      className={classnames('react', { [classes.border]: !hasShadow, [classes.hover]: hasHoverEffect })}
    >
      {children}
    </MuiTable>
  );
}

Table.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
  hasShadow: PropTypes.bool,
  hasHoverEffect: PropTypes.bool,
};

Table.defaultProps = {
  hasShadow: false,
  hasHoverEffect: false,
};

export default Table;
