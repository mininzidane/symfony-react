import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import Container from 'frontend/js/components/Container';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import SignUpCta from '../Shared/SignUpCta';
import ShieldSvg from './img/shield.svg';
import Feature from './Feature';
import useStyles from './useStyles';

function TrustShield() {
  const classes = useStyles();
  const { isBelowMd, isAboveMd } = useBreakpoint();

  return (
    <div className={classes.root}>
      <Container>
        <div className={classes.grid}>
          <div>
            <Feature
              title={<FormattedMessage id="stateLandingPage.promo.truthful.title" />}
              text={<FormattedMessage id="stateLandingPage.promo.truthful.text" />}
            />
            <Feature
              title={<FormattedMessage id="stateLandingPage.promo.real.title" />}
              text={<FormattedMessage id="stateLandingPage.promo.real.text" />}
            />
            <Feature
              title={<FormattedMessage id="stateLandingPage.promo.unchanged.title" />}
              text={<FormattedMessage id="stateLandingPage.promo.unchanged.text" />}
            />
            <Feature
              title={<FormattedMessage id="stateLandingPage.promo.specifications.title" />}
              text={<FormattedMessage id="stateLandingPage.promo.specifications.text" />}
            />
            <Feature
              title={<FormattedMessage id="stateLandingPage.promo.timely.title" />}
              text={<FormattedMessage id="stateLandingPage.promo.timely.text" />}
            />

            {isAboveMd && (
              <div className={classes.buttonWrap}>
                <SignUpCta />
              </div>
            )}
          </div>

          <div className={classes.aside}>
            <img src={ShieldSvg} alt="Shield" width="290" />

            <div className={classes.description}>
              <FormattedMessage id="stateLandingPage.promo.shield.desc" />
            </div>

            {isBelowMd && (
              <div className={classes.buttonWrapMobile}>
                <SignUpCta />
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}

export default TrustShield;
