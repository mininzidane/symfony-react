import React from 'react';
import Button from 'frontend/js/components/Button';
import { FormattedMessage } from 'react-intl-phraseapp';
import useStyles from './useStyles';

function TitleWithButton() {
  const classes = useStyles();

  return (
    <div>
      <div>
        <div className={classes.title}>
          <FormattedMessage id="form.filesUpload.dragAndDrop" />
        </div>

        <div className={classes.subtitle}>
          <FormattedMessage id="form.filesUpload.aPhotoOrScanOfYourReceipt" />
        </div>
      </div>

      <Button label={<FormattedMessage id="shared.cta.uploadReceipt" />} className={classes.button} />

      <div className={classes.desc}>
        <FormattedMessage
          id="form.filesUpload.supportedFilesVer2"
          values={({ id: 'form.filesUpload.supportedFiles' }, { types: ['PNG', 'JPG'].join(', '), sizeLimitMb: 10 })}
        />
      </div>
    </div>
  );
}

export default TitleWithButton;
