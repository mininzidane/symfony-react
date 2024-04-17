import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import MuiTab from '@material-ui/core/Tab';
import useStyles from './useStyles';

function Tab({ value, className, ...props }) {
  const classes = useStyles();

  return (
    <MuiTab
      {...props}
      value={value}
      disableFocusRipple
      disableRipple
      classes={{
        root: classnames(classes.tab, className),
        selected: classes.selected,
      }}
    />
  );
}

Tab.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  className: PropTypes.string,
};

Tab.defaultProps = {
  className: '',
};

export default Tab;
