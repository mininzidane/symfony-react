import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import useStyles from './useStyles';

function BidStatusTag({ status, className }) {
  const classes = useStyles({ status });
  const bidStatusClasses = classnames(classes.bidStatus, className);

  return <div className={bidStatusClasses}>{status}</div>;
}

BidStatusTag.propTypes = {
  status: PropTypes.string.isRequired,
  className: PropTypes.string,
};

BidStatusTag.defaultProps = {
  className: '',
};

export default BidStatusTag;
