import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './useStyles';

function Card({ icon, title, desc }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div>{icon}</div>
      <div className={classes.title}>{title}</div>
      <div>{desc}</div>
    </div>
  );
}

Card.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
  desc: PropTypes.node.isRequired,
};

export default Card;
