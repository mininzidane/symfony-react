import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import useStyles from './useStyles';

function LotPageBlock({ className, children }) {
  const classes = useStyles();

  return <div className={classnames(classes.root, className)}>{children}</div>;
}

LotPageBlock.defaultProps = {
  className: '',
};

LotPageBlock.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default LotPageBlock;
