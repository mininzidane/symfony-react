import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import useStyles from './useStyles';

function Card(props) {
  const { children, className, elevation, hasSidePaddings, title, isHighlighted, ...rest } = props;
  const classes = useStyles(props);

  return (
    <div
      className={classNames(
        classes.root,
        `is-elevation-${elevation}`,
        { 'has-side-paddings': hasSidePaddings, 'is-highlighted': isHighlighted },
        className,
      )}
      {...rest}
    >
      {title && <div className={classes.title}>{title}</div>}
      {children}
    </div>
  );
}

Card.propTypes = {
  className: PropTypes.string,
  elevation: PropTypes.number,
  hasSidePaddings: PropTypes.bool,
  isHighlighted: PropTypes.bool,
  children: PropTypes.node.isRequired,
  title: PropTypes.node,
};

Card.defaultProps = {
  title: null,
  className: null,
  elevation: 0,
  hasSidePaddings: false,
  isHighlighted: false,
};

export default Card;
