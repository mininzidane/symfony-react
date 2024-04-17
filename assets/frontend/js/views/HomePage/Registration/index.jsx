import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl-phraseapp';
import Card from 'frontend/js/components/Card';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import Container from 'frontend/js/components/Container';
import RouterService from 'frontend/js/api/RouterService';
import RegisterCard from 'frontend/js/views/Shared/Auth/RegisterCard';
import SectionTitle from 'frontend/js/views/Shared/SectionTitle';
import Advantage from './Advantage';
import useStyles from './useStyles';

function Registration({ lotsCount }) {
  const classes = useStyles();
  const { isAuthenticated } = useCustomerHelper();

  if (isAuthenticated) {
    return null;
  }

  function handleSuccess() {
    RouterService.customRedirect(RouterService.getFullRoute('registerCongrats'));
  }

  return (
    <div className={classes.root}>
      <Container>
        <div className={classes.grid}>
          <div className={classes.content}>
            <SectionTitle
              text={<FormattedMessage id="authComponents.descriptions.registerNowTitle" />}
              className={classes.title}
            />
            <p className={classes.advantages}>
              <Advantage>
                <FormattedMessage id="authComponents.descriptions.description1" values={{ count: lotsCount }} />
              </Advantage>
              <Advantage>
                <FormattedMessage id="authComponents.descriptions.description2" />
              </Advantage>
              <Advantage>
                <FormattedMessage id="authComponents.descriptions.description3" />
              </Advantage>
              <Advantage>
                <FormattedMessage id="authComponents.descriptions.description4" />
              </Advantage>
            </p>
          </div>
          <div className={classes.formWrap}>
            <Card elevation={2}>
              <RegisterCard onSuccess={handleSuccess} className={classes.form} hasFooterLogin autoFocus={false} />
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
}

Registration.propTypes = {
  lotsCount: PropTypes.string.isRequired,
};

export default Registration;
