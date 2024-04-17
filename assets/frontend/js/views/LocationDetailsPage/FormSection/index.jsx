/* eslint-disable react/prop-types */
import React from 'react';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import UpcomingAuctionsTable from 'frontend/js/views/LocationDetailsPage/FormSection/UpcomingAuctionsTable';
import TodayAuctionsTable from './TodayAuctionsTable';
import FinderForm from './FinderForm';
import useStyles from './useStyles';

function FormSection({ location }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.form}>
        <FormattedMessage
          id="locationDetailsPage.finderForm.title"
          values={{ location: location.name }}
          className={classes.caption}
        />
        <FinderForm />
      </div>

      <div>
        <FormattedMessage id="locationDetailsPage.upcomingAuctions.title" className={classes.caption} />

        <div className={classes.tables}>
          <TodayAuctionsTable location={location} />
          <UpcomingAuctionsTable location={location} />
        </div>
      </div>
    </div>
  );
}

export default FormSection;
