/* eslint-disable react/prop-types */
import React from 'react';
import classnames from 'classnames';
import AlertSignSvg from 'frontend/images/shared/various/alert-sign-20x20.svg';
import CheckmarkRoundGreenSvg from 'frontend/images/shared/various/checkmark-round-green.svg';
import Button from 'frontend/js/components/Button';
import ButtonLink from 'frontend/js/components/ButtonLink';
import RouterService from 'frontend/js/api/RouterService';
import useIntl from 'frontend/js/hooks/useIntl';
import UploadSvg from './img/upload.svg';
import useStyles from './useStyles';

function UploadCard({ label, contentType, instantOfferRef, hash, isAccepted }) {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <div className={classnames(classes.root, isAccepted && 'is-accepted')}>
      <div className={classes.label}>
        <img
          className={classes.icon}
          src={isAccepted ? CheckmarkRoundGreenSvg : AlertSignSvg}
          alt="Checkmark"
          width={18}
          height={18}
        />
        <div>{label}</div>
      </div>
      {isAccepted ? (
        <div>
          <span className="fw-7">{intl.formatMessage({ id: 'shared.label.accepted' })}</span>{' '}
          <span className="ws-n">
            (
            <ButtonLink
              label={intl.formatMessage({ id: 'shared.cta.edit' })}
              href={RouterService.getRoute('sellYourCarUpload', null, false, {
                ref: instantOfferRef,
                hash,
                contentType,
              })}
            />
            )
          </span>
        </div>
      ) : (
        <Button
          color="blue"
          isInline
          className={classes.button}
          href={RouterService.getRoute('sellYourCarUpload', null, false, {
            ref: instantOfferRef,
            hash,
            contentType,
          })}
          label={
            <div className={classes.buttonContent}>
              <img src={UploadSvg} alt="icon" style={{ marginRight: 6 }} />
              <div>{intl.formatMessage({ id: 'shared.cta.upload' })}</div>
            </div>
          }
          size="sm"
        />
      )}
    </div>
  );
}

UploadCard.propTypes = {};

export default UploadCard;
