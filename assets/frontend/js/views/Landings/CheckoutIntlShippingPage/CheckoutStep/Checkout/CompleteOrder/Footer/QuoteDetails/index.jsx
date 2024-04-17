import React from 'react';
import QuoteDetails from 'frontend/js/views/Shared/ShippingCalculator/CompleteOrder/Footer/QuoteDetails';
import useStyles from './useStyles';

function StyledQuoteDetails(props) {
  const classes = useStyles();

  return <QuoteDetails {...props} classes={classes} />;
}

export default StyledQuoteDetails;
