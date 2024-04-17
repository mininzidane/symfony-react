import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import Container from 'frontend/js/components/Container';
import BootstrapService from 'frontend/js/api/BootstrapService';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';

import Terms from './Terms';
import Actions from './Actions';
import useStyles from './useStyles';

function TermsPage() {
  const { acceptedTermsVersion, isAuthenticated } = useCustomerHelper();
  const termsVersion = BootstrapService.getAppValue('termsVersion', '');
  const hasAcceptTermsForm = isAuthenticated && acceptedTermsVersion !== termsVersion;

  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <div className={classes.contentWrap}>
        <div className={classes.content}>
          <h1 className={classes.title}>
            <FormattedMessage id="termsPage.title" />
          </h1>
          <Terms className={hasAcceptTermsForm ? classes.scrollableContent : null} />
          {hasAcceptTermsForm && <Actions termsVersion={termsVersion} />}
        </div>
      </div>
    </Container>
  );
}

export default TermsPage;
