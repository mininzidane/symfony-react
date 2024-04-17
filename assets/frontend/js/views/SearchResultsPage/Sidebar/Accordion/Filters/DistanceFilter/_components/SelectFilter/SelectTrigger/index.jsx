import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import useStyles from './useStyles';

function SelectTrigger({ children, label, placeholder, isPort, error, ...restProps }) {
  const classes = useStyles({ placeholder: !label, isPort });

  return (
    <div {...restProps} className={classnames(classes.root, error && 'is-error')}>
      <div className={classes.label}>{label || placeholder}</div>
      <span className={classes.caret} />
    </div>
  );
}

SelectTrigger.defaultProps = {
  isPort: false,
  children: null,
  placeholder: '',
  label: '',
  error: false,
};

SelectTrigger.propTypes = {
  children: PropTypes.node,
  placeholder: PropTypes.node,
  label: PropTypes.node,
  isPort: PropTypes.bool,
  error: PropTypes.bool,
};

export default SelectTrigger;
