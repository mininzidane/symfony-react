/* eslint-disable react/prop-types */
import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import useContactPhone from 'frontend/js/hooks/useContactPhone';
import useStyles from './useStyles';

function CallRequiredBanner() {
  const phoneNumber = useContactPhone();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.callUs}>
        <FormattedMessage
          id="vehicleCalculator.pleaseCallUs"
          values={{
            phoneLink: <a href={`tel:${phoneNumber}`}>{phoneNumber}</a>,
            strong: (chunks) => <strong>{chunks}</strong>,
          }}
        />
      </div>
    </div>
  );
}

export default CallRequiredBanner;
