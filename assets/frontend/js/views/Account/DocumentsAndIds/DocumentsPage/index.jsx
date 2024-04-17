import React, { useState } from 'react';
import Container from 'frontend/js/components/Container';
import Loader from 'frontend/js/views/Shared/Loader';
import Caption from './Caption';
import DocumentsUpload from './DocumentsUpload';
import DocumentsToSign from './DocumentsToSign';
import DocumentsSigned from './DocumentsSigned';
import DocumentViewModal from './DocumentViewModal';
import ConfirmationModal from './ConfirmationModal';
import useStyles from './useStyles';
import useDocuments from './useDocuments';

function DocumentsPage() {
  const classes = useStyles();
  const { documents, signedPurchases, unsignedPurchases, isLoading } = useDocuments();
  const [modalImageSrc, setModalImageSrc] = useState();
  const [confirmModalDocument, setConfirmModalDocument] = useState(false);

  return (
    <div>
      <Caption />

      {isLoading ? (
        <Loader />
      ) : (
        <Container className={classes.root}>
          <DocumentsUpload documents={documents} setModalImageSrc={setModalImageSrc} />
          <DocumentsToSign documents={unsignedPurchases} openModal={setConfirmModalDocument} />
          <DocumentsSigned documents={signedPurchases} />
          <DocumentViewModal imgSrc={modalImageSrc} setModalImageSrc={setModalImageSrc} />
          <ConfirmationModal document={confirmModalDocument} setDocument={setConfirmModalDocument} />
        </Container>
      )}
    </div>
  );
}

export default DocumentsPage;
