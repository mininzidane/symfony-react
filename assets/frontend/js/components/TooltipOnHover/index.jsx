import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import MuiTooltip from '@material-ui/core/Tooltip';
import ButtonCross from '../ButtonCross';

function TooltipOnHover({
  trigger,
  content,
  maxWidth,
  badgeMarginLeft,
  badgeTop,
  color,
  offset,
  padding,
  style,
  hasArrow,
  triggerClassName,
  tooltipClassName,
  popperClassName,
  isFlipEnabled,
  placement,
  isInteractive,
  preventOverflowPadding,
  boundariesElement,
  hasMobileCloseButton,
  triggerProps,
  isDisabled,
  onClose,
  disablePortal,
  isWithoutWrapper,
}) {
  const [isOpen, setOpen] = useState(false);
  const [isLocked, setLocked] = useState(false);
  const TOOLTIP_LOCK_DURATION = 200;
  const tooltipSettings = makeStyles(() => ({
    custom: {
      maxWidth,
      marginTop: offset,
      marginBottom: offset,
      ...(padding && { padding }),
      ...style,
    },
  }))();
  const tooltipBadgeClasses = classNames('tooltip__badge', triggerClassName, {
    'is-active': isOpen,
    'is-locked': isLocked,
  });
  const tooltipTriggerClasses = classNames('tooltip__trigger', triggerClassName, {
    'is-active': isOpen,
    'is-locked': isLocked,
  });
  const tooltipClasses = classNames(
    'tooltip__content',
    `is-${color}`,
    { 'is-closing': !isOpen, 'is-hidden': isDisabled },
    tooltipClassName,
    tooltipSettings.custom,
  );

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    onClose();
    setOpen(false);
    setLocked(true);

    setTimeout(() => {
      setLocked(false);
    }, TOOLTIP_LOCK_DURATION);
  }

  const tooltipContent = hasMobileCloseButton ? (
    <div>
      <ButtonCross onClick={handleClose} isThin className="tooltip__close-button is-sm-up-hidden" />
      {content}
    </div>
  ) : (
    content
  );

  function getTrigger() {
    if (isWithoutWrapper) {
      return trigger;
    }

    if (trigger) {
      return (
        <button
          type="button"
          className={tooltipTriggerClasses}
          {...triggerProps}
          onClick={(...arg) => {
            if (triggerProps.onClick) {
              triggerProps.onClick(...arg);
            }
            setOpen(!isOpen);
          }}
        >
          {trigger}
        </button>
      );
    }

    return (
      <span className="ws-n">
        &nbsp;
        <button
          {...triggerProps}
          type="button"
          className={tooltipBadgeClasses}
          style={{ marginLeft: badgeMarginLeft, top: badgeTop }}
          onClick={(...arg) => {
            if (triggerProps.onClick) {
              triggerProps.onClick(...arg);
            }
            setOpen(!isOpen);
          }}
        >
          ?
        </button>
      </span>
    );
  }

  return (
    <MuiTooltip
      classes={{ tooltip: tooltipClasses }}
      TransitionComponent={Fade}
      title={tooltipContent}
      open={isOpen && !isDisabled}
      onOpen={isDisabled ? null : handleOpen}
      onClose={isDisabled ? null : handleClose}
      disableTouchListener
      leaveDelay={TOOLTIP_LOCK_DURATION}
      interactive={isInteractive}
      arrow={hasArrow}
      placement={placement}
      PopperProps={{
        disablePortal,
        modifiers: {
          flip: {
            enabled: isFlipEnabled,
          },
          preventOverflow: {
            padding: preventOverflowPadding,
            boundariesElement,
          },
        },
        ...(popperClassName ? { className: popperClassName } : {}),
      }}
    >
      {getTrigger()}
    </MuiTooltip>
  );
}

TooltipOnHover.propTypes = {
  content: PropTypes.oneOfType([PropTypes.node, PropTypes.object, PropTypes.string]).isRequired,
  trigger: PropTypes.oneOfType([PropTypes.node, PropTypes.object, PropTypes.string]),
  color: PropTypes.string,
  maxWidth: PropTypes.number,
  offset: PropTypes.number,
  badgeMarginLeft: PropTypes.number,
  badgeTop: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  padding: PropTypes.string,
  triggerClassName: PropTypes.string,
  tooltipClassName: PropTypes.string,
  placement: PropTypes.string,
  hasArrow: PropTypes.bool,
  disablePortal: PropTypes.bool,
  isFlipEnabled: PropTypes.bool,
  isInteractive: PropTypes.bool,
  preventOverflowPadding: PropTypes.number,
  boundariesElement: PropTypes.string,
  hasMobileCloseButton: PropTypes.bool,
  triggerProps: PropTypes.shape({ onClick: PropTypes.func }),
  isDisabled: PropTypes.bool,
  isWithoutWrapper: PropTypes.bool,
  onClose: PropTypes.func,
  popperClassName: PropTypes.string,
};

TooltipOnHover.defaultProps = {
  tooltipClassName: '',
  placement: 'bottom',
  color: 'yellow',
  trigger: null,
  triggerClassName: null,
  popperClassName: null,
  maxWidth: 400,
  offset: 10,
  badgeMarginLeft: 0,
  badgeTop: 0,
  style: {},
  padding: '22px 30px 26px',
  hasArrow: false,
  disablePortal: false,
  isFlipEnabled: true,
  isInteractive: true,
  preventOverflowPadding: 15,
  hasMobileCloseButton: false,
  isWithoutWrapper: false,
  triggerProps: { onClick: () => {} },
  isDisabled: false,
  boundariesElement: 'scrollParent',
  onClose: () => {},
};

export default TooltipOnHover;
