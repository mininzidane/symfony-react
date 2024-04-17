import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import Container from 'frontend/js/components/Container';
import Terms from './Terms';
import useStyles from './useStyles';

function PrivacyPolicyPage() {
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <div className={classes.contentWrap}>
        <div className={classes.content}>
          <h1 className={classes.title}>
            <FormattedMessage id="termsPage.privacyPolicy" />
          </h1>
          <Terms />
        </div>
      </div>
    </Container>
  );
}

export default PrivacyPolicyPage;
