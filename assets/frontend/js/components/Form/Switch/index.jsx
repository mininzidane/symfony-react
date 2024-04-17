import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import MUISwitch from '@material-ui/core/Switch';
import useStyles from './useStyles';

function Switch({ onChange, className, isChecked, label, color, disabled, ...props }) {
  const classes = useStyles(props);

  const handleChange = (event) => {
    onChange(event.target.checked);
  };

  return (
    <div className={classNames(classes.root, className)}>
      {label && <div className={classes.label}>{label}</div>}
      <MUISwitch
        classes={{
          switchBase: classes.switchBase,
          colorPrimary: classes.colorPrimary,
          colorSecondary: classes.colorSecondary,
          thumb: classes.thumb,
          checked: classes.checked,
          track: classes.track,
          root: classes.switchRoot,
        }}
        color={color}
        disableRipple
        disabled={disabled}
        checked={isChecked}
        onChange={handleChange}
      />
    </div>
  );
}

Switch.propTypes = {
  onChange: PropTypes.func,
  label: PropTypes.string,
  color: PropTypes.oneOf(['primary', 'secondary']),
  className: PropTypes.string,
  isChecked: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
};

Switch.defaultProps = {
  onChange: () => {},
  label: '',
  className: '',
  color: 'primary',
  disabled: false,
};

export default Switch;
