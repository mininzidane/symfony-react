/* eslint-disable react/prop-types */
import React from 'react';
import ButtonLink from 'frontend/js/components/ButtonLink';
import { useSnackbar } from 'notistack';
import { FormattedMessage } from 'react-intl-phraseapp';
import CopyToClipboardBlueSvg from 'frontend/images/shared/various/copy-to-clipboard-blue.svg';
import useStyles from './useStyles';

function CopyBlock({ value, label, style }) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  function handleCopyClick() {
    navigator.clipboard.writeText(value);
    enqueueSnackbar(<FormattedMessage id="shared.label.copied" />, { variant: 'success' });
  }

  return (
    <div className={classes.root} style={style}>
      {label && (
        <div className={classes.label}>
          <span>{label}:</span>
        </div>
      )}
      <ButtonLink label={value} onClick={handleCopyClick} className={classes.value} />
      <button type="button" className={classes.button} onClick={handleCopyClick}>
        <img src={CopyToClipboardBlueSvg} alt="copy" />
      </button>
    </div>
  );
}

export default CopyBlock;
