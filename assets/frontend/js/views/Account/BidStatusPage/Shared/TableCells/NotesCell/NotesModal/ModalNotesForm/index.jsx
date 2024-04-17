import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { useFormik } from 'formik';
import useIntl from 'frontend/js/hooks/useIntl';
import ModalWindow from 'frontend/js/components/ModalWindow';
import ModalWindowHeader from 'frontend/js/components/ModalWindow/Header';
import ModalWindowBody from 'frontend/js/components/ModalWindow/Body';
import ModalWindowFooter from 'frontend/js/components/ModalWindow/Footer';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import useDropzone from 'frontend/js/hooks/useDropzone';
import Notes from '../Notes';
import useNotes from '../useNotes';
import Form from './Form';
import validationSchema from './validationSchema';
import useStyles from './useStyles';

function NotesModal({ isOpen, onClose, lotId, auction, newTotal, onReadNotes }) {
  const intl = useIntl();
  const { id: customerId } = useCustomerHelper();
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const bodyRef = useRef();

  const { files, resetFiles, onRemoveFile, getRootProps, getInputProps, isDragActive, openFileDialog } = useDropzone();
  const { notes, addNote, isLoading } = useNotes({ lotId, auction, containerRef: bodyRef, onReadNotes, newTotal });

  async function onSubmit(values, { resetForm }) {
    const formData = new FormData();
    formData.append('customer', customerId);
    formData.append('stockNumber', lotId);
    formData.append('auction', auction);
    formData.append('message', values.message);
    for (let i = 0; i < files.length; i++) {
      formData.append(`note_file_${i}`, files[i]);
    }
    try {
      await addNote(formData);
      resetForm();
      resetFiles();
    } catch (e) {
      enqueueSnackbar(intl.formatMessage({ id: 'form.error.general' }), { variant: 'error' });
    }
  }

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit,
    validationSchema,
    enableReinitialize: false,
  });

  const title = intl.formatMessage(
    { id: 'bidStatusPage.lotsWon.notes.title' },
    {
      count: newTotal,
      id: lotId,
    },
  );

  return (
    <ModalWindow
      className={classes.modal}
      rootClassName={classes.root}
      onClose={onClose}
      isOpen={isOpen}
      width={724}
      keepMounted={false}
      containerProps={getRootProps()}
    >
      <ModalWindowHeader className={classes.header} title={title} onClose={onClose} />
      <ModalWindowBody hasFooter className={classes.body} bodyRef={bodyRef}>
        <Notes notes={notes} isLoading={isLoading} />
      </ModalWindowBody>
      <ModalWindowFooter className={classes.footer}>
        <Form
          formik={formik}
          files={files}
          onRemoveFile={onRemoveFile}
          getInputProps={getInputProps}
          isDragActive={isDragActive}
          openFileDialog={openFileDialog}
        />
      </ModalWindowFooter>
    </ModalWindow>
  );
}

NotesModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  lotId: PropTypes.number.isRequired,
  auction: PropTypes.string.isRequired,
  onReadNotes: PropTypes.func.isRequired,
  newTotal: PropTypes.number,
};

NotesModal.defaultProps = {
  newTotal: 0,
};

export default NotesModal;
