import React from 'react';
import PropTypes from 'prop-types';
import Card from 'frontend/js/components/Card';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import useIntl from 'frontend/js/hooks/useIntl';
import Container from 'frontend/js/components/Container';
import ContainerFullScreen from 'frontend/js/components/ContainerFullScreen';
import RouterService from 'frontend/js/api/RouterService';
import RegisterView from 'frontend/js/views/Shared/Auth/RegisterView';
import BackgroundDesktopJpg from './img/backgroundDesktop.jpg';
import BackgroundDesktop2xJpg from './img/backgroundDesktop@2x.jpg';
import BackgroundMobileJpg from './img/backgroundMobile.jpg';
import BackgroundMobile2xJpg from './img/backgroundMobile@2x.jpg';
import PromoText from './PromoText';
import useStyles from './useStyles';

function Registration({ country }) {
  const { isAuthenticated } = useCustomerHelper();
  const classes = useStyles({ isAuthenticated });
  const intl = useIntl();

  function handleSuccess() {
    RouterService.customRedirect(RouterService.getFullRoute('registerCongrats'));
  }

  return (
    <ContainerFullScreen
      className={classes.root}
      background={{
        xl_x1: BackgroundDesktopJpg,
        xl_x2: BackgroundDesktop2xJpg,
        sm_x1: BackgroundMobileJpg,
        sm_x2: BackgroundMobile2xJpg,
        color: 'linear-gradient(90deg, #161E34 35%, #411819 65%)',
      }}
    >
      <Container>
        <div className={classes.grid}>
          <PromoText country={country} />

          {!isAuthenticated && (
            <Card elevation={2}>
              <RegisterView
                onSuccess={handleSuccess}
                title={intl.formatMessage({ id: 'authComponents.registerNowView.title' })}
                isPhoneNumberShown
              />
            </Card>
          )}
        </div>
      </Container>
    </ContainerFullScreen>
  );
}

Registration.propTypes = {
  country: PropTypes.string.isRequired,
};

export default Registration;
