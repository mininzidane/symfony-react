import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import SupportIconSvg from './img/support-icon.svg';
import useStyles from './useStyles';

function SuccessView() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img src={SupportIconSvg} width={65} alt="support" />

      <div className={classes.title}>
        <FormattedMessage id="landings.loungeOperatorRecruitmentPage.leadForm.success.title" />
      </div>
      <div className={classes.subtitle}>
        <FormattedMessage id="landings.loungeOperatorRecruitmentPage.leadForm.success.subtitle" />
      </div>
    </div>
  );
}
export default SuccessView;
