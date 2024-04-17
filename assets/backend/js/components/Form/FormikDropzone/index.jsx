import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import DropzoneThumbnail from '../../DropzoneThumbnail';

function FormikDropzone({
  id,
  name,
  label,
  fileValues,
  accept,
  disabled,
  multiple,
  maxSize,
  error,
  touched,
  submitOnUpload,
  onChange,
  onTouched,
  onError,
  submitTrigger,
}) {
  const handleRejectedFiles = (rejectedFiles) => {
    onTouched(name, true, false);

    rejectedFiles.forEach((file) => {
      if (file.size > maxSize) {
        onError(name, 'Uploaded file is too large.');
      } else {
        onError(name, 'Invalid file.');
      }
    });

    return false;
  };

  const onDropChange = (acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length) {
      return handleRejectedFiles(rejectedFiles);
    }

    if (!acceptedFiles.length) {
      onError(name, 'An unknown error occurred. Please try a different file.');
      return false;
    }

    onTouched(name, true);
    onChange(name, fileValues.concat(acceptedFiles));

    if (submitOnUpload && typeof submitTrigger === 'function') {
      submitTrigger();
    }

    return true;
  };

  const onDelete = (file) => {
    const newFileValues = fileValues.slice().filter((fileValue) => fileValue !== file);
    onChange(name, newFileValues);
  };

  const dropzoneStyle = {
    width: '100%',
    height: 'auto',
    minHeight: '140px',
    border: '1px dashed #1ab394',
    padding: '20px',
    borderRadius: 5,
    cursor: disabled ? 'not-allowed' : 'pointer',
    backgroundColor: disabled ? '#eeeeee' : '#ffffff',
  };

  return (
    <div className="formik-dropzone-wrapper">
      {label && <label htmlFor={id}>{label}</label>}
      <Dropzone id={id} accept={accept} multiple={multiple} maxSize={maxSize} disabled={disabled} onDrop={onDropChange}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps({ style: dropzoneStyle })} /* eslint-disable-line react/jsx-props-no-spreading */>
              <input {...getInputProps()} /* eslint-disable-line react/jsx-props-no-spreading */ />
              {fileValues.length === 0 && (
                <p
                  style={{
                    textAlign: 'center',
                    margin: '2em 0',
                    fontSize: '16px',
                  }}
                >
                  Drop files here to upload
                </p>
              )}

              <div className="uploaded-files" style={{ display: 'flex' }}>
                {fileValues.map((file) => (
                  <DropzoneThumbnail file={file} key={file.name} onDelete={onDelete} />
                ))}
              </div>
            </div>
          </section>
        )}
      </Dropzone>

      {!!error && touched && <div className="field-error field-error--dropzone">{error}</div>}
    </div>
  );
}

FormikDropzone.defaultProps = {
  label: undefined,
  disabled: false,
  fileValues: [],
  accept: '*/*',
  multiple: false,
  maxSize: 100000000,
  error: '',
  touched: false,
  submitOnUpload: false,
  submitTrigger: undefined,
};

FormikDropzone.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  fileValues: PropTypes.arrayOf(PropTypes.instanceOf(File)),
  accept: PropTypes.string,
  disabled: PropTypes.bool,
  multiple: PropTypes.bool,
  maxSize: PropTypes.number,
  submitOnUpload: PropTypes.bool,
  error: PropTypes.string,
  touched: PropTypes.oneOfType([PropTypes.bool, PropTypes.object, PropTypes.array]),
  onChange: PropTypes.func.isRequired,
  onTouched: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  submitTrigger: PropTypes.func,
};

export default FormikDropzone;
