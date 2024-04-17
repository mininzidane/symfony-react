import * as React from 'react';
import PropTypes from 'prop-types';
import { cloneElement, useState } from 'react';
import LotShape from 'frontend/js/lib/propshapes/LotShape';
import ModalWindow from 'frontend/js/components/ModalWindow';
import SuspenseWrap from 'frontend/js/components/Suspense/Wrap';
import useStyles from './useStyles';

const Content = React.lazy(() => import('./Content'));

function ModalSpinView({ trigger, lot }) {
  if (!lot) {
    return null;
  }

  const [isOpen, setIsOpen] = useState(false);
  const { id, inventoryAuction: auction, spincarPanoramas } = lot;
  const classes = useStyles();

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
          <Content id={id} auction={auction} handleClose={handleClose} spincarPanoramas={spincarPanoramas} />
        </ModalWindow>
      </SuspenseWrap>
    </>
  );
}

ModalSpinView.propTypes = {
  trigger: PropTypes.node.isRequired,
  lot: LotShape,
};

ModalSpinView.defaultProps = {
  lot: null,
};

export default ModalSpinView;
