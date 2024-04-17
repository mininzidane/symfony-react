import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import useStyles from './useStyles';

function LoadingRow({ style, className, isHighlighted, isDark, isExternalOverlay }) {
  const classes = useStyles({ isHighlighted, isDark, isExternalOverlay });

  return <div style={style} className={classnames(classes.root, className)} />;
}

LoadingRow.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  className: PropTypes.string,
  isHighlighted: PropTypes.bool,
  isDark: PropTypes.bool,
  isExternalOverlay: PropTypes.bool,
};

LoadingRow.defaultProps = {
  style: {},
  className: '',
  isHighlighted: false,
  isDark: false,
  isExternalOverlay: false,
};

export default LoadingRow;
