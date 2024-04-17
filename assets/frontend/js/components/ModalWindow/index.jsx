import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from 'frontend/js/components/Fade';
import ViewportService from 'frontend/js/lib/utils/ViewportService';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import ButtonCross from '../ButtonCross';
import useStyles from './useStyles';

function ModalWindow({
  isOpen,
  onClose,
  children,
  width,
  size,
  className,
  rootClassName,
  hasDesktopExternalCloseButton,
  name,
  keepMounted,
  containerProps,
}) {
  const classes = useStyles({ hasDesktopExternalCloseButton });
  const containerClassName = classNames(classes.container, className);
  const { isAboveSm } = useBreakpoint();

  const sizesMap = {
    sm: 400,
    md: 500,
    lg: 600,
    fullscreen: '100vw',
  };

  useEffect(() => {
    const id = `modal-window${name ? `-${name}` : ''}`;
    ViewportService.lockBodyScrolling(isOpen, id);

    return () => {
      ViewportService.lockBodyScrolling(false, id);
    };
  }, [isOpen]);

  return (
    <>
      <Modal
        className={classNames(classes.root, rootClassName, 'modal-window')}
        open={isOpen}
        onClose={onClose}
        closeAfterTransition
        disableScrollLock
        keepMounted={keepMounted}
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 300, className: classes.overlay }}
      >
        <>
          <Fade isOpen={isOpen} isAlwaysMounted>
            <div className={containerClassName} style={{ width: width || sizesMap[size] }} {...containerProps}>
              {children}
            </div>
          </Fade>

          {isAboveSm && isOpen && hasDesktopExternalCloseButton && (
            <ButtonCross
              onClick={onClose}
              className={classes.externalCloseButton}
              color="white"
              size={20}
              alt="Close modal window"
            />
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
  className: PropTypes.string,
  rootClassName: PropTypes.string,
  size: PropTypes.string,
  name: PropTypes.string,
  hasDesktopExternalCloseButton: PropTypes.bool,
  keepMounted: PropTypes.bool,
  containerProps: PropTypes.object,
};

ModalWindow.defaultProps = {
  width: '',
  rootClassName: '',
  className: '',
  name: '',
  size: 'sm',
  hasDesktopExternalCloseButton: false,
  keepMounted: false,
  containerProps: {},
};

export default ModalWindow;
