import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import useStyles from './useStyles';

function CardPlane({ children, className, contentClassName, elevation, title, isHighlighted, ...rest }) {
  const classes = useStyles();

  return (
    <div
      className={classNames(classes.root, `is-elevation-${elevation}`, { 'is-highlighted': isHighlighted }, className)}
      {...rest}
    >
      {title && <div className={classes.title}>{title}</div>}
      <div className={classNames(classes.content, contentClassName)}>{children}</div>
    </div>
  );
}

CardPlane.propTypes = {
  className: PropTypes.string,
  contentClassName: PropTypes.string,
  elevation: PropTypes.number,
  isHighlighted: PropTypes.bool,
  children: PropTypes.node.isRequired,
  title: PropTypes.node,
};

CardPlane.defaultProps = {
  title: null,
  elevation: 0,
  className: null,
  contentClassName: null,
  isHighlighted: false,
};

export default CardPlane;
