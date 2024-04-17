import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import useStyles from './useStyles';

function Row({ style, className, isHighlighted }) {
  const classes = useStyles({ isHighlighted });

  return <div style={style} className={classnames(classes.root, className)} />;
}

Row.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  className: PropTypes.string,
  isHighlighted: PropTypes.bool,
};

Row.defaultProps = {
  style: {},
  className: '',
  isHighlighted: false,
};

export default Row;
