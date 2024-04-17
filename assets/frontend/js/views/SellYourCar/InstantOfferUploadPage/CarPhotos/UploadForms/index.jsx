/* eslint-disable react/prop-types */
import React, { useState, useEffect, useMemo, useLayoutEffect, useRef } from 'react';
import Slide from '@material-ui/core/Slide';
import { useSnackbar } from 'notistack';
import useIntl from 'frontend/js/hooks/useIntl';
import RouterService from 'frontend/js/api/RouterService';
import ViewportService from 'frontend/js/lib/utils/ViewportService';
import InstantOfferService from 'frontend/js/api/InstantOfferService';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import ButtonLink from 'frontend/js/components/ButtonLink';
import useDropzone from 'frontend/js/hooks/useDropzone';
import Button from 'frontend/js/components/Button';
import ButtonOutlined from 'frontend/js/components/ButtonOutlined';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import cards from './cards';
import Card from './Card';
import useStyles from './useStyles';

function UploadForms({ instantOffer, onSuccess }) {
  const classes = useStyles();
  const intl = useIntl();
  const { enqueueSnackbar } = useSnackbar();
  const { isBelowSm } = useBreakpoint();
  const auctionsRef = useRef();
  const [isUploadMultiplePhotosBtnShown, setIsUploadMultiplePhotosBtnShown] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { FILE_CONTENT_TYPES, CAR_PHOTO_KEYS } = InstantOfferService;
  const MAX_PHOTOS = 10;

  const [filesMap, setFilesMap] = useState(() =>
    Object.values(CAR_PHOTO_KEYS).reduce((acc, cur) => {
      acc[cur] = null;
      return acc;
    }, {}),
  );

  const [videoMap, setVideoMap] = useState({
    'optional-video': null,
  });

  const [currentCardId, setCurrentCardId] = useState(null);

  const photoCount = useMemo(() => Object.values(filesMap).filter(Boolean).length, [filesMap]);

  async function updateFiles() {
    if (photoCount === 0) {
      enqueueSnackbar(intl.formatMessage({ id: 'sellYourCarPage.upload.selectAtLeastOneFile' }), { variant: 'error' });
      return false;
    }

    setIsSubmitted(true);
    try {
      const photoFormData = new FormData();
      let photoFileIndex = 0;
      let photoFileIdIndex = 0;
      Object.keys(filesMap).forEach((key) => {
        if (filesMap[key]) {
          if (filesMap[key] instanceof File) {
            photoFormData.append(key, filesMap[key]);
            photoFormData.append(`instantOfferFileKey_${photoFileIndex}`, key);
            photoFileIndex += 1;
          } else {
            photoFormData.append(`instantOfferFileIdKey_${filesMap[key].id}`, key);
            photoFileIdIndex += 1;
          }
        }
      });

      const videoFormData = new FormData();
      let videoFileIndex = 0;
      Object.keys(videoMap).forEach((key) => {
        if (videoMap[key]) {
          if (videoMap[key] instanceof File) {
            videoFormData.append(`file_${videoFileIndex}`, videoMap[key]);
            videoFileIndex += 1;
          }
        }
      });

      await Promise.all([
        (photoFileIndex > 0 || photoFileIdIndex > 0) &&
          InstantOfferService.updateFiles(instantOffer.ref, instantOffer.hash, FILE_CONTENT_TYPES.PHOTO, photoFormData),
        videoFileIndex > 0 &&
          InstantOfferService.updateFiles(instantOffer.ref, instantOffer.hash, FILE_CONTENT_TYPES.VIDEO, videoFormData),
      ]);

      onSuccess();
    } catch (err) {
      const errors = Object.values(err.response?.data?.errors || {}).join(' ');
      enqueueSnackbar(errors || intl.formatMessage({ id: 'form.error.fileUpload.serverError' }), {
        variant: 'error',
      });
    }
    setIsSubmitted(false);
    return true;
  }

  async function handleRemoveFile(file) {
    if (!file?.s3Url) {
      return false;
    }

    try {
      await InstantOfferService.deleteFile(file.id, instantOffer.hash);
    } catch {
      /* ignore */
    }

    return true;
  }

  function onDragStart(_, id) {
    setCurrentCardId(id);
  }

  function onDrop(_, id) {
    if (currentCardId) {
      setFilesMap((v) => ({
        ...v,
        [id]: v[currentCardId],
        [currentCardId]: v[id],
      }));
      setCurrentCardId(null);
    }
  }

  function addFilesToEmptyKeys(files) {
    const newFilesMap = { ...filesMap };
    let newVideoFile = null;
    const emptyKeys = Object.keys(newFilesMap).filter((key) => !newFilesMap[key]);
    for (let i = 0; i < files.length && i < emptyKeys.length; i++) {
      if (files[i]?.type.includes('video')) {
        newVideoFile = files[i];
      } else {
        newFilesMap[emptyKeys[i]] = files[i];
      }
    }
    const isFileLimitExceeded = files.length > emptyKeys.length;
    if (isFileLimitExceeded) {
      enqueueSnackbar(intl.formatMessage({ id: 'form.error.fileUpload.youHaveUploadedMaximumNumberOfFiles' }), {
        variant: 'info',
      });
    }
    setFilesMap(newFilesMap);

    if (newVideoFile && !videoMap['optional-video']) {
      setVideoMap((v) => ({ ...v, 'optional-video': newVideoFile }));
    }
  }

  function handleChange(id, files, isVideo) {
    if (files?.length > 1) {
      addFilesToEmptyKeys(files);
    } else {
      const [file] = files || [];
      if (isVideo) {
        setVideoMap((v) => ({ ...v, [id]: file }));
      } else {
        setFilesMap((v) => ({ ...v, [id]: file }));
      }
    }
  }

  const { openFileDialog, getRootProps, getInputProps } = useDropzone({
    accept: 'image/png,image/jpg,image/jpeg',
    maxSize: 10 * 1024 * 1024,
    onDrop: (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles.length) {
        enqueueSnackbar(
          <>
            {intl.formatMessage({ id: 'form.error.fileUpload.fileFormatOrSizeIsNotSupported' })}{' '}
            {intl.formatMessage({ id: 'form.error.fileUpload.photoFormat' })}
          </>,
          {
            variant: 'error',
          },
        );
      }
      if (acceptedFiles.length) {
        addFilesToEmptyKeys(acceptedFiles);
        return true;
      }
      return false;
    },
  });

  useEffect(() => {
    const savedFiles =
      instantOffer?.instantOfferFiles?.filter((file) => file.contentType === FILE_CONTENT_TYPES.PHOTO) || [];
    if (savedFiles.length > 0) {
      setFilesMap((v) => {
        const newFiles = { ...v };
        const filesWithoutKey = [];
        savedFiles.forEach((file) => {
          if (file.key) {
            newFiles[file.key] = file;
          } else {
            filesWithoutKey.push(file);
          }
        });

        const emptyKeys = Object.keys(v).filter((key) => !newFiles[key]);

        for (let i = 0; i < filesWithoutKey.length && i < emptyKeys.length; i++) {
          newFiles[emptyKeys[i]] = filesWithoutKey[i];
        }
        return newFiles;
      });
    }

    const savedVideoFile =
      instantOffer?.instantOfferFiles?.filter((file) => file.contentType === FILE_CONTENT_TYPES.VIDEO) || [];
    if (savedVideoFile.length > 0) {
      setVideoMap((v) => ({ ...v, 'optional-video': savedVideoFile[0] }));
    }
  }, [instantOffer?.instantOfferFiles]);

  useLayoutEffect(() => {
    const Observer = ViewportService.createIntersectionObserver({ threshold: 0.2 });
    let handle;

    Observer.observe(auctionsRef.current, (isIntersecting) => {
      window.cancelIdleCallback(handle);

      handle = window.requestIdleCallback(
        () => {
          setIsUploadMultiplePhotosBtnShown(!isIntersecting);
        },
        { timeout: 200 },
      );
    });

    return () => {
      window.cancelIdleCallback(handle);
      Observer.unobserve(auctionsRef.current);
    };
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <div className={classes.title}>
          <FormattedMessage id="sellYourCarPage.uploadedPhotos" values={{ count: photoCount }} />
          {!isBelowSm && (
            <>
              {' '}
              <FormattedMessage
                id="sellYourCarPage.dragDropFilesOrUploadMultiplePhotos"
                values={{
                  a: (chunks) =>
                    photoCount === MAX_PHOTOS ? chunks : <ButtonLink label={chunks} onClick={openFileDialog} />,
                }}
              />
            </>
          )}
          <div {...getRootProps()}>
            <input {...getInputProps()} />
          </div>
        </div>
      </div>
      <div className={classes.cards}>
        {cards.map((card) => (
          <Card
            key={card.id}
            num={card.num}
            onChange={handleChange}
            onRemoveFile={handleRemoveFile}
            onDragStart={onDragStart}
            onDrop={onDrop}
            title={intl.formatMessage({ id: card.titleTranslationKey })}
            id={card.id}
            placeholder={card.placeholder}
            file={card.isVideo ? videoMap[card.id] : filesMap[card.id]}
            isVideo={card.isVideo}
            accept={card.accept}
            maxSize={card.maxSize}
          />
        ))}
      </div>
      <Slide direction="up" in={isUploadMultiplePhotosBtnShown} mountOnEnter unmountOnExit>
        <div className={classes.mobileStickyBtn}>
          <Button
            className={classes.cta}
            color="blue"
            label={intl.formatMessage({ id: 'shared.cta.saveAndContinue' })}
            isLoading={isSubmitted}
            onClick={updateFiles}
            isNowrap
            isInline
          />
        </div>
      </Slide>
      <div className={classes.actions} ref={auctionsRef}>
        <ButtonOutlined
          className={classes.backBtn}
          color="blue"
          label={intl.formatMessage({ id: 'shared.label.back' })}
          href={RouterService.getRoute('sellYourCarOffer', null, false, {
            ref: instantOffer.ref,
            hash: instantOffer.hash,
          })}
          isNowrap
          isInline
          isThinBorder
          isBackgroundTransparent
        />
        <ButtonOutlined
          className={classes.cta}
          color="blue"
          label={intl.formatMessage({ id: 'shared.cta.uploadMultiplePhotos' })}
          onClick={openFileDialog}
          isNowrap
          isThinBorder
          isBackgroundTransparent
          isInline
          isDisabled={photoCount === MAX_PHOTOS}
        />
        <Button
          className={classes.cta}
          color="blue"
          label={intl.formatMessage({ id: 'shared.cta.saveAndContinue' })}
          isLoading={isSubmitted}
          onClick={updateFiles}
          isNowrap
          isInline
        />
      </div>
    </div>
  );
}

export default UploadForms;
