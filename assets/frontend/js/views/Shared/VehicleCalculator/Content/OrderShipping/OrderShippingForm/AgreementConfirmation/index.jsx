import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import RouterService from 'frontend/js/api/RouterService';
import Link from 'frontend/js/components/Link';
import useStyles from './useStyles';

function AgreementConfirmation() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <FormattedMessage
        id="shipping.agreement.submit.lsa"
        values={{
          cta: <FormattedMessage id="shipping.orderShipping" />,
          a: (chunks) => (
            <Link href={RouterService.getRoute('lsa', null, true)} isTargetBlank isNofollow>
              {chunks}
            </Link>
          ),
        }}
      />
    </div>
  );
}

export default AgreementConfirmation;
