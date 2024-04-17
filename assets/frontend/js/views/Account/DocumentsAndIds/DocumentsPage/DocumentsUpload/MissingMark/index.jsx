import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import AlertSvg from 'frontend/images/shared/various/alert-sign-20x20.svg';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import useStyles from './useStyles';

function MissingMark() {
  const classes = useStyles();
  const { isAboveSm } = useBreakpoint();

  return (
    <div className={classes.root}>
      <div>{isAboveSm && <FormattedMessage id="shared.label.missing" />}</div>
      <img src={AlertSvg} alt="Alert mark" />
    </div>
  );
}

export default MissingMark;
