/* eslint-disable no-console */
import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { Redirect, useParams } from 'react-router-dom';
import RouterService from 'frontend/js/api/RouterService';
import GoogleAnalyticsService from 'frontend/js/api/GoogleAnalyticsService';
import Container from 'frontend/js/components/Container';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import Button from 'frontend/js/components/Button';
import ButtonText from 'frontend/js/components/ButtonText';
import CustomerService from 'frontend/js/api/CustomerService';
import SpinnerWheel from 'frontend/js/components/SpinnerWheel';
import Caption from './Caption';
import useStyles from './useStyles';

function DocumentStatusPage() {
  const classes = useStyles();
  const { token } = useParams();
  const { isLoading, data } = useQuery(['document_status', token], () => CustomerService.getDocumentStatus(token));
  const { isSigned, bosPath } = data || {};

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (isSigned) {
      const ga = new GoogleAnalyticsService();
      ga.sendEvent('sign_online', 'bill_of_sale', 'finish');
    }
  }, [isLoading]);

  if (isLoading) {
    return (
      <div>
        <Caption />
        <div className="pos-r strut">
          <SpinnerWheel isCentered size={40} thickness={3} />
        </div>
      </div>
    );
  }

  if (isSigned === undefined) {
    return <Redirect to={RouterService.getRoute('documents')} />;
  }

  return (
    <div>
      <Caption />
      <Container className={classes.root}>
        {isSigned ? (
          <div>
            <h1 className={classes.title}>
              <FormattedMessage id="documentStatusPage.title.isSigned" />
            </h1>

            <div className={classes.text}>
              <FormattedMessage
                id="documentStatusPage.successText"
                values={{
                  a: (chunks) => <a href={bosPath}>{chunks}</a>,
                }}
              />
            </div>

            <div className={classes.buttons}>
              <Button
                label={<FormattedMessage id="documentStatusPage.downloadPurchaseAgreement" />}
                href={bosPath}
                size="lg"
                isInline
              />
              <ButtonText
                label={<FormattedMessage id="documentStatusPage.backToDocuments" />}
                href={RouterService.getRoute('documents')}
                size="lg"
              />
            </div>
          </div>
        ) : (
          <div>
            <h1 className={classes.title}>
              <FormattedMessage id="documentStatusPage.failureTitle" />
            </h1>

            <div className={classes.text}>
              <FormattedMessage
                id="documentStatusPage.failureText"
                values={{
                  documents: (chunks) => <a href={RouterService.getRoute('documents')}>{chunks}</a>,
                  support: (chunks) => <a href={RouterService.getRoute('contactUs')}>{chunks}</a>,
                }}
              />
            </div>

            <div className={classes.buttons}>
              <Button
                label={<FormattedMessage id="documentStatusPage.tryAgain" />}
                href={RouterService.getRoute('documents')}
                size="lg"
                isInline
              />
              <ButtonText
                label={<FormattedMessage id="documentStatusPage.backToDocuments" />}
                href={RouterService.getRoute('documents')}
                size="lg"
              />
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}

export default DocumentStatusPage;
