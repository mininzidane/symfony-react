import React from 'react';
import PropTypes from 'prop-types';
import ModalWindow from 'backend/js/components/ModalWindow';
import ModalWindowHeader from 'backend/js/components/ModalWindow/Header';
import ModalWindowBody from 'backend/js/components/ModalWindow/Body';
import ViewDetails from './ViewDetails';
import useStyles from './useStyles';

function ViewDetailsModal({ invoice, isOpen, onClose, title }) {
  const classes = useStyles();

  return (
    <ModalWindow className={classes.modal} isOpen={isOpen} onClose={onClose} size="fullscreen">
      <ModalWindowHeader onClose={onClose} title={title} />
      <ModalWindowBody>
        <ViewDetails invoice={invoice} />
      </ModalWindowBody>
    </ModalWindow>
  );
}

ViewDetailsModal.propTypes = {
  invoice: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default ViewDetailsModal;
