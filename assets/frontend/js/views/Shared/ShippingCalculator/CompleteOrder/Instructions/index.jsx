import React from 'react';
import PropTypes from 'prop-types';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import Step from './Step';
import useStyles from './useStyles';

function Instructions({ email }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <FormattedMessage id="shippingCalculator.completeOrder.instructions.title" />
      </div>
      <div>
        <Step number={1} label={<FormattedMessage id="shippingCalculator.completeOrder.instructions.1" />} />
        <Step number={2} label={<FormattedMessage id="shippingCalculator.completeOrder.instructions.2" />} />
        <Step
          number={3}
          label={
            <FormattedMessage id="shippingCalculator.completeOrder.instructions.3" values={{ email: email || null }} />
          }
        />
      </div>
    </div>
  );
}

Instructions.defaultProps = {
  email: '',
};

Instructions.propTypes = {
  email: PropTypes.string,
};

export default Instructions;
