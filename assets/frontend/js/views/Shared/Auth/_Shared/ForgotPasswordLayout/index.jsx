import React from 'react';
import PropTypes from 'prop-types';
import ContainerFullScreen from 'frontend/js/components/ContainerFullScreen';

import useStyles from './useStyles';

function ForgotPasswordLayout({ title, subtitle, children, maxWidth }) {
  const classes = useStyles();

  return (
    <ContainerFullScreen className={classes.root} style={{ maxWidth }}>
      <div className={classes.content}>
        <h1 className={classes.title}>{title}</h1>

        <h2 className={classes.subtitle}>{subtitle}</h2>

        {children}
      </div>
    </ContainerFullScreen>
  );
}

ForgotPasswordLayout.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  children: PropTypes.node.isRequired,
  maxWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

ForgotPasswordLayout.defaultProps = {
  maxWidth: 'none',
};

export default ForgotPasswordLayout;
