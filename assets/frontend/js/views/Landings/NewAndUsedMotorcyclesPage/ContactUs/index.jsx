/* eslint-disable react/prop-types */
import React from 'react';
import classnames from 'classnames';
import Card from 'frontend/js/components/Card';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import RegisterView from 'frontend/js/views/Shared/Auth/RegisterView';
import RouterService from 'frontend/js/api/RouterService';
import AuctionService from 'frontend/js/api/AuctionService';
import ContactInfoCard from './ContactInfoCard';
import useStyles from './useStyles';

function ContactUs({ loungeCountry }) {
  const classes = useStyles();

  function handleSuccess() {
    RouterService.redirect('searchResults', { auction: AuctionService.SRP_FILTER_AUCTIONS.NPA });
  }

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        {loungeCountry && (
          <h2 className={classes.title}>
            <FormattedMessage id="shared.cta.contactUs" />
          </h2>
        )}

        {loungeCountry ? (
          <div className={classes.grid}>
            <ContactInfoCard iso2={loungeCountry.country?.iso_2} />
            <Card elevation={2}>
              <RegisterView
                onSuccess={handleSuccess}
                className={classes.form}
                title={<FormattedMessage id="registerPage.title" />}
                autoFocus={false}
              />
            </Card>
          </div>
        ) : (
          <div className={classes.centered}>
            <Card elevation={2}>
              <RegisterView
                onSuccess={handleSuccess}
                className={classnames(classes.form, 'is-single')}
                title={<FormattedMessage id="registerPage.title" />}
                autoFocus={false}
              />
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

export default ContactUs;
