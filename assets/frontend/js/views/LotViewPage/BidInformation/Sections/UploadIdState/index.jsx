import React from 'react';
import PropTypes from 'prop-types';
import useIntl from 'frontend/js/hooks/useIntl';
import ButtonOutlined from 'frontend/js/components/ButtonOutlined';
import Button from 'frontend/js/components/Button';
import FileInput from 'frontend/js/components/Form/FilesInput';
import useLoading from 'frontend/js/hooks/useLoading';
import useServerError from 'frontend/js/hooks/useServerError';
import CardIndentedContent from '../../../LotPageCard/CardIndentedContent';
import NotificationCard from '../../NotificationCard';
import PhotoUploadSvg from '../../../../../../images/shared/various/photo-upload-30x30.svg';
import useStyles from './useStyles';

function UploadIdState({ bidContainerClasses, onSubmit, onSubmitSuccess, onCancel }) {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useLoading(false);
  const { errorMsg, resetError, extractAndSetErrorMsg } = useServerError();
  const intl = useIntl();

  const translationSets = {
    ctaUploadPhotoId: intl.formatMessage({
      id: 'shared.cta.uploadPhotoId',
      defaultMessage: 'Upload Photo ID',
    }),
    ctaCancel: intl.formatMessage({
      id: 'shared.cta.cancel',
      defaultMessage: 'Cancel',
    }),
    contentHeader: intl.formatMessage({
      id: 'lotPage.bidInformation.uploadIdContentHeader',
      defaultMessage: `Please submit a copy of your government issued photo ID such as a valid driver's license or passport.`,
    }),
    contentBody: intl.formatMessage({
      id: 'lotPage.bidInformation.uploadIdContentBody',
      defaultMessage: `Take a photo or scan Government Issues Photo ID and upload it here. Supported files up to 10MB: .PDF, .JPEG, .PNG`,
    }),
  };

  async function handleFileUpload(files) {
    setIsLoading(true);
    resetError();

    try {
      const { customer } = await onSubmit(files);
      onSubmitSuccess(customer);
    } catch (error) {
      extractAndSetErrorMsg(error);
    }

    setIsLoading(false);
  }

  return (
    <div className={bidContainerClasses}>
      <NotificationCard
        title={translationSets.ctaUploadPhotoId}
        content={
          <>
            {errorMsg && <div className="text-red">{errorMsg}</div>}
            <div>{translationSets.contentHeader}</div>
          </>
        }
      />

      <CardIndentedContent>
        <CardIndentedContent className={classes.card}>
          <div className={classes.actions}>
            <ButtonOutlined
              className={classes.btn}
              label={translationSets.ctaCancel}
              onClick={onCancel}
              isBackgroundWhite
            />

            <Button
              className={classes.btn}
              label={
                <>
                  {translationSets.ctaUploadPhotoId}
                  <FileInput
                    name="photoId"
                    onChange={handleFileUpload}
                    isInButton
                    accept="application/pdf,application/x-pdf,image/jpeg,image/pjpeg,image/png"
                    multiple={false}
                  />
                </>
              }
              isLoading={isLoading}
            />
          </div>
        </CardIndentedContent>
      </CardIndentedContent>

      <div className="card-content__container bid-information__upload-id-description">
        <img src={PhotoUploadSvg} width={30} height={30} alt={translationSets.ctaUploadPhotoId} />
        <div>{translationSets.contentBody}</div>
      </div>
    </div>
  );
}

UploadIdState.propTypes = {
  bidContainerClasses: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onSubmitSuccess: PropTypes.func,
  onCancel: PropTypes.func.isRequired,
};

UploadIdState.defaultProps = {
  onSubmitSuccess: () => null,
};

export default UploadIdState;
