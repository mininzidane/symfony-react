import React from 'react';
import PropTypes from 'prop-types';

import useStyles from './useStyles';

function Item({ icon, line, lineOffset, withoutLine, stepNumber, title, subtitle, description }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.left}>
        <img src={icon} alt={`Step ${stepNumber}`} />
        <div className={classes.stepLabel}>STEP {stepNumber}</div>
        <img
          width="11px"
          className="pos-r pt-10 sm-hide"
          style={{ left: lineOffset, display: withoutLine ? 'none' : 'inline' }}
          src={line}
          alt={`Step ${stepNumber} Line`}
        />
      </div>
      <div className={classes.right}>
        <div className={classes.title}>{title}</div>
        <div className={classes.subtitle}>{subtitle}</div>
        <div className={classes.description}>{description}</div>
      </div>
    </div>
  );
}

Item.propTypes = {
  icon: PropTypes.string.isRequired,
  line: PropTypes.string.isRequired,
  lineOffset: PropTypes.number.isRequired,
  withoutLine: PropTypes.bool.isRequired,
  stepNumber: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  description: PropTypes.oneOfType([PropTypes.array, PropTypes.string]).isRequired,
};

export default Item;
