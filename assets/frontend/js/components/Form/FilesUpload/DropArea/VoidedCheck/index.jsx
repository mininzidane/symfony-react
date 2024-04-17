import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl-phraseapp';
import CloudUploadSvg from './img/ic_upload.svg';
import useStyles from './useStyles';

function VoidedCheck({ className }) {
  const classes = useStyles();

  return (
    <div className={className}>
      <div className={classes.title}>
        <img src={CloudUploadSvg} alt="upload file" />
        <span>
          <FormattedMessage
            id="form.filesUpload.dragFilesToAttachOrBrowse"
            values={{
              a: (chunks) => <span className={classes.browseCta}>{chunks}</span>,
            }}
          />
        </span>
      </div>
      <div className={classes.subtitle}>
        <FormattedMessage id="form.filesUpload.voidedCheck.text" />
      </div>
      <div className={classes.desc}>
        <FormattedMessage
          id="form.filesUpload.supportedFilesVer2"
          values={{ types: ['PNG', 'JPG', 'PDF'].join(', '), sizeLimitMb: 10 }}
        />
      </div>
    </div>
  );
}

VoidedCheck.defaultProps = {
  className: '',
};

VoidedCheck.propTypes = {
  className: PropTypes.string,
};

export default VoidedCheck;
