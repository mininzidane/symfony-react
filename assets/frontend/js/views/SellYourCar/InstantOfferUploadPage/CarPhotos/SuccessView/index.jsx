/* eslint-disable react/prop-types */
import React from 'react';
import CheckmarkRoundGreenSvg from 'frontend/images/shared/various/checkmark-round-green.svg';
import CompanyService from 'frontend/js/api/CompanyService';
import Button from 'frontend/js/components/Button';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import Contacts from 'frontend/js/views/SellYourCar/_Shared/Contacts';
import FacebookIconSvg from './img/facebook-icon.svg';
import useStyles from './useStyles';

function SuccessView({ instantOffer }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.card}>
        <div className={classes.content}>
          <img src={CheckmarkRoundGreenSvg} alt="Checkmark" width={48} height={48} className={classes.checkmarkIcon} />
          <div className={classes.title}>
            <FormattedMessage
              id="sellYourCarPage.upload.photos.success.title"
              values={{ vehicle: instantOffer.title }}
            />
          </div>
          <div className={classes.desc}>
            <FormattedMessage id="sellYourCarPage.upload.photos.success.desc" />
          </div>

          <div className={classes.actions}>
            <div className={classes.facebookPromo}>
              <div className={classes.followUsOnFacebookSection}>
                <div>
                  <strong>
                    <FormattedMessage id="shared.label.followUsOnFacebook" />
                  </strong>
                </div>
                <div style={{ marginTop: 8, color: '#828282' }}>
                  <FormattedMessage id="sellYourCarPage.instantOffer.keepUpdatedOnWhatIsNew" />
                </div>
                <Button
                  href={CompanyService.socials.facebook}
                  size="md"
                  label={<FormattedMessage id="shared.cta.follow" />}
                  className={classes.facebookCta}
                  isTargetBlank
                />
              </div>
              <div>
                <img src={FacebookIconSvg} alt="Facebook" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Contacts />
    </div>
  );
}

export default SuccessView;
