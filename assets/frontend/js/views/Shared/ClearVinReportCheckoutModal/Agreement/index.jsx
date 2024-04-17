import React from 'react';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import RouterService from 'frontend/js/api/RouterService';
import Link from 'frontend/js/components/Link';
import useStyles from './useStyles';

function Agreement() {
  const classes = useStyles();

  const translationValues = {
    cancellationPolicy: false,
    button: () => null,
    a: (chunks) => (
      <Link href={RouterService.getRoute('terms')} isTargetBlank isNoWrap>
        {chunks}
      </Link>
    ),
  };

  return (
    <div className={classes.root}>
      <FormattedMessage id="checkoutPage.agreement.creditCard" values={translationValues} />
    </div>
  );
}

export default Agreement;
