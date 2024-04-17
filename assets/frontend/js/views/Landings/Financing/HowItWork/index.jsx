import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import Container from 'frontend/js/components/Container';

import useStyles from './useStyles';

function HowItWork() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container>
        <div className={classes.title}>
          <FormattedMessage id="landings.financing.howItWork.title" />
        </div>
        <div className={classes.content}>
          <div className={classes.line}>
            <div className={classes.cell}>
              <FormattedMessage id="landings.financing.howItWork.item1" />
            </div>
            <div className={classes.cell}>
              <FormattedMessage id="landings.financing.howItWork.item2" />
            </div>
          </div>
          <div className={classes.line}>
            <div className={classes.cell}>
              <FormattedMessage id="landings.financing.howItWork.item3" />
            </div>
            <div className={classes.cell}>
              <FormattedMessage id="landings.financing.howItWork.item4" />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default HowItWork;
