import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { makeStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import MuiTooltip from '@material-ui/core/Tooltip';

function TooltipControlled({
  trigger,
  content,
  isOpen,
  onClose,
  onTriggerClick,
  triggerClassName,
  className,
  placement,
  maxWidth,
  marginLeft,
  marginTop,
  isClickAwayListener,
  isFlipEnabled,
  color,
  offset,
  padding,
  hasArrow,
  isBounceAnimation,
  disablePortal,
  style,
}) {
  const tooltipSettings = makeStyles(() => ({
    customTooltip: {
      maxWidth,
      marginTop: offset,
      marginBottom: offset,
      ...(padding && { padding }),
      ...style,
    },
    customArrow: {
      color: '#FFF',
      fontSize: '12px',
    },
  }))();
  const tooltipBadgeClasses = classNames('tooltip__badge', { 'is-active': isOpen });
  const tooltipTriggerClasses = classNames('tooltip__trigger', triggerClassName, { 'is-active': isOpen });
  const tooltipClasses = classNames(
    'tooltip__content',
    `is-${color}`,
    { 'is-closing': !isOpen, 'is-bounce-animation': isBounceAnimation },
    tooltipSettings.customTooltip,
    className,
  );

  function handleClickAway() {
    if (isClickAwayListener) {
      onClose();
    }
  }

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div>
        <MuiTooltip
          classes={{
            tooltip: tooltipClasses,
            arrow: tooltipSettings.customArrow,
          }}
          TransitionComponent={Fade}
          title={content}
          onClose={onClose}
          open={isOpen}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          interactive
          placement={placement}
          arrow={hasArrow}
          PopperProps={{
            disablePortal,
            modifiers: { flip: { enabled: isFlipEnabled } },
          }}
        >
          {trigger ? (
            <div
              role="button"
              onClick={onTriggerClick}
              onKeyPress={onTriggerClick}
              tabIndex={0}
              className={tooltipTriggerClasses}
              style={{ outline: 'none' }}
            >
              {trigger}
            </div>
          ) : (
            <button
              type="button"
              className={tooltipBadgeClasses}
              onClick={onTriggerClick}
              style={{ marginLeft, marginTop }}
            >
              ?
            </button>
          )}
        </MuiTooltip>
      </div>
    </ClickAwayListener>
  );
}

TooltipControlled.propTypes = {
  isClickAwayListener: PropTypes.bool,
  isFlipEnabled: PropTypes.bool,
  isBounceAnimation: PropTypes.bool,
  hasArrow: PropTypes.bool,
  disablePortal: PropTypes.bool,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onTriggerClick: PropTypes.func,
  content: PropTypes.oneOfType([PropTypes.node, PropTypes.object, PropTypes.string]).isRequired,
  trigger: PropTypes.oneOfType([PropTypes.node, PropTypes.object, PropTypes.string]),
  color: PropTypes.string,
  maxWidth: PropTypes.number,
  offset: PropTypes.number,
  marginLeft: PropTypes.number,
  marginTop: PropTypes.number,
  padding: PropTypes.string,
  triggerClassName: PropTypes.string,
  placement: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

TooltipControlled.defaultProps = {
  onTriggerClick: () => {},
  isClickAwayListener: false,
  isBounceAnimation: false,
  hasArrow: false,
  color: 'yellow',
  trigger: null,
  isFlipEnabled: true,
  disablePortal: true,
  maxWidth: 400,
  offset: 10,
  marginLeft: 6,
  marginTop: 0,
  padding: '',
  triggerClassName: '',
  className: '',
  placement: 'bottom',
  style: {},
};

export default TooltipControlled;
