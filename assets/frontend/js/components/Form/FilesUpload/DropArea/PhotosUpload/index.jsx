import React from 'react';
import classnames from 'classnames';
import useIntl from 'frontend/js/hooks/useIntl';
import { FormattedMessage } from 'react-intl-phraseapp';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import ImagePlaceholderSvg from './img/image-placeholder.svg';
import useStyles from './useStyles';

function PhotosUpload() {
  const classes = useStyles();
  const { isBelowSm } = useBreakpoint();
  const intl = useIntl();

  return (
    <div className={classes.root}>
      <img src={ImagePlaceholderSvg} alt="Identity Document" className={classes.icon} />
      <div>
        <div className={classnames(classes.title, { [classes.cta]: isBelowSm })}>
          <FormattedMessage id="form.filesUpload.clickToUpload" />
        </div>
        <div className={classes.supportedFiles}>
          {intl.formatMessage(
            { id: 'form.filesUpload.supportedFiles' },
            { types: ['PNG', 'JPG', 'PDF'].join(' / '), sizeLimitMb: 10 },
          )}
        </div>
      </div>
    </div>
  );
}

export default PhotosUpload;
