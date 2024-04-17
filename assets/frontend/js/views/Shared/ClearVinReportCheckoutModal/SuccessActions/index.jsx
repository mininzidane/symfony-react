/* eslint-disable react/prop-types */
import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import DownloadButton from 'frontend/js/views/Shared/DownloadButton';
import ModalWindowContainer from 'frontend/js/components/ModalWindow/Container';
import ViewButton from 'frontend/js/views/Shared/ViewButton';
import useStyles from './useStyles';

function SuccessAction({ downloadUrl, onViewClick, report }) {
  const classes = useStyles();

  return (
    <ModalWindowContainer className={classes.root}>
      <DownloadButton
        href={downloadUrl}
        label={<FormattedMessage id="shared.cta.download" />}
        isBackgroundTransparent
        isThinBorder
      />

      {report && <ViewButton label={<FormattedMessage id="shared.cta.view" />} onClick={onViewClick} isRegularCase />}
    </ModalWindowContainer>
  );
}

export default SuccessAction;
