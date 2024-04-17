/* eslint-disable react/prop-types */
import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import RouterService from 'frontend/js/api/RouterService';
import DownloadButton from 'frontend/js/views/Shared/DownloadButton';
import useStyles from '../useStyles';

function DownloadButtons() {
  const classes = useStyles();

  const buttonsParams = {
    classes: { label: classes.buttonLabel },
    className: classes.button,
    isBackgroundTransparent: true,
    isInline: true,
    isThinBorder: true,
    isRegularCase: true,
    isTargetBlank: true,
  };

  return (
    <>
      <DownloadButton
        href={RouterService.getRoute('bosDownload')}
        label={<FormattedMessage id="shared.label.bos" />}
        {...buttonsParams}
      />

      <DownloadButton
        href={RouterService.getRoute('bolDownload')}
        label={<FormattedMessage id="shared.label.bol" />}
        {...buttonsParams}
      />

      <DownloadButton
        href={RouterService.getRoute('reportDownload')}
        label={<FormattedMessage id="shared.label.report" />}
        {...buttonsParams}
      />
    </>
  );
}

export default DownloadButtons;
