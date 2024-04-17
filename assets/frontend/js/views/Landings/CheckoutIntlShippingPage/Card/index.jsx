import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import useStyles from './useStyles';

function Card({ className, title, children, hasPadding, id }) {
  const classes = useStyles({ hasPadding });

  return (
    <article className={classes.root} id={id}>
      <div className={classes.title}>{title}</div>
      <div className={classnames(classes.container, className)}>{children}</div>
    </article>
  );
}

Card.propTypes = {
  title: PropTypes.node.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
  id: PropTypes.string,
  hasPadding: PropTypes.bool,
};

Card.defaultProps = {
  className: '',
  hasPadding: true,
  children: null,
  id: null,
};

export default Card;
