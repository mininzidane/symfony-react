import React from 'react';
import CountryService from 'frontend/js/api/CountryService';
import BootstrapService from 'frontend/js/api/BootstrapService';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import Link from 'frontend/js/components/Link';
import useStyles from './useStyles';

function Description() {
  const classes = useStyles();

  const textNumber = BootstrapService.getAppValue('textNumber');
  const textShortCode = BootstrapService.getAppValue('textShortCode');
  const assistNumber = CountryService.isUsa() ? textShortCode || textNumber : textNumber;

  return (
    <div className={classes.description}>
      <FormattedMessage
        id="auctionsTextAlert.description"
        values={{
          assistNumber,
          TermsLink: (chunks) => (
            <Link routeParams={['terms']} key="terms-link" isTargetBlank>
              {chunks}
            </Link>
          ),
          PrivacyLink: (chunks) => (
            <Link routeParams={['privacy']} key="rules-link" isTargetBlank>
              {chunks}
            </Link>
          ),
        }}
      />
    </div>
  );
}

export default Description;
