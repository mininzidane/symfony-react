import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import RouterService from 'backend/js/api/RouterService';
import TitlesService from 'backend/js/api/TitlesService';
import SpinnerWheel from 'backend/js/components/SpinnerWheel';
import Button from 'backend/js/components/Button';
import FileInput from 'frontend/js/components/Form/FilesInput';
import PropTypes from 'prop-types';
import { Checkbox } from '@material-ui/core';

function Upload({ report }) {
  const { enqueueSnackbar } = useSnackbar();
  const [id, setId] = useState(RouterService.getQueryParam('id') ? RouterService.getQueryParam('id') : null);
  const [titleService] = useState(() => new TitlesService());
  const [documentDetails, setDocumentDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [scanAllPages, setScanAllPages] = useState(false);

  function getTokenDetails() {
    return titleService
      .getHandledDocumentDetails(id)
      .then((data) => {
        setDocumentDetails(typeof data.finishedAt !== 'undefined' ? data : null);
        if (!data.finishedAt) {
          setTimeout(() => {
            getTokenDetails(id);
          }, 15 * 1000);
        }
      })
      .catch((e) => {
        let messages = 'An error occurred while processing this request.';
        if (e?.response?.status === 404) {
          messages = 'Document not found';
        }

        enqueueSnackbar(messages, { variant: 'error' });
      });
  }

  useEffect(() => {
    if (!id) {
      return;
    }
    document.getElementById('title-documents-table')?.remove();
    setIsLoading(true);
    getTokenDetails().finally(() => {
      setIsLoading(false);
    });
  }, [id]);

  async function onUploadFiles(filesList) {
    if (Object.values(filesList).length === 0) {
      return;
    }
    document.getElementById('title-documents-table')?.remove();
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', Object.values(filesList)[0]);
      formData.append('scanAllPages', scanAllPages ? 1 : 0);
      if (report) {
        formData.append('report', report);
      }
      const response = await titleService.handleDocument(formData);
      if (!report) {
        setId(response.id);
        RouterService.addQueryParams({ id: response.id }, true);
      }
    } catch (e) {
      if (window.Sentry) {
        window.Sentry.captureException(e);
      }
      if (e?.response?.status === 413) {
        enqueueSnackbar('File too large.', { variant: 'error' });
        return;
      }
      let messages = `An error occurred while processing this request. Response status: ${e?.response?.status}`;
      if (e?.response?.data?.errors) {
        messages = Object.values(e?.response?.data?.errors).join(' ');
      }

      enqueueSnackbar(messages, { variant: 'error' });
    }
    setIsLoading(false);
  }

  return (
    <>
      <>
        {(isLoading || !documentDetails || !documentDetails.finishedAt) && id && (
          <div style={{ minHeight: 34 }}>
            <SpinnerWheel size={34} thickness={3} isCentered />
          </div>
        )}
      </>
      {id ? (
        <>
          {documentDetails && (
            <>
              <ul className="list-unstyled">
                <li>PDF pages: {documentDetails.pages}</li>
                <li>Handled pages: {documentDetails.handledPages}</li>
                <li>Found tracking numbers: {documentDetails.foundTrackingNumbers?.length || '-'}</li>
                <li>Not found tracking numbers: {documentDetails.notFoundTrackingNumbers?.length || '-'}</li>
                <li>Created documents: {documentDetails.finishedAt ? documentDetails.createdDocuments : '-'}</li>
              </ul>
              <div dangerouslySetInnerHTML={{ __html: documentDetails.list }} />
            </>
          )}
        </>
      ) : (
        <>
          <Button
            style={{ position: 'relative' }}
            label={
              <>
                Upload Document
                <FileInput name="file" onChange={onUploadFiles} isInButton accept="application/pdf,application/x-pdf" />
              </>
            }
            isLoading={isLoading}
          />
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control,jsx-a11y/label-has-for */}
          <label>
            <Checkbox onChange={(e) => setScanAllPages(e.target.checked)} checked={scanAllPages} /> Scan All Pages
          </label>
        </>
      )}
      <div className="clearfix" />
    </>
  );
}

Upload.defaultProps = {
  report: null,
};

Upload.propTypes = {
  report: PropTypes.number,
};

export default Upload;
