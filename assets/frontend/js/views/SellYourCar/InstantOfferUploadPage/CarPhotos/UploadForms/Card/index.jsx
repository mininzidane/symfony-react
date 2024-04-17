/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import { useSnackbar } from 'notistack';
import useIntl from 'frontend/js/hooks/useIntl';
import ButtonLink from 'frontend/js/components/ButtonLink';
import useDropzone from 'frontend/js/hooks/useDropzone';
import CheckmarkRoundGreenSvg from 'frontend/images/shared/various/checkmark-round-green.svg';
import RemoveSvg from './img/delete.svg';
import useStyles from './useStyles';

function Card({
  id,
  title,
  placeholder,
  num,
  onChange,
  onDragStart,
  onDrop,
  file,
  isVideo,
  accept,
  maxSize,
  onRemoveFile,
}) {
  const classes = useStyles();
  const intl = useIntl();
  const { enqueueSnackbar } = useSnackbar();
  const [preview, setPreview] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const { getRootProps, getInputProps, isDragActive, openFileDialog } = useDropzone({
    multiple: true,
    isOverwriteFiles: true,
    accept: accept || 'image/png,image/jpg,image/jpeg',
    maxSize: maxSize || 10 * 1024 * 1024,
    onDrop: (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles.length) {
        enqueueSnackbar(
          <>
            {intl.formatMessage({ id: 'form.error.fileUpload.fileFormatOrSizeIsNotSupported' })}{' '}
            {isVideo
              ? intl.formatMessage({ id: 'form.error.fileUpload.videoFormat' })
              : intl.formatMessage({ id: 'form.error.fileUpload.photoFormat' })}
          </>,
          {
            variant: 'error',
          },
        );
      }
      if (acceptedFiles.length) {
        onChange(id, acceptedFiles, isVideo);
      }
    },
  });

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return undefined;
    }

    if (file.s3Url) {
      setPreview(file.s3Url);
    } else {
      setPreview(URL.createObjectURL(file));
      return () => {
        // Make sure to revoke the data uris to avoid memory leaks
        if (preview) {
          URL.revokeObjectURL(preview);
        }
      };
    }
    return undefined;
  }, [file]);

  function handleDragStart(e, key) {
    onDragStart(e, key);
  }

  function handleDragEnd() {
    setIsDragOver(false);
  }

  function handleDragOver(e) {
    e.preventDefault();
    setIsDragOver(true);
  }

  function handleDrop(e, key) {
    e.preventDefault();
    setIsDragOver(false);
    onDrop(e, key);
  }

  function handleRemoveFile(e) {
    e.stopPropagation();
    setPreview(null);
    onChange(id, null, isVideo);
    onRemoveFile(file);
  }

  const dragAndDropProps = !isVideo
    ? {
        onDrop: (e) => handleDrop(e, id),
        onDragLeave: handleDragEnd,
        onDragEnd: handleDragEnd,
        onDragOver: handleDragOver,
        draggable: Boolean(preview),
        onDragStart: (e) => handleDragStart(e, id),
      }
    : {};

  return (
    <div {...dragAndDropProps}>
      <div className={classes.root} {...getRootProps()}>
        <input {...getInputProps()} />
        <div
          className={classnames(
            classes.content,
            (isDragActive || isDragOver) && 'is-drag-active',
            preview && 'has-file',
          )}
          onClick={!preview ? openFileDialog : null}
          onKeyPress={!preview ? openFileDialog : null}
          role="button"
          tabIndex={0}
        >
          <div className={classes.num}>{num}</div>
          <div className={classes.wrap}>
            <svg className={classes.border} viewBox="0 0 247 152" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect
                opacity="0.2"
                x="0.5"
                y="0.5"
                width="246"
                height="151"
                rx="1.5"
                stroke="#2158F5"
                strokeDasharray="1 3"
              />
            </svg>

            <div className={classes.imgWrap}>
              <div className={classes.img} style={{ backgroundImage: `url(${placeholder})` }} />
            </div>
            {preview && (
              <>
                {isVideo ? (
                  // eslint-disable-next-line jsx-a11y/media-has-caption
                  <video src={preview} className={classnames(classes.preview, 'is-video')} controls />
                ) : (
                  <div className={classes.preview} style={{ backgroundImage: `url(${preview})` }} />
                )}
              </>
            )}
          </div>
          <button className={classes.remove} onClick={handleRemoveFile} type="button">
            <img width={20} height={20} src={RemoveSvg} alt="Remove file" />
          </button>
        </div>

        <div className={classes.footer}>
          {preview ? (
            <div className={classes.label}>
              <img
                src={CheckmarkRoundGreenSvg}
                width="12px"
                height="12px"
                alt="Checkmark"
                className={classes.checkmark}
              />{' '}
              {title}
            </div>
          ) : (
            <ButtonLink label={title} onClick={openFileDialog} isDashed className={classes.btn} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;
