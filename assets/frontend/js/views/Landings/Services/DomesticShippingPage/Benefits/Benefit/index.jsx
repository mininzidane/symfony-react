import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './useStyles';

function Benefit({ title, desc }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h2>{title}</h2> – {desc}
    </div>
  );
}

Benefit.propTypes = {
  title: PropTypes.node.isRequired,
  desc: PropTypes.node.isRequired,
};

export default Benefit;
