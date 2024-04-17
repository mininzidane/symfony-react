/* eslint-disable no-console */
import React, { useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import CustomerService from 'frontend/js/api/CustomerService';
import Container from 'frontend/js/components/Container';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import PhoneLink from 'frontend/js/components/PhoneLink';
import CompanyService from 'frontend/js/api/CompanyService';
import RouterService from 'frontend/js/api/RouterService';
import useEventListener from 'frontend/js/hooks/useEventListener';
import SpinnerWheel from 'frontend/js/components/SpinnerWheel';
import ViewportService from 'frontend/js/lib/utils/ViewportService';
import Caption from './Caption';
import CookieInfoMobile from './CookieInfoMobile';
import CookieInfoDesktop from './CookieInfoDesktop';
import useStyles from './useStyles';

function DocumentSignPage() {
  const classes = useStyles();
  const { token } = useParams();
  const [isCookiesSupported, setIsCookiesSupported] = useState(true);
  const isMobile = ViewportService.isMobile();

  const { isLoading, data } = useQuery(['sign_document', token], () => CustomerService.getSignDocumentUrl(token));
  const iframeUrl = data?.iframeUrl;

  const { email, officePhone } = CompanyService;

  function receiveMessage(evt) {
    if (evt.data === 'MM:3PCunsupported') {
      console.log('third party cookies are not supported');
      setIsCookiesSupported(false);
    } else if (evt.data === 'MM:3PCsupported') {
      console.log('third party cookies are supported');
    }
  }

  useEventListener('message', receiveMessage);

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

  if (!iframeUrl) {
    return <Redirect to={RouterService.getRoute('documents')} />;
  }

  return (
    <div>
      <Caption />
      <Container className={classes.root}>
        <iframe
          title="3rdpartycookiecheck"
          src="https://mindmup.github.io/3rdpartycookiecheck/start.html"
          style={{ display: 'none' }}
        />

        {isCookiesSupported ? (
          <div>
            <h1 className={classes.title}>
              <FormattedMessage id="documentSignPage.title" />
            </h1>

            <div className={classes.signIframeWrap}>
              <iframe title="sign-iframe" id="sign-iframe" frameBorder="0" src={iframeUrl} />
            </div>
          </div>
        ) : (
          <div className={classes.cookiesWrap}>
            <div className={classes.warning}>
              <strong>
                <FormattedMessage id="documentSignPage.warningTitle" />
              </strong>
              <div className={classes.warningText}>
                <FormattedMessage
                  id="documentSignPage.warningText"
                  values={{
                    a: (chunks) => (
                      <a href={RouterService.getRoute('documentDownload', null, null, { token })}>{chunks}</a>
                    ),
                    email: <a href={email.href}>{email.raw}</a>,
                    phone: <PhoneLink phone={officePhone.formatted} className={classes.phone} />,
                  }}
                />
              </div>
            </div>

            {isMobile ? <CookieInfoMobile /> : <CookieInfoDesktop />}
          </div>
        )}
      </Container>
    </div>
  );
}

export default DocumentSignPage;
