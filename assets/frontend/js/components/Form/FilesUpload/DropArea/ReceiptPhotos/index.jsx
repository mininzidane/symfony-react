import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import Button from 'frontend/js/components/Button';
import { FormattedMessage } from 'react-intl-phraseapp';
import OrSeparator from './OrSeparator';
import PhotoSvg from './img/ic_photo.svg';
import useStyles from './useStyles';

function ReceiptPhotos({ hasFiles, className, method }) {
  const classes = useStyles();
  const { isBelowSm } = useBreakpoint();

  return (
    <div className={classnames(className, classes.root, hasFiles && 'has-files')}>
      <div className={classnames(classes.content)}>
        {hasFiles ? (
          <>
            <div className={classes.stepLabel} style={{ marginTop: 0, height: 104 }}>
              <img src={PhotoSvg} className={classes.img} alt="Memo" /> <FormattedMessage id="shared.label.step" /> 3
            </div>

            <div className={classes.uploadMore}>
              + <FormattedMessage id="shared.cta.uploadMore" />
            </div>
          </>
        ) : (
          <>
            <div className={classes.stepLabel}>
              <img src={PhotoSvg} className={classes.img} alt="Memo" /> <FormattedMessage id="shared.label.step" /> 3
            </div>

            {!isBelowSm && (
              <>
                <div className={classes.title}>
                  <FormattedMessage id="checkoutPage.paymentMethods.guide.form.text1" values={{ method }} />
                </div>
                <OrSeparator />
              </>
            )}

            <Button
              label={<FormattedMessage id="checkoutPage.paymentMethods.uploadReceiptCta" values={{ method }} />}
              className={classes.button}
            />

            <div className={classes.desc}>
              <FormattedMessage
                id="form.filesUpload.supportedFilesVer2"
                values={
                  ({ id: 'form.filesUpload.supportedFiles' },
                  { types: ['PNG', 'JPG', 'PDF'].join(', '), sizeLimitMb: 10 })
                }
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

ReceiptPhotos.defaultProps = {
  hasFiles: false,
  className: '',
  method: '',
};

ReceiptPhotos.propTypes = {
  hasFiles: PropTypes.bool,
  className: PropTypes.string,
  method: PropTypes.string,
};

export default ReceiptPhotos;
