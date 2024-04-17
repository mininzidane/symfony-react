import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import useStyles from './useStyles';

function RadioButton({ name, onChange, label, id, className, value, animate, isChecked }) {
  const classes = useStyles();
  const [isActive, setIsActive] = useState(false);

  function handleChange(event) {
    if (event.target.checked) {
      onChange(name, event.target.value);
    }
    setIsActive(true);
    setTimeout(() => setIsActive(false), 200);
  }

  const rootClass = classNames(
    classes.root,
    {
      'is-active': isActive,
      'is-checked': isChecked,
      'is-animating': animate && isActive,
    },
    className,
  );

  return (
    <div className={rootClass}>
      <input type="radio" id={id} name={name} value={value} onChange={handleChange} checked={isChecked} hidden />

      <label htmlFor={id}>
        <div className={classes.icon}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="-21967 5741 20 20">
            <g transform="translate(-21967 5741)">
              <path
                fill="#70C6A1"
                d="M12,2A10,10,0,1,0,22,12,10.029,10.029,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8,8.024,8.024,0,0,1-8,8Z"
                transform="translate(-2 -2)"
              />
              <circle fill="#70C6A1" cx="5" cy="5" r="5" transform="translate(5 5)" />
            </g>
          </svg>
        </div>

        {label}
      </label>
    </div>
  );
}

RadioButton.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]).isRequired,
  label: PropTypes.node.isRequired,
  onChange: PropTypes.func,
  isChecked: PropTypes.bool,
  animate: PropTypes.bool,
  className: PropTypes.string,
};

RadioButton.defaultProps = {
  className: '',
  isChecked: false,
  animate: false,
  onChange: () => {},
};

export default RadioButton;
