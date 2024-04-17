import React from 'react';
import PropTypes from 'prop-types';
import ModalNotesView from './ModalNotesView';
import ModalNotesForm from './ModalNotesForm';

function NotesModal({ isViewOnly, ...props }) {
  return isViewOnly ? <ModalNotesView {...props} /> : <ModalNotesForm {...props} />;
}

NotesModal.propTypes = {
  isViewOnly: PropTypes.bool.isRequired,
};

export default NotesModal;
