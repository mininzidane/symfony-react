/* eslint-disable react/prop-types */
import React from 'react';
import RouterService from 'frontend/js/api/RouterService';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import Link from 'frontend/js/components/Link';
import CheckmarkGreenSvg from 'frontend/images/shared/various/checkmark-green.svg';
import useStyles from './useStyles';

function TermsAgreement({ ctaLabel }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.checkmarkContainer}>
        <img width={11} height={11} src={CheckmarkGreenSvg} alt="checkmark" />
      </div>

      <FormattedMessage
        id="shared.access.clickAgreement"
        className={classes.agreement}
        values={{
          cta: ctaLabel.toUpperCase(),
          a: (chunks) => (
            <Link href={RouterService.getRoute('terms')} className={classes.terms} isTargetBlank isNoWrap>
              {chunks}
            </Link>
          ),
          br: ' ',
        }}
      />
    </div>
  );
}

export default TermsAgreement;
