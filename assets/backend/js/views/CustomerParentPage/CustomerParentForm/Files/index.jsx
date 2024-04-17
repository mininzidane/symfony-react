import PropTypes from 'prop-types';
import React, { useState } from 'react';
import get from 'lodash/get';
import CustomerParentService from 'backend/js/api/CustomerParentService';
import DateTimeService from 'backend/js/lib/utils/DateTimeService';
import RouterService from 'backend/js/api/RouterService';
import FileInput from 'frontend/js/components/Form/FilesInput';
import Button from 'backend/js/components/Button';
import { useSnackbar } from 'notistack';

function Files({ customerParent, allowToUpload }) {
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState(customerParent.files);
  const { enqueueSnackbar } = useSnackbar();
  const customerParentService = new CustomerParentService();

  async function onUploadFiles(filesList) {
    setIsLoading(true);
    try {
      const formData = new FormData();
      Object.keys(filesList).forEach((key) => {
        formData.append(`file_${key}`, filesList[key]);
      });
      const response = await customerParentService.uploadFile(customerParent.id, formData);
      setFiles(response.customerParent.files);
    } catch (serverError) {
      let messages = 'An error occurred while processing this request.';
      if (serverError) {
        const errors = get(serverError, 'response.data.errors.errors', {});
        messages = Object.values(errors).join(' ');
      }

      enqueueSnackbar(messages, { variant: 'error' });
    }
    setIsLoading(false);
  }

  return (
    <>
      <h2>Files</h2>
      <div style={{ maxHeight: '100px', overflow: 'hidden', overflowY: 'auto' }}>
        {files.map((file) => (
          <div key={file.id}>
            <small className="text-muted">
              <i>
                *{file.uploadedBy.firstName} {file.uploadedBy.lastName} -{' '}
                {DateTimeService.formatFromISOString(file.uploadedAt, 'MM/dd/yyyy H:mmaaa').toLowerCase()}
              </i>
            </small>
            &nbsp;-&nbsp;
            <a href={RouterService.getRoute('customerParentFile', null, { id: customerParent.id, fileId: file.id })}>
              {file.fileName}
            </a>
            {allowToUpload && (
              <>
                &nbsp;
                <a
                  href={RouterService.getRoute('customerParentFileDelete', null, {
                    id: customerParent.id,
                    fileId: file.id,
                  })}
                  className="require-confirmation"
                >
                  <i className="fa fa-trash" />
                </a>
              </>
            )}
          </div>
        ))}
      </div>
      {allowToUpload && (
        <Button
          style={{ position: 'relative' }}
          label={
            <>
              Upload files
              <FileInput
                name="file"
                onChange={onUploadFiles}
                isInButton
                accept="application/pdf,application/x-pdf,image/jpeg,image/pjpeg,image/png"
                multiple
              />
            </>
          }
          isLoading={isLoading}
        />
      )}
    </>
  );
}

Files.propTypes = {
  customerParent: PropTypes.object.isRequired,
  allowToUpload: PropTypes.bool,
};

Files.defaultProps = {
  allowToUpload: false,
};

export default Files;
