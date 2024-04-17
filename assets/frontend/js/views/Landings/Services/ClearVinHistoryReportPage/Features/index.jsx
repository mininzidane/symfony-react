import React from 'react';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import Button from 'frontend/js/components/Button';
import { FormattedMessage } from 'react-intl-phraseapp';
import Container from 'frontend/js/components/Container';
import useStyles from './useStyles';
import Icon1Svg from './img/1.svg';
import Icon2Svg from './img/2.svg';
import Icon3Svg from './img/3.svg';
import Icon4Svg from './img/4.svg';
import Icon5Svg from './img/5.svg';
import Icon6Svg from './img/6.svg';
import Icon7Svg from './img/7.svg';
import Icon8Svg from './img/8.svg';
import Icon9Svg from './img/9.svg';

function Features() {
  const classes = useStyles();
  const { isBelowSm } = useBreakpoint();

  return (
    <div className={classes.section}>
      <Container>
        <div className={classes.root}>
          <div className={classes.info}>
            <div className={classes.title}>
              <FormattedMessage id="clearVinHistoryReportPage.featuresSection.title" />
            </div>
            <div className={classes.desc}>
              <FormattedMessage id="clearVinHistoryReportPage.featuresSection.desc" />
            </div>
            {!isBelowSm && (
              <Button
                color="green"
                className={classes.cta}
                label={<FormattedMessage id="shared.cta.viewSampleReport" />}
                href="https://www.clearvin.com/sample-report"
                isNofollow
                isTargetBlank
              />
            )}
          </div>
          <div className={classes.grid}>
            <div className={classes.feature}>
              <div>
                <img src={Icon9Svg} alt="Icons" width={46} />
              </div>
              <strong>
                <FormattedMessage id="clearVinHistoryReportPage.featuresSection.feature1" />
              </strong>
            </div>
            <div className={classes.feature}>
              <div>
                <img src={Icon2Svg} alt="Icons" />
              </div>
              <strong>
                <FormattedMessage id="clearVinHistoryReportPage.featuresSection.feature2" />
              </strong>
            </div>
            <div className={classes.feature}>
              <div>
                <img src={Icon6Svg} alt="Icons" />
              </div>
              <strong>
                <FormattedMessage id="clearVinHistoryReportPage.featuresSection.feature3" />
              </strong>
            </div>
            <div className={classes.feature}>
              <div>
                <img src={Icon1Svg} alt="Icons" />
              </div>
              <strong>
                <FormattedMessage id="clearVinHistoryReportPage.featuresSection.feature4" />
              </strong>
            </div>
            <div className={classes.feature}>
              <div>
                <img src={Icon3Svg} alt="Icons" />
              </div>
              <strong>
                <FormattedMessage id="clearVinHistoryReportPage.featuresSection.feature5" />
              </strong>
            </div>
            <div className={classes.feature}>
              <div>
                <img src={Icon7Svg} alt="Icons" />
              </div>
              <strong>
                <FormattedMessage id="clearVinHistoryReportPage.featuresSection.feature6" />
              </strong>
            </div>
            <div className={classes.feature}>
              <div>
                <img src={Icon8Svg} alt="Icons" />
              </div>
              <strong>
                <FormattedMessage id="clearVinHistoryReportPage.featuresSection.feature7" />
              </strong>
            </div>
            <div className={classes.feature}>
              <div>
                <img src={Icon5Svg} alt="Icons" />
              </div>
              <strong>
                <FormattedMessage id="clearVinHistoryReportPage.featuresSection.feature8" />
              </strong>
            </div>
            <div className={classes.feature}>
              <div>
                <img src={Icon4Svg} alt="Icons" />
              </div>
              <strong>
                <FormattedMessage id="clearVinHistoryReportPage.featuresSection.feature9" />
              </strong>
            </div>
          </div>

          {isBelowSm && (
            <Button
              color="green"
              className={classes.cta}
              label={<FormattedMessage id="shared.cta.viewSampleReport" />}
              href="https://www.clearvin.com/sample-report"
              isNofollow
              isTargetBlank
            />
          )}
        </div>
      </Container>
    </div>
  );
}

Features.propTypes = {};

export default Features;
