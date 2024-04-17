import React from 'react';
import PropTypes from 'prop-types';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import ButtonLink from 'frontend/js/components/ButtonLink';
import DocumentsSvg from './img/ic_documents.svg';
import useStyles from './useStyles';

function DocumentsStatus({ title, isAuthorized }) {
  const classes = useStyles();

  function handleAuthClick(tab) {
    window.dispatchEvent(new CustomEvent('openAuthModal', { detail: { tab } }));
  }

  return (
    <div className={classes.root}>
      <img src={DocumentsSvg} alt="No documents" width="38" />
      <div className={classes.title}>
        {isAuthorized ? (
          title
        ) : (
          <>
            <div>
              <FormattedMessage
                id="trackingPage.documents.pleaseSignInOrRegister"
                values={{
                  SignIn: (chunks) => <ButtonLink label={chunks} onClick={() => handleAuthClick('signIn')} />,
                  Register: (chunks) => <ButtonLink onClick={() => handleAuthClick('register')} label={chunks} />,
                }}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

DocumentsStatus.propTypes = {
  title: PropTypes.node.isRequired,
  isAuthorized: PropTypes.bool.isRequired,
};

export default DocumentsStatus;
