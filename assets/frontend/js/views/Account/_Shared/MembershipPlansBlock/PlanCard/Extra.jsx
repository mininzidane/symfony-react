import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import OneLineText from 'frontend/js/components/OneLineText';

import useStyles from './useStyles';

const Extra = () => {
  const classes = useStyles();

  return (
    <div className={classes.extra}>
      <div>
        <OneLineText
          value={
            <FormattedMessage
              id="membershipPlans.card.extra"
              values={{
                strong: (chunks) => <strong>{chunks}</strong>,
              }}
            />
          }
        />
      </div>
    </div>
  );
};

export default Extra;
