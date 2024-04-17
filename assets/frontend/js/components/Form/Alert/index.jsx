import React from 'react';
import PropTypes from 'prop-types';
import MUIAlert from '@material-ui/lab/Alert';
import Fade from 'frontend/js/components/Fade';

function Alert({ isShown, className, icon, severity, children }) {
  return (
    <Fade isOpen={isShown} duration={350}>
      <MUIAlert icon={icon} severity={severity} className={className}>
        {children}
      </MUIAlert>
    </Fade>
  );
}

Alert.propTypes = {
  isShown: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.func]).isRequired,
  severity: PropTypes.string.isRequired,
  icon: PropTypes.bool,
  className: PropTypes.string,
};

Alert.defaultProps = {
  icon: false,
  className: '',
};

export default Alert;
