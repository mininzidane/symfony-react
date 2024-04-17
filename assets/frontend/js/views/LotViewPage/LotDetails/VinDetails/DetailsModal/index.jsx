import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ModalWindow from 'frontend/js/components/ModalWindow';
import SuspenseWrap from 'frontend/js/components/Suspense/Wrap';
import useStyles from './useStyles';

const Content = React.lazy(() => import('./Content'));

function DetailsModal({ lot, trigger }) {
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
      {React.cloneElement(trigger, {
        onClick: handleOpen,
      })}

      <SuspenseWrap fallback={null} init={isOpen}>
        <ModalWindow isOpen={isOpen} onClose={handleClose} className={classes.root} size="fullscreen">
          <Content lot={lot} handleClose={handleClose} />
        </ModalWindow>
      </SuspenseWrap>
    </>
  );
}

DetailsModal.propTypes = {
  trigger: PropTypes.node.isRequired,
  lot: PropTypes.shape({}).isRequired,
};

export default DetailsModal;
