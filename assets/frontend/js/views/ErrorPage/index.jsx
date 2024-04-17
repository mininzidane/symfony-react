import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { FormattedMessage } from 'react-intl-phraseapp';
import Button from 'frontend/js/components/Button';
import RouterService from 'frontend/js/api/RouterService';
import ThemeProvider from 'frontend/js/providers/ThemeProvider';
import TranslationProvider from 'frontend/js/providers/TranslationProvider';
import PiggySvg from './img/piggy.svg';
import useStyles from './useStyles';

function ErrorPage({ errorCode, message }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <img className={classes.image} src={PiggySvg} alt="Error :(" />

        <h1 className={classes.title}>
          {!errorCode && <FormattedMessage id="errorPage.anErrorOccurred" />}
          {errorCode === '404' && <FormattedMessage id="errorPage.somethingWentWrong" />}
          {errorCode === '403' && <FormattedMessage id="errorPage.pageIsNotAvailable" />}
          {errorCode === '500' && <FormattedMessage id="errorPage.anErrorOccurred" />}
        </h1>

        <p className={classes.description}>
          {(!errorCode || errorCode === '404') && <FormattedMessage id="errorPage.pageCantBeFound" />}
          {errorCode === '404' && message}
          {errorCode === '500' && <FormattedMessage id="errorPage.somethingWentWrong" />}
        </p>

        <Button
          href={RouterService.getRoute('helpCenter', null, true)}
          className={classes.button}
          label={<FormattedMessage id="shared.cta.contactSupport" />}
          size="lg"
        />
      </div>
    </div>
  );
}

ErrorPage.propTypes = {
  errorCode: PropTypes.string,
  message: PropTypes.string,
};

ErrorPage.defaultProps = {
  errorCode: '',
  message: '',
};

const $el = document.getElementById('error-page');

if ($el) {
  const errorCode = $el.getAttribute('data-error-code');
  const message = $el.getAttribute('data-message');

  ReactDOM.render(
    <ThemeProvider>
      <TranslationProvider>
        <ErrorPage errorCode={errorCode} message={message} />
      </TranslationProvider>
    </ThemeProvider>,
    $el,
  );
}

export default ErrorPage;
