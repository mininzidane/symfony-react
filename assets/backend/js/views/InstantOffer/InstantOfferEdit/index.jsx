import ReactDOM from 'react-dom';
import React, { useState } from 'react';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import TextArea from 'backend/js/components/Form/TextArea';
import SubmitButton from 'backend/js/components/SubmitButton';
import InstantOfferService from 'backend/js/api/InstantOfferService';
import BaseApiService from 'backend/js/api/BaseApiService';
import FlashMessage from 'backend/js/components/FlashMessage';
import Input from 'backend/js/components/Form/Input';
import FormikDropzone from 'backend/js/components/Form/FormikDropzone';
import UploadedDocumentCard from 'backend/js/components/UploadedDocumentCard';
import DateTimeService from 'backend/js/lib/utils/DateTimeService';
import Button from 'backend/js/components/Button';
import RadioButton from 'backend/js/components/Form/RadioButton';
import ThemeProvider from 'backend/js/providers/ThemeProvider';
import ModalWindow from 'backend/js/components/ModalWindow';
import ModalWindowHeader from 'backend/js/components/ModalWindow/Header';
import ModalWindowBody from 'backend/js/components/ModalWindow/Body';
import SendFileNotificationForm from 'backend/js/views/InstantOffer/InstantOfferList/InstantOfferVehicle/SendFileNotificationForm';
import SnackbarProvider from 'backend/js/providers/SnackbarProvider';
import InstantOfferFormValidationSchema from './InstantOfferFormValidationSchema';
import EhLogo from '../img/ehLogo.png';

