import React from 'react';
import Reviews from 'frontend/js/views/Shared/PageSections/Reviews';
import useStyles from './useStyles';

function ReviewsSection() {
  const classes = useStyles();

  return <Reviews className={classes.root} />;
}

export default ReviewsSection;
