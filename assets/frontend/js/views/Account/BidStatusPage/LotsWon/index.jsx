import React from 'react';
import PropTypes from 'prop-types';
import FacebookFeedbackBanner from 'frontend/js/views/Shared/PageSections/FacebookFeedbackBanner';
import Loader from 'frontend/js/views/Shared/Loader';
import Filters from '../Shared/Filters';
import NoResultsState from '../Shared/NoResultsState';
import useLotsWon from './useLotsWon';
import useStyles from './useStyles';
import PageContent from './PageContent';

function LotsWon({ handleCountUpdate }) {
  const classes = useStyles();
  const { loading, invoices, total } = useLotsWon(handleCountUpdate);
  const hasResults = Boolean(total);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={classes.root}>
      <Filters hasViewToggle />
      <div className={classes.mobileWrap}>
        {hasResults && <FacebookFeedbackBanner className={classes.facebookBanner} />}
      </div>

      <div>{hasResults ? <PageContent invoices={invoices} /> : <NoResultsState type="lotsWon" />}</div>
    </div>
  );
}

LotsWon.propTypes = {
  handleCountUpdate: PropTypes.func.isRequired,
};

export default LotsWon;
