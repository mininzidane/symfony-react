import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './useStyles';

function Step({ title, subtitle, image }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img src={image} className={classes.img} alt="Step" />
      <div className={classes.desc}>
        <div className={classes.title}>{title}</div>
        <div className={classes.subtitle} dangerouslySetInnerHTML={{ __html: subtitle }} />
      </div>
    </div>
  );
}

Step.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default Step;
