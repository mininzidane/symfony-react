import React, { forwardRef, useImperativeHandle, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ClickAwayListener, Grow, Paper, Popper as MuiPopper } from '@material-ui/core';
import useStyles from './useStyles';

const Popper = forwardRef((props, ref) => {
  const {
    trigger,
    children,
    activeTriggerClassName,
    inner,
    placement,
    offsetTop,
    isFlipEnabled,
    onOpen,
    disablePortal,
    arrow,
    clickAway,
    boundariesElement,
  } = props;
  const classes = useStyles(props);
  const [anchorEl, setAnchorEl] = useState(props.anchorEl);
  const [arrowEl, setArrowEl] = useState(null);

  const handleOpen = (event) => {
    // Angular on SRP creates duplicated click
    if (window.ng && event.nativeEvent && event.nativeEvent.stopImmediatePropagation) {
      event.nativeEvent.stopImmediatePropagation();
    }

    setAnchorEl(event.currentTarget);
    onOpen();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useImperativeHandle(ref, () => ({
    close: handleClose,
  }));

  return (
    <>
      {trigger &&
        React.cloneElement(trigger, {
          onClick: handleOpen,
          className: classNames(trigger.props.className, { [activeTriggerClassName]: Boolean(anchorEl) }),
        })}

      <MuiPopper
        className={classes.popper}
        modifiers={{
          inner: { enabled: inner },
          offset: { offset: `0, ${offsetTop}px`, enabled: true },
          preventOverflow: {
            enabled: true,
            priority: ['top', 'left', 'right', 'bottom'],
            boundariesElement,
          },
          flip: { enabled: isFlipEnabled },
          arrow: { enabled: arrow, element: arrowEl },
        }}
        placement={placement}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        role={undefined}
        transition
        disablePortal={disablePortal}
      >
        {({ TransitionProps }) => (
          <Grow
            {...TransitionProps}
            // flip condition in case of inner
            style={{
              transformOrigin:
                // eslint-disable-next-line no-bitwise
                placement.includes('bottom') ^ inner ? 'center top' : 'center bottom',
            }}
          >
            <Paper className={classes.paper}>
              {arrow && <div className={classes.arrow} ref={setArrowEl} />}

              <ClickAwayListener onClickAway={clickAway ? handleClose : () => {}}>
                <div>{children}</div>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </MuiPopper>
    </>
  );
});

Popper.propTypes = {
  trigger: PropTypes.node,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
  activeTriggerClassName: PropTypes.string,
  placement: PropTypes.string,
  offsetTop: PropTypes.number,
  inner: PropTypes.bool,
  isFlipEnabled: PropTypes.bool,
  onOpen: PropTypes.func,
  disablePortal: PropTypes.bool,
  arrow: PropTypes.bool,
  clickAway: PropTypes.bool,
  anchorEl: PropTypes.instanceOf(Element),
  boundariesElement: PropTypes.string,
};

Popper.defaultProps = {
  activeTriggerClassName: '',
  placement: 'bottom',
  offsetTop: 8,
  inner: false,
  isFlipEnabled: true,
  onOpen: () => {},
  disablePortal: true,
  anchorEl: null,
  trigger: null,
  arrow: false,
  clickAway: true,
  boundariesElement: 'scrollParent',
};

export default Popper;
