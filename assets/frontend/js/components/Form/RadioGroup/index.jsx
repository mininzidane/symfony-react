import React from 'react';
import PropTypes from 'prop-types';
import RadioButton from '../RadioButton';
import useStyles from './useStyles';

function RadioGroup({ onChange, value, options, name, isDisabled, className, viewType, size }) {
  const classes = useStyles();

  return (
    <div className={className}>
      {options.map((option, index) => (
        <RadioButton
          className={classes.button}
          label={option.label || option.value}
          value={option.value}
          name={name}
          key={[name, index]}
          id={`${name}-${index}`}
          isChecked={value === option.value}
          onChange={onChange}
          isDisabled={isDisabled}
          viewType={viewType}
          size={size}
        />
      ))}
    </div>
  );
}

RadioGroup.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.node]).isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.node,
    }),
  ).isRequired,
  viewType: PropTypes.oneOf(['default', 'roundCheckmark']),
  isDisabled: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
};

RadioGroup.defaultProps = {
  onChange: () => {},
  viewType: 'default',
  isDisabled: false,
  size: 'md',
  className: null,
};

export default RadioGroup;
