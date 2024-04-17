import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ModalWindow from 'frontend/js/components/ModalWindow';
import RouterService from 'frontend/js/api/RouterService';
import SuspenseWrap from 'frontend/js/components/Suspense/Wrap';
import LotService from 'frontend/js/api/LotService';
import useStyles from './useStyles';

const Content = React.lazy(() => import('./Content'));

function ModalGallery({ id, auction, trigger }) {
  const classes = useStyles();

  const [isOpen, setIsOpen] = useState(false);

  function handleOpen() {
    setIsOpen(true);
  }

  function handleClose() {
    setIsOpen(false);
  }

  useEffect(() => {
    if (id === LotService.FAKE_LOT_ID) {
      return;
    }

    const KEY = 'openModalGallery';
    const isGalleryOpenByDefault = Boolean(RouterService.getQueryParam(KEY));

    if (isGalleryOpenByDefault) {
      setIsOpen(true);
      RouterService.addQueryParams({ [KEY]: undefined }, { replaceState: true });
    }
  }, []);

  return (
    <>
      {React.cloneElement(trigger, {
        onClick: handleOpen,
      })}

      <SuspenseWrap fallback={null} init={isOpen}>
        <ModalWindow isOpen={isOpen} onClose={handleClose} className={classes.root} size="fullscreen">
          <Content id={id} auction={auction} handleClose={handleClose} />
        </ModalWindow>
      </SuspenseWrap>
    </>
  );
}

ModalGallery.propTypes = {
  id: PropTypes.number.isRequired,
  auction: PropTypes.string.isRequired,
  trigger: PropTypes.node.isRequired,
};

export default ModalGallery;
