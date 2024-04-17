import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './useStyles';

function Step({ icon, title, desc }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.icon}>
        <img src={icon} alt={title} />
      </div>
      <div className={classes.wrapText}>
        <h3 className={classes.title}>{title}</h3>
        <p className={classes.desc}>{desc}</p>
      </div>
    </div>
  );
}

Step.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
};

export default Step;
