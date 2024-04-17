/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
import React, { useState, cloneElement } from 'react';
import PropTypes from 'prop-types';
import ModalWindow from 'frontend/js/components/ModalWindow';
import SuspenseWrap from 'frontend/js/components/Suspense/Wrap';
import useStyles from './useStyles';

const Content = React.lazy(() => import('./Content'));

function Modal360View({ id, auction, trigger, externalUrls, internalUrl }) {
  const classes = useStyles();

  const [isOpen, setIsOpen] = useState(false);

  function handleOpen() {
    setIsOpen(true);
  }

  function handleClose() {
    setIsOpen(false);
  }

  return (
    <>
      {cloneElement(trigger, { onClick: handleOpen })}

      <SuspenseWrap fallback={null} init={isOpen}>
        <ModalWindow
          rootClassName={classes.root}
          className={classes.container}
          onClose={handleClose}
          isOpen={isOpen}
          hasCloseButton={false}
          size="fullscreen"
        >
          <Content
            id={id}
            auction={auction}
            handleClose={handleClose}
            externalUrls={externalUrls}
            internalUrl={internalUrl}
          />
        </ModalWindow>
      </SuspenseWrap>
    </>
  );
}

Modal360View.propTypes = {
  id: PropTypes.number.isRequired,
  trigger: PropTypes.node.isRequired,
  auction: PropTypes.string,
};

Modal360View.defaultProps = {
  auction: undefined,
};

export default Modal360View;
