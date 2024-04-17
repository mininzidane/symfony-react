import React from 'react';
import PropTypes from 'prop-types';
import MuiTableRow from '@material-ui/core/TableRow';
import useStyles from './useStyles';

function TableRow({ className, ...props }) {
  const classes = useStyles();

  return <MuiTableRow {...props} classes={{ root: classes.root, head: classes.head }} className={className} />;
}

TableRow.propTypes = {
  className: PropTypes.string,
};

TableRow.defaultProps = {
  className: '',
};

export default TableRow;
