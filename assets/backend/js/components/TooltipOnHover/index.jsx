import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Fade from '@material-ui/core/Fade';
import MuiTooltip from '@material-ui/core/Tooltip';
import useStyles from './useStyles';

function TooltipOnHover({
  className,
  trigger,
  content,
  hasArrow,
  isFlipEnabled,
  placement,
  isInteractive,
  preventOverflowPadding,
  boundariesElement,
  TransitionProps,
  style,
  ...restProps
}) {
  const classes = useStyles(style);

  return (
    <MuiTooltip
      classes={{ tooltip: classnames(classes.root, className) }}
      TransitionComponent={Fade}
      TransitionProps={TransitionProps}
      title={content}
      disableTouchListener
      interactive={isInteractive}
      arrow={hasArrow}
      placement={placement}
      PopperProps={{
        modifiers: {
          flip: {
            enabled: isFlipEnabled,
          },
          preventOverflow: {
            padding: preventOverflowPadding,
            boundariesElement,
          },
        },
      }}
      {...restProps}
    >
      {trigger}
    </MuiTooltip>
  );
}

TooltipOnHover.propTypes = {
  content: PropTypes.oneOfType([PropTypes.node, PropTypes.object, PropTypes.string]).isRequired,
  trigger: PropTypes.oneOfType([PropTypes.node, PropTypes.object, PropTypes.string]),
  placement: PropTypes.string,
  hasArrow: PropTypes.bool,
  isFlipEnabled: PropTypes.bool,
  isInteractive: PropTypes.bool,
  preventOverflowPadding: PropTypes.number,
  boundariesElement: PropTypes.string,
  TransitionProps: PropTypes.shape({}),
  style: PropTypes.shape({}),
  className: PropTypes.string,
};

TooltipOnHover.defaultProps = {
  placement: 'bottom',
  trigger: null,
  hasArrow: false,
  isFlipEnabled: true,
  isInteractive: true,
  preventOverflowPadding: 15,
  boundariesElement: 'viewport',
  TransitionProps: {},
  style: {},
  className: '',
};

export default TooltipOnHover;
