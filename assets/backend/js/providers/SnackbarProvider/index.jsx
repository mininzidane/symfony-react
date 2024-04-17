import React from 'react';
import classnames from 'classnames';
import { SnackbarProvider as MuiSnackbarProvider } from 'notistack';
import PropTypes from 'prop-types';
import Icon from './Icon';
import useStyles from './useStyles';

function SnackbarProvider({ children }) {
  const classes = useStyles();

  return (
    <MuiSnackbarProvider
      maxSnack={3}
      autoHideDuration={4000}
      variant="info"
      classes={{
        containerAnchorOriginBottomCenter: classes.container,
        variantSuccess: classnames(classes.root, classes.success),
        variantError: classes.root,
        variantInfo: classes.root,
        action: classes.action,
        message: classes.message,
      }}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      iconVariant={{
        success: <Icon variant="success" />,
        info: (
          <>
            <Icon variant="info" className={classes.icon} />
            <div className={classes.label}>Info</div>
          </>
        ),
        error: (
          <>
            <Icon variant="error" className={classes.icon} />
            <div className={classes.label}>Error</div>
          </>
        ),
      }}
    >
      {children}
    </MuiSnackbarProvider>
  );
}

SnackbarProvider.defaultProps = {
  children: null,
};

SnackbarProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export default SnackbarProvider;
