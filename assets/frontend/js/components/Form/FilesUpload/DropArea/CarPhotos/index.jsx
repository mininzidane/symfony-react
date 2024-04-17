import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import Button from 'frontend/js/components/Button';
import ButtonOutlined from 'frontend/js/components/ButtonOutlined';
import { FormattedMessage } from 'react-intl-phraseapp';
import useStyles from './useStyles';

function CarPhotos({ hasFiles, className, title, ctaLabel }) {
  const classes = useStyles();
  const { isBelowSm } = useBreakpoint();

  return (
    <div className={classnames(className, classes.root, hasFiles && 'is-compact')}>
      <div className={classnames(classes.content)}>
        <div>
          {isBelowSm ? (
            <div className={classes.title}>{title}</div>
          ) : (
            <>
              <div className={classes.title}>
                <FormattedMessage id="form.filesUpload.dragAndDropPhotos" />
              </div>

              <div className={classes.subtitle}>
                <FormattedMessage id="form.filesUpload.orClickTheButtonBelowToBrowse" />
              </div>
            </>
          )}
        </div>
        {hasFiles ? (
          <ButtonOutlined label={ctaLabel} isThinBorder isBackgroundWhite className={classes.button} />
        ) : (
          <Button label={ctaLabel} className={classes.button} />
        )}

        <div className={classes.desc}>
          <FormattedMessage
            id="form.filesUpload.supportedFilesVer2"
            values={({ id: 'form.filesUpload.supportedFiles' }, { types: ['PNG', 'JPG'].join(', '), sizeLimitMb: 10 })}
          />
        </div>
      </div>
    </div>
  );
}

CarPhotos.defaultProps = {
  hasFiles: false,
  className: '',
};

CarPhotos.propTypes = {
  title: PropTypes.node.isRequired,
  ctaLabel: PropTypes.node.isRequired,
  hasFiles: PropTypes.bool,
  className: PropTypes.string,
};

export default CarPhotos;
