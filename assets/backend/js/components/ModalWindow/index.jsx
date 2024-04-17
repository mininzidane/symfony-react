import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Hidden } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Backdrop from '@material-ui/core/Backdrop';
import ViewportService from '../../lib/utils/ViewportService';
import ButtonCross from '../ButtonCross';
import useStyles from './useStyles';

function ModalWindow({
  isOpen,
  onClose,
  children,
  width,
  styles,
  size,
  className,
  rootClassName,
  hasDesktopExternalCloseButton,
}) {
  const classes = useStyles({ hasDesktopExternalCloseButton });
  const containerClassName = classNames(classes.container, className);

  const sizesMap = {
    sm: 400,
    md: 500,
    lg: 600,
    fullscreen: '100vw',
  };

  const style = {
    width: width || sizesMap[size],
    ...styles,
  };

  useEffect(() => {
    ViewportService.lockBodyScrolling(isOpen, 'modal-window');

    return () => {
      ViewportService.lockBodyScrolling(false, 'modal-window');
    };
  }, [isOpen]);

  return (
    <>
      <Modal
        className={classNames(classes.root, rootClassName)}
        open={isOpen}
        onClose={onClose}
        closeAfterTransition
        disableScrollLock
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 300, className: classes.overlay }}
      >
        <>
          <Fade in={isOpen}>
            <div className={containerClassName} style={style}>
              {children}
            </div>
          </Fade>

          {isOpen && hasDesktopExternalCloseButton && (
            <Hidden smDown>
              <ButtonCross
                onClick={onClose}
                className={classes.externalCloseButton}
                color="white"
                size={20}
                alt="Close modal window"
              />
            </Hidden>
          )}
        </>
      </Modal>
    </>
  );
}

ModalWindow.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  styles: PropTypes.object,
  className: PropTypes.string,
  rootClassName: PropTypes.string,
  size: PropTypes.string,
  hasDesktopExternalCloseButton: PropTypes.bool,
};

ModalWindow.defaultProps = {
  width: '',
  styles: {},
  rootClassName: '',
  className: '',
  size: 'sm',
  hasDesktopExternalCloseButton: false,
};

export default ModalWindow;
