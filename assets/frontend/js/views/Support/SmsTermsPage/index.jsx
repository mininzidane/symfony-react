import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import Container from 'frontend/js/components/Container';
import useStyles from './useStyles';
import Terms from './Terms';

function SmsTermsPage() {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <div className={classes.contentWrap}>
        <div className={classes.content}>
          <h1 className={classes.title}>
            <FormattedMessage id="smsTermsPage.title" />
          </h1>
          <Terms />
        </div>
      </div>
    </Container>
  );
}

export default SmsTermsPage;
