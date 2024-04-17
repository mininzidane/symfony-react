/* eslint-disable react/prop-types */
import React from 'react';
import classnames from 'classnames';
import Card from 'frontend/js/components/Card';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import RegisterView from 'frontend/js/views/Shared/Auth/RegisterView';
import RouterService from 'frontend/js/api/RouterService';
import CountryService from 'frontend/js/api/CountryService';
import AuctionService from 'frontend/js/api/AuctionService';
import t from 'frontend/js/api/TranslatorService';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import ContactInfoCard from './ContactInfoCard';
import useStyles from './useStyles';

function ContactUs() {
  const classes = useStyles();
  const { isAuthenticated } = useCustomerHelper();

  function handleSuccess() {
    RouterService.redirect('searchResults', { auction: AuctionService.SRP_FILTER_AUCTIONS.COPART_DE });
  }

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <h2 className={classes.title}>
          <FormattedMessage id="shared.cta.contactUs" />
        </h2>

        <div className={classnames(classes.grid, isAuthenticated && 'has-one-item')}>
          <ContactInfoCard iso2={CountryService.COUNTRIES.usa.iso2} />
          {!isAuthenticated && (
            <Card elevation={1}>
              <RegisterView
                onSuccess={handleSuccess}
                className={classes.form}
                title={t('registerPage.title')}
                autoFocus={false}
              />
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
