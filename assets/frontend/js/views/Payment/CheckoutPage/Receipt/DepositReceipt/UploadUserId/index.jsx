import React from 'react';
import PropTypes from 'prop-types';
import useIntl from 'frontend/js/hooks/useIntl';
import Button from 'frontend/js/components/Button';
import FileInput from 'frontend/js/components/Form/FilesInput';
import PhotoUploadSvg from 'frontend/images/shared/various/photo-upload-30x30.svg';
import useUploadUserId from './useUploadUserId';
import PassportPng from './img/passport.png';
import ArrowSvg from './img/arrow.svg';
import useStyles from './useStyles';

function UploadUserId({ className, customerId, onSubmitSuccess }) {
  const classes = useStyles();
  const intl = useIntl();
  const { isLoading, handleFileUpload, errorMsg } = useUploadUserId({ customerId, onSubmitSuccess });

  const translationSets = {
    uploadPhotoId: intl.formatMessage({ id: 'shared.cta.uploadPhotoId' }),
    uploadIdContentFooter: intl.formatMessage({ id: 'receiptPage.uploadIdContentFooter' }),
    uploadIdContentHeader: intl.formatMessage({ id: 'receiptPage.uploadIdContentHeader' }, { br: <br /> }),
  };

  return (
    <div className={className}>
      <div className={classes.header}>
        <img src={ArrowSvg} alt="" className={classes.arrow} />
        <div className={classes.info}>{translationSets.uploadIdContentHeader}</div>
        <img src={PassportPng} alt="ID" className={classes.passport} />
      </div>
      <Button
        label={
          <>
            {translationSets.uploadPhotoId}
            <FileInput
              name="photoId"
              onChange={handleFileUpload}
              isInButton
              accept="application/pdf,application/x-pdf,image/jpeg,image/pjpeg,image/png"
              multiple={false}
            />
          </>
        }
        style={{ position: 'relative' }}
        isLoading={isLoading}
        size="lg"
      />
      {errorMsg && <div className="text-red text-xs mt-5">{errorMsg}</div>}
      <div className={classes.footer}>
        <img src={PhotoUploadSvg} width={30} height={30} alt={translationSets.uploadPhotoId} />
        <div>{translationSets.uploadIdContentFooter}</div>
      </div>
    </div>
  );
}

UploadUserId.defaultProps = {
  className: '',
  onSubmitSuccess: () => {},
};

UploadUserId.propTypes = {
  customerId: PropTypes.number.isRequired,
  className: PropTypes.string,
  onSubmitSuccess: PropTypes.func,
};

export default UploadUserId;
