/* eslint-disable react/prop-types */
import React from 'react';
import classnames from 'classnames';
import { FormattedMessage } from 'react-intl-phraseapp';
import BootstrapService from 'frontend/js/api/BootstrapService';
import GoogleAd from 'frontend/js/components/GoogleAd';
import ContainerFullScreen from 'frontend/js/components/ContainerFullScreen';
import Container from 'frontend/js/components/Container';
import SectionTitle from 'frontend/js/views/Shared/SectionTitle';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import StepsAbove from './Desktop/StepsAbove';
import StepsBelow from './Desktop/StepsBelow';
import Separator from './Desktop/Separator';
import StepsLeft from './Mobile/StepsLeft';
import StepsRight from './Mobile/StepsRight';
import SeparatorMobile from './Mobile/SeparatorMobile';
import useStyles from './useStyles';

function HowToBuyAndShip({ country, isGrayBackground }) {
  const classes = useStyles();
  const backgroundColor = isGrayBackground ? '#F1F1F8' : '#FFFFFF';
  const countryName = country || BootstrapService.getAppValue('countryName');
  const { isAboveSm } = useBreakpoint();

  return (
    <ContainerFullScreen className={classes.root} background={{ color: backgroundColor }} style={{ backgroundColor }}>
      <Container>
        <GoogleAd
          id="div-gpt-ad-1657793809951-0"
          className={classnames('mt-10 width-xl-728 width-sm-300', classes.adsBanner)}
          adUnitPath="/93216436/homepage-728*90-300*50"
          targetsArray={['page_spot', ['bottom_1']]}
          pubTargetsArray={['page', ['main_page']]}
          placement="homepage_reviews"
          withSlot
        />
        <SectionTitle text={<FormattedMessage id="homePage.intl.howToBuyAndShip.title" values={{ countryName }} />} />
      </Container>

      {isAboveSm ? (
        <div className={classes.container}>
          <StepsAbove country={countryName} />
          <Separator />
          <StepsBelow country={countryName} />
        </div>
      ) : (
        <div className={classes.containerMobile}>
          <StepsLeft country={countryName} />
          <SeparatorMobile />
          <StepsRight country={countryName} />
        </div>
      )}
    </ContainerFullScreen>
  );
}

export default HowToBuyAndShip;
