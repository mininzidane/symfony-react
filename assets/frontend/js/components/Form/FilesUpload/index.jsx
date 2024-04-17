import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ReactDropzone from 'react-dropzone';
import useIntl from 'frontend/js/hooks/useIntl';
import SpinnerWheel from 'frontend/js/components/SpinnerWheel';
import Button from 'frontend/js/components/Button';
import ButtonLink from 'frontend/js/components/ButtonLink';
import Loader from 'frontend/js/views/Shared/Loader';
import CrossSvg from 'frontend/images/shared/various/cross-thin-10x10.svg';
import DropArea from './DropArea';
import IconFileTypePng from './img/ic_doc.svg';
import useStyles from './useStyles';

function FilesUpload({
  id,
  name,
  label,
  fileValues,
  accept,
  isLoading,
  multiple,
  maxSize,
  error,
  touched,
  submitOnUpload,
  onChange,
  onTouched,
  onError,
  submitTrigger,
  displayErrors,
  isTriggerHidden,
  isDropArea,
  dropAreaType,
  filesContainerClassName,
  fileWrapClassName,
  dropAreaClassName,
  rootClassName,
  triggerRef,
  method,
}) {
  const intl = useIntl();
  const classes = useStyles();
  const [previews, setPreviews] = useState([]);
  const handleRejectedFiles = (rejectedFiles) => {
    onTouched(name, true, false);

    rejectedFiles.forEach((file) => {
      if (file.size > maxSize) {
        onError(name, intl.formatMessage({ id: 'form.error.fileUpload.tooLarge' }));
      } else {
        onError(name, intl.formatMessage({ id: 'form.error.fileUpload.unsupportedFormat' }, { fileName: file.name }));
      }
    });

    return false;
  };

  const onDropChange = (acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length) {
      return handleRejectedFiles(rejectedFiles);
    }

    if (!acceptedFiles.length) {
      onError(name, intl.formatMessage({ id: 'form.error.fileUpload.unknownError' }));
      return false;
    }

    onChange(name, fileValues.concat(acceptedFiles));
    onTouched(name, true);

    if (submitOnUpload && typeof submitTrigger === 'function') {
      submitTrigger();
    }

    return true;
  };

  const onDelete = (file) => {
    const newFileValues = fileValues.filter((fileValue) => fileValue !== file);
    onChange(name, newFileValues, false);
  };

  const triggerStyles = {
    width: '100%',
    height: 'auto',
    outline: 'none',
    cursor: isLoading ? 'not-allowed' : 'pointer',
  };

  useEffect(() => {
    setPreviews(
      fileValues.length && isDropArea
        ? fileValues.map((file) => {
            if (file.type === 'application/pdf') {
              return IconFileTypePng;
            }
            return URL.createObjectURL(file);
          })
        : [],
    );

    return () => {
      // Make sure to revoke the data uris to avoid memory leaks
      if (previews.length) {
        previews.forEach((preview) => URL.revokeObjectURL(preview));
      }
    };
  }, [fileValues]);

  return (
    <div className={classNames('files-upload', rootClassName, { 'is-error': !!error && touched })}>
      {!isTriggerHidden && (
        <ReactDropzone
          id={id}
          accept={accept}
          multiple={multiple}
          maxSize={maxSize}
          disabled={isLoading}
          onDrop={onDropChange}
        >
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps({ style: triggerStyles })} ref={triggerRef}>
                <input {...getInputProps()} />
                {isDropArea ? (
                  <DropArea
                    type={dropAreaType}
                    method={method}
                    hasFiles={!!fileValues.length}
                    className={classNames(classes.dropArea, dropAreaClassName, { 'is-error': !!error && touched })}
                  />
                ) : (
                  <>
                    {isLoading ? (
                      <div className={classes.loadingPlaceholder}>
                        <div>{intl.formatMessage({ id: 'form.filesUpload.uploadingFiles' })}</div>
                        <SpinnerWheel color="white" />
                      </div>
                    ) : (
                      <Button size="lg" label={label} />
                    )}
                  </>
                )}
              </div>
            </section>
          )}
        </ReactDropzone>
      )}

      {!!fileValues.length && (
        <>
          {isDropArea ? (
            <div
              className={
                isTriggerHidden
                  ? classNames(classes.dropArea, dropAreaClassName)
                  : classNames(classes.filesContainer, filesContainerClassName)
              }
            >
              {isLoading ? (
                <Loader minHeight={168} />
              ) : (
                <div className="selected-files">
                  {fileValues.map((file, index) => (
                    <div className={classNames(classes.fileWrap, fileWrapClassName)} key={file.name}>
                      {previews && previews[index] && (
                        <div className={classes.thumb}>
                          <img
                            src={previews[index]}
                            className={classNames(classes.img, { 'is-pdf': file.type === 'application/pdf' })}
                            alt={file.name}
                          />
                        </div>
                      )}
                      <div className={classes.fileName}>{file.name}</div>
                      <div className={classes.deleteFile}>
                        <ButtonLink
                          label={intl.formatMessage({ id: 'shared.cta.delete' })}
                          size="sm"
                          onClick={() => {
                            onDelete(file);
                          }}
                          className={classes.deleteCta}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className={classNames(classes.uploadedFiles, { 'pe-n': isLoading })}>
              {fileValues.map((file) => (
                <div className={classes.uploadedFile} key={file.name}>
                  <div>{file.name}&nbsp;</div>

                  <button
                    type="button"
                    className={classes.deleteButton}
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      onDelete(file);
                    }}
                  >
                    <img width="10" height="10" src={CrossSvg} alt="delete" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {displayErrors && !!error && touched && (
        <div className={isDropArea ? classes.error : classes.error2}>
          {`${intl.formatMessage({ id: 'shared.label.error' })}: ${error}`}
        </div>
      )}
    </div>
  );
}

FilesUpload.defaultProps = {
  label: undefined,
  isLoading: false,
  fileValues: [],
  accept: '*/*',
  multiple: false,
  maxSize: 100000000,
  error: '',
  touched: false,
  submitOnUpload: false,
  isDropArea: false,
  isTriggerHidden: false,
  submitTrigger: undefined,
  displayErrors: true,
  triggerRef: {},
  dropAreaType: '',
  fileWrapClassName: '',
  dropAreaClassName: '',
  filesContainerClassName: '',
  rootClassName: '',
  method: '',
};

FilesUpload.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  fileValues: PropTypes.arrayOf(PropTypes.instanceOf(File)),
  accept: PropTypes.string,
  isLoading: PropTypes.bool,
  multiple: PropTypes.bool,
  maxSize: PropTypes.number,
  submitOnUpload: PropTypes.bool,
  error: PropTypes.string,
  triggerRef: PropTypes.object,
  touched: PropTypes.oneOfType([PropTypes.bool, PropTypes.object, PropTypes.array]),
  onChange: PropTypes.func.isRequired,
  onTouched: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  submitTrigger: PropTypes.func,
  displayErrors: PropTypes.bool,
  isTriggerHidden: PropTypes.bool,
  isDropArea: PropTypes.bool,
  dropAreaType: PropTypes.string,
  fileWrapClassName: PropTypes.string,
  dropAreaClassName: PropTypes.string,
  filesContainerClassName: PropTypes.string,
  rootClassName: PropTypes.string,
  method: PropTypes.string,
};

export default FilesUpload;