function InstantOfferEdit({ photoTypes, instantOffer: initInstantOffer }) {
  const defaultFlash = { message: '', type: '' };
  const [flash, setFlash] = useState(defaultFlash);
  const [instantOffer, setInstantOffer] = useState(initInstantOffer);
  const [instantOfferChangeLogs, setInstantOfferChangeLogs] = useState(instantOffer.instantOfferChangeLogs);
  const [modalContent, setModalContent] = useState(null);

  const instantOfferService = new InstantOfferService();
  const { FILE_CONTENT_TYPES } = InstantOfferService;

  const mapFilesToDocuments = (instantOfferFiles) =>
    instantOfferFiles.map((file) => ({
      id: file.id,
      file_name: file.path,
      mime_type: file.mimeType,
      s3_url: file.s3Url,
      active: file.active,
      uploadedAt: file.uploadedAt,
    }));
  const [documents, setDocuments] = useState(mapFilesToDocuments(instantOffer.instantOfferFiles));

  async function handleImageUpload(values) {
    const formData = new FormData();
    const appendData = (name) => {
      for (let i = 0; i < values[name].length; i++) {
        formData.append(`${name}_${i}`, values[name][i]);
      }
    };
    appendData('newInstantOfferFiles');

    for (let i = 0; i < documents.length; i++) {
      formData.append(`instantOfferFileId_${documents[i].id}`, documents[i].active);
    }

    return instantOfferService.uploadFiles(instantOffer.ref, values.fileType, formData);
  }

  async function onSubmit(values, { setSubmitting, setFieldValue }) {
    setSubmitting(true);
    setFlash({ message: '', type: 'error' });

    try {
      const uploadResponse = await handleImageUpload(values);
      setDocuments(mapFilesToDocuments(uploadResponse.instantOffer.instantOfferFiles));
      setFieldValue('newInstantOfferFiles', []);

      const response = await instantOfferService.editInstantOffer(instantOffer.ref, {
        notes: values.notes,
        titleName: values.titleName,
      });
      setFlash({ message: 'Saving successful', type: 'success' });
      setInstantOffer(response.instantOffer);
      setInstantOfferChangeLogs(response.instantOffer.instantOfferChangeLogs);
    } catch (e) {
      const message = BaseApiService.parseErrorResponse(e);
      setFlash({ message, type: 'error' });
    }

    setSubmitting(false);
  }

  function setDocumentActive(document, active) {
    const newDocuments = documents.map((documentItem) => {
      if (documentItem.id === document.id) {
        documentItem.active = active;
      }
      return documentItem;
    });
    setDocuments(newDocuments);
  }

  function setAllDocumentRemoved() {
    const newDocuments = documents.map((documentItem) => {
      documentItem.active = false;
      return documentItem;
    });
    setDocuments(newDocuments);
  }

  return (
    <>
      <Formik
        initialValues={{
          notes: '',
          titleName: instantOffer.titleName,
          newInstantOfferFiles: [],
          fileType: 'photo',
        }}
        validationSchema={InstantOfferFormValidationSchema}
        enableReinitialize
        onSubmit={onSubmit}
      >
        {({
          values,
          touched,
          errors,
          setFieldValue,
          setFieldTouched,
          setFieldError,
          isSubmitting,
          handleSubmit,
          submitForm,
        }) => (
          <div className="wrapper wrapper-content">
            <div className="ibox float-e-margins">
              <div className="ibox-title">
                <h2>
                  {instantOffer.title} #{instantOffer.ref}
                </h2>
              </div>
              <div className="ibox-content">
                {flash.message && <FlashMessage message={flash.message} type={flash.type} />}
                <form onSubmit={handleSubmit}>
                  <div className="row form-group">
                    <div className="col-sm-4">
                      <div className="form-group">
                        <TextArea
                          id="notes"
                          name="notes"
                          label="Notes"
                          value={values.notes}
                          error={errors.notes}
                          touched={touched.notes}
                          className="textarea-hollow m-b-sm"
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                          onError={setFieldError}
                        />
                      </div>
                      <div className="form-group">
                        <Input
                          id="titleName"
                          name="titleName"
                          placeholder="Name on title"
                          value={values.titleName}
                          error={errors.titleName}
                          touched={touched.titleName}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                          onError={setFieldError}
                        />
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <b>Quote: {instantOffer.nearestLocationQuote}</b>
                    </div>
                  </div>
                  <div className="form-group">
                    <FormikDropzone
                      id="newInstantOfferFiles"
                      name="newInstantOfferFiles"
                      fileValues={values.newInstantOfferFiles}
                      accept={
                        values.fileType === 'video'
                          ? 'video/*'
                          : `image/*${values.fileType === 'document' ? ',.pdf' : ''}`
                      }
                      disabled={isSubmitting}
                      error={errors.newInstantOfferFiles}
                      touched={touched.newInstantOfferFiles}
                      onChange={setFieldValue}
                      onTouched={setFieldTouched}
                      onError={setFieldError}
                      submitTrigger={submitForm}
                      multiple
                    />
                  </div>
                  <div className="form-group form-horizontal d-f">
                    <RadioButton
                      id="fileTypePhoto"
                      label="Photo"
                      name="fileType"
                      value="photo"
                      isChecked={values.fileType === 'photo'}
                      onChange={setFieldValue}
                      className="mr-15"
                    />
                    <RadioButton
                      id="fileTypeDocument"
                      label="Document"
                      name="fileType"
                      value="document"
                      isChecked={values.fileType === 'document'}
                      onChange={setFieldValue}
                      className="mr-15"
                    />
                    <RadioButton
                      id="fileTypeVideo"
                      label="Video"
                      name="fileType"
                      value="video"
                      isChecked={values.fileType === 'video'}
                      onChange={setFieldValue}
                      className="mr-15"
                    />
                  </div>
                  <hr />
                  <div className="uploaded-documents__card-list">
                    {documents.map((document) => {
                      const content = `Added: ${DateTimeService.formatFromISOStringWithoutTimezone(
                        document.uploadedAt,
                        'MMM dd, yyyy',
                      )}`;
                      return (
                        <UploadedDocumentCard
                          key={document.id}
                          document={document}
                          content={content}
                          removeCallback={() => setDocumentActive(document, false)}
                          undoRemoveCallback={() => setDocumentActive(document, true)}
                        />
                      );
                    })}
                  </div>
                  <SubmitButton label="Save" className="btn-primary" isLoading={isSubmitting} disabled={isSubmitting} />
                  <Button label="Delete all images" className="btn-danger ml-5" onClick={setAllDocumentRemoved} />
                  <Button
                    label="Request Title"
                    className="btn-warning ml-5"
                    onClick={() => {
                      setModalContent({
                        title: 'Request Title Modal',
                        content: (
                          <SendFileNotificationForm
                            instantOffer={instantOffer}
                            fileContentType={FILE_CONTENT_TYPES.DOCUMENT}
                            setModalContent={setModalContent}
                          />
                        ),
                      });
                    }}
                  />
                  {photoTypes.length - instantOffer.activePhotosCount > 0 && (
                    <Button
                      label="Request Pictures"
                      className="btn-warning ml-5"
                      onClick={() => {
                        setModalContent({
                          title: 'Request Pictures Modal',
                          content: (
                            <SendFileNotificationForm
                              instantOffer={instantOffer}
                              fileContentType={FILE_CONTENT_TYPES.PHOTO}
                              setModalContent={setModalContent}
                            />
                          ),
                        });
                      }}
                    />
                  )}
                </form>
                <hr />

                <table className="table table-bordered table-striped table-hover">
                  <thead>
                    <tr>
                      <th>Current status</th>
                      <th>New status</th>
                      <th>Notes</th>
                      <th>Employee</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {instantOfferChangeLogs.map((instantOfferChangeLog) => (
                      <tr key={instantOfferChangeLog.id}>
                        <td>{instantOfferChangeLog.currentStatus}</td>
                        <td>{instantOfferChangeLog.newStatus}</td>
                        <td>{instantOfferChangeLog.notes}</td>
                        <td>
                          {instantOfferChangeLog.source === 'EH' && (
                            <img src={EhLogo} alt="EH Logo" width="16px" height="16px" style={{ marginRight: '5px' }} />
                          )}
                          {instantOfferChangeLog.createdBy ? (
                            <>
                              {instantOfferChangeLog.createdBy?.firstName} {instantOfferChangeLog.createdBy?.lastName}
                            </>
                          ) : (
                            'AUTO'
                          )}
                        </td>
                        <td>{new Date(instantOfferChangeLog.createdAt).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </Formik>

      {modalContent && (
        <ModalWindow
          isOpen={Boolean(modalContent)}
          onClose={() => setModalContent(null)}
          styles={modalContent.styles ? modalContent.styles : {}}
        >
          <ModalWindowHeader title={modalContent.title} onClose={() => setModalContent(null)} />
          <ModalWindowBody className="p-20 ov-v">{modalContent.content}</ModalWindowBody>
        </ModalWindow>
      )}
    </>
  );
}

InstantOfferEdit.propTypes = {
  photoTypes: PropTypes.array,
  instantOffer: PropTypes.object.isRequired,
};

InstantOfferEdit.defaultProps = {
  photoTypes: [],
};

const $el = document.getElementById('instant-offer-edit');
if ($el) {
  const photoTypes = $el.dataset.photoTypes ? JSON.parse($el.dataset.photoTypes) : [];
  const instantOffer = $el.dataset.instantOffer ? JSON.parse($el.dataset.instantOffer) : {};

  ReactDOM.render(
    <ThemeProvider>
      <SnackbarProvider>
        <InstantOfferEdit photoTypes={photoTypes} instantOffer={instantOffer} />
      </SnackbarProvider>
    </ThemeProvider>,
    $el,
  );
}

export default InstantOfferEdit;
