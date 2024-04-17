import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import useStyles from './useStyles';

function Card({ className, title, children, hasPadding }) {
  const classes = useStyles({ hasPadding });

  return (
    <article className={classes.root}>
      <div className={classes.title}>{title}</div>
      <div className={classnames(classes.container, className)}>{children}</div>
    </article>
  );
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  hasPadding: PropTypes.bool,
};

Card.defaultProps = {
  className: '',
  hasPadding: true,
};

export default Card;
