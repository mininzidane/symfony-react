import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';

import creditCards from 'frontend/images/shared/partners/cards-transparent.png';
import norton from 'frontend/images/shared/partners/norton-white.png';
import userTrusts from 'frontend/images/shared/partners/user-trusts.png';
import useStyles from './useStyles';

const Trusted = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <FormattedMessage id="membershipPlans.trustedSatisfiedCustomers" />
      </div>
      <div className={classes.cards}>
        <div className={classes.card}>
          <img width="58" height="53" src={userTrusts} alt="Trusted" />
        </div>
        <div className={classes.card}>
          <img width="90" height="53" src={norton} alt="Norton" />
        </div>
        <div className={classes.card}>
          <img width="137" height="42" src={creditCards} alt="Credit Cards" />
        </div>
      </div>
    </div>
  );
};

export default Trusted;
