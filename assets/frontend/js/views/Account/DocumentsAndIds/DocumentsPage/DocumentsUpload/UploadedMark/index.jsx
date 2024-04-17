import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import useStyles from './useStyles';
import CheckmarkSvg from './img/checkmark.svg';

function UploadedMark() {
  const classes = useStyles();
  const { isAboveSm } = useBreakpoint();

  return (
    <div className={classes.root}>
      <div>{isAboveSm && <FormattedMessage id="shared.label.uploaded" />}</div>
      <img src={CheckmarkSvg} alt="Checkmark" />
    </div>
  );
}

export default UploadedMark;
