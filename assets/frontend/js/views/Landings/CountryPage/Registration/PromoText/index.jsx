/* eslint-disable react/prop-types */
import React from 'react';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import useStyles from './useStyles';

function PromoText({ country }) {
  const classes = useStyles();

  return (
    <div>
      <h1 className={classes.title}>
        <FormattedMessage id="countryLandingPage.title" values={{ country }} />
      </h1>
      <p className={classes.subtitle}>
        <FormattedMessage id="countryLandingPage.subtitle" />
      </p>
    </div>
  );
}

export default PromoText;
