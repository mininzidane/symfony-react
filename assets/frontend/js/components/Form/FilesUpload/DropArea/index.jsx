import React from 'react';
import PropTypes from 'prop-types';
import useIntl from 'frontend/js/hooks/useIntl';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import IdentityDocument from './IdentityDocument';
import PhotosUpload from './PhotosUpload';
import Invoice from './Invoice';
import ReceiptPhotos from './ReceiptPhotos';
import CarPhotos from './CarPhotos';
import VoidedCheck from './VoidedCheck';
import useStyles from './useStyles';

function DropArea({ className, type, hasFiles, method }) {
  const classes = useStyles();
  const intl = useIntl();

  if (type === 'photoUpload') {
    return (
      <div className={className}>
        <PhotosUpload />
      </div>
    );
  }

  if (type === 'invoice') {
    return (
      <div className={className}>
        <Invoice />
      </div>
    );
  }

  if (type === 'receiptPhotos') {
    return <ReceiptPhotos className={className} hasFiles={hasFiles} method={method} />;
  }

  if (type === 'carPhotos') {
    return (
      <CarPhotos
        className={className}
        hasFiles={hasFiles}
        title={<FormattedMessage id="form.filesUpload.clickTheButtonBelowToAddYourCarPhotos" />}
        ctaLabel={<FormattedMessage id="shared.cta.uploadCarPhotos" />}
      />
    );
  }

  if (type === 'carTitle') {
    return (
      <CarPhotos
        className={className}
        hasFiles={hasFiles}
        title={<FormattedMessage id="form.filesUpload.clickTheButtonBelowToAddCopyOfCarTitle" />}
        ctaLabel={<FormattedMessage id="shared.cta.uploadCarTitle" />}
      />
    );
  }

  if (type === 'voidedCheck') {
    return <VoidedCheck className={className} />;
  }

  return (
    <div className={className}>
      {type === 'identityDocument' ? (
        <IdentityDocument />
      ) : (
        <FormattedMessage
          id="form.filesUpload.dragAndDropFilesHereOrClickHere"
          values={{
            a: (chunks) => <span className={classes.cta}>{chunks}</span>,
          }}
          isWrapped
          className={classes.wrapText}
        />
      )}
      <div className={classes.supportedFiles}>
        {intl.formatMessage(
          { id: 'form.filesUpload.supportedFiles' },
          { types: ['PNG', 'JPG', 'PDF'].join(' / '), sizeLimitMb: 10 },
        )}
      </div>
    </div>
  );
}

DropArea.defaultProps = {
  type: '',
  method: '',
  className: 'className',
  hasFiles: false,
};

DropArea.propTypes = {
  type: PropTypes.string,
  method: PropTypes.string,
  className: PropTypes.string,
  hasFiles: PropTypes.bool,
};

export default DropArea;
