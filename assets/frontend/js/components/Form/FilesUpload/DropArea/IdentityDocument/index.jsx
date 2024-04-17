import React from 'react';
import classnames from 'classnames';
import { FormattedMessage } from 'react-intl-phraseapp';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import IdentityDocumentSvg from './img/identity-document.svg';
import useStyles from './useStyles';

function IdentityDocument() {
  const classes = useStyles();
  const { isBelowSm } = useBreakpoint();

  return (
    <>
      <img src={IdentityDocumentSvg} alt="Identity Document" className={classes.icon} />
      <div className={classnames(classes.title, { [classes.cta]: isBelowSm })}>
        {isBelowSm ? (
          <FormattedMessage id="form.filesUpload.clickToUpload" />
        ) : (
          <FormattedMessage id="form.filesUpload.dragAndDrop" />
        )}
      </div>
      <div className={classes.subTitle}>
        {isBelowSm ? (
          <FormattedMessage id="form.filesUpload.governmentIssuedPhotoId" />
        ) : (
          <>
            <FormattedMessage
              id="form.filesUpload.governmentIssuedPhotoIdOrClick"
              values={{ cta: (chunks) => <span className={classes.cta}>{chunks}</span> }}
            />
          </>
        )}
      </div>
    </>
  );
}

export default IdentityDocument;
