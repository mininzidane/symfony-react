import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import useStyles from './useStyles';

function Card(props) {
  const { children, className, elevation, hasSidePaddings, title, isHighlighted, TitleElement, ...rest } = props;
  const classes = useStyles(props);

  return (
    <div
      className={classNames(
        classes.root,
        `is-elevation-${elevation}`,
        { 'has-side-paddings': hasSidePaddings, 'has-title': title, 'is-highlighted': isHighlighted },
        className,
      )}
      {...rest}
    >
      {title && <TitleElement className={classes.title}>{title}</TitleElement>}
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
  TitleElement: PropTypes.string,
};

Card.defaultProps = {
  title: null,
  className: null,
  elevation: 1,
  hasSidePaddings: false,
  isHighlighted: false,
  TitleElement: 'div',
};

export default Card;
