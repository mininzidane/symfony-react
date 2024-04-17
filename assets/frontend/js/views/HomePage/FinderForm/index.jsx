import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import PropTypes from 'prop-types';
import ContainerFullScreen from 'frontend/js/components/ContainerFullScreen';
import YmmFinderForm from 'frontend/js/views/Shared/YmmFinderForm';
import LotService from 'frontend/js/api/LotService';
import BackgroundDesktopJpg from './img/usa/backgroundDesktop.jpg';
import BackgroundDesktop2xJpg from './img/usa/backgroundDesktop@2x.jpg';
import BackgroundMobileJpg from './img/usa/backgroundMobile.jpg';
import BackgroundMobile2xJpg from './img/usa/backgroundMobile@2x.jpg';
import BackgroundDesktopIntlJpg from './img/intl/backgroundDesktopIntl.jpg';
import BackgroundDesktopIntl2xJpg from './img/intl/backgroundDesktopIntl@2x.jpg';
import BackgroundMobileIntlJpg from './img/intl/backgroundMobileIntl.jpg';
import BackgroundMobileIntl2xJpg from './img/intl/backgroundMobileIntl@2x.jpg';
import useStyles from './useStyles';

function FinderForm({ lotsCount, isIntlPage }) {
  const classes = useStyles({ isIntlPage });

  return (
    <ContainerFullScreen
      className={classes.container}
      wrapperClassName={classes.containerWrapper}
      isBeyondBackground
      background={{
        xl_x1: isIntlPage ? BackgroundDesktopIntlJpg : BackgroundDesktopJpg,
        xl_x2: isIntlPage ? BackgroundDesktopIntl2xJpg : BackgroundDesktop2xJpg,
        sm_x1: isIntlPage ? BackgroundMobileIntlJpg : BackgroundMobileJpg,
        sm_x2: isIntlPage ? BackgroundMobileIntl2xJpg : BackgroundMobile2xJpg,
        color: isIntlPage ? 'linear-gradient(90deg, #161E34 35%, #411819 65%)' : '#1139A9',
      }}
    >
      <div className={classes.root}>
        <div className={classes.caption}>
          <h1 className={classes.title}>
            {isIntlPage ? (
              <FormattedMessage id="homePage.intl.finder.title" />
            ) : (
              <FormattedMessage id="homePage.finder.title" values={{ br: <br className={classes.brXlUp} /> }} />
            )}
          </h1>
          <p className={classes.subtitle}>
            {isIntlPage ? (
              <FormattedMessage id="homePage.intl.finder.subtitle" values={{ count: lotsCount }} />
            ) : (
              <FormattedMessage
                id="homePage.finder.subtitle"
                values={{ count: lotsCount, br: <br className={classes.brXlUp} /> }}
              />
            )}
          </p>
        </div>

        <YmmFinderForm vehicleType={LotService.VEHICLE_CATEGORY.AUTOMOBILE} ctaQaId="qa_search_button" />
      </div>
    </ContainerFullScreen>
  );
}

FinderForm.propTypes = {
  lotsCount: PropTypes.string.isRequired,
  isIntlPage: PropTypes.bool.isRequired,
};

export default FinderForm;
