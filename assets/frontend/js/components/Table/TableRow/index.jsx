import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import MuiTableRow from '@material-ui/core/TableRow';
import useStyles from './useStyles';

function TableRow({ className, hoverable, ...props }) {
  const classes = useStyles();

  return (
    <MuiTableRow
      {...props}
      classes={{ root: classes.root, head: classes.head }}
      className={classNames(className, hoverable && classes.hoverable)}
    />
  );
}

TableRow.propTypes = {
  className: PropTypes.string,
  hoverable: PropTypes.bool,
};

TableRow.defaultProps = {
  className: '',
  hoverable: false,
};

export default TableRow;
