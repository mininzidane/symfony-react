import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Step from './Step';
import useStyles from './useStyles';

function Stepper({ steps, active, className, id }) {
  const classes = useStyles({ total: steps.length });

  return (
    <div className={classNames(classes.root, className)} id={id}>
      {steps.map((step, index) => (
        <Step
          key={index}
          label={step}
          index={index}
          active={index === active}
          completed={active > index}
          total={steps.length}
        />
      ))}
    </div>
  );
}

Stepper.defaultProps = {
  className: '',
  id: '',
};

Stepper.propTypes = {
  steps: PropTypes.arrayOf(PropTypes.node).isRequired,
  active: PropTypes.number.isRequired,
  className: PropTypes.string,
  id: PropTypes.string,
};

export default Stepper;
