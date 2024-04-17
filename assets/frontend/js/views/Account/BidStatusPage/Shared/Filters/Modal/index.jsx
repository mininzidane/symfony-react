import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ModalWindow from 'frontend/js/components/ModalWindow';
import ButtonCross from 'frontend/js/components/ButtonCross';
import FiltersToggle from './FiltersToggle';
import useStyles from './useStyles';

function Modal({ title, children }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const classes = useStyles();

  return (
    <>
      <FiltersToggle onClick={() => setModalOpen(true)} isActive={isModalOpen} />

      <ModalWindow isOpen={isModalOpen} onClose={() => setModalOpen(false)} size="fullscreen">
        <div className={classes.modalContent}>
          <div className={classes.modalHeader}>
            <div className={classes.modalTitle}>{title}</div>
            <ButtonCross size={12} onClick={() => setModalOpen(false)} className={classes.closeButton} />
          </div>
          {children}
        </div>
      </ModalWindow>
    </>
  );
}

Modal.defaultProps = {
  title: '',
};

Modal.propTypes = {
  title: PropTypes.node,
  children: PropTypes.node.isRequired,
};

export default Modal;
