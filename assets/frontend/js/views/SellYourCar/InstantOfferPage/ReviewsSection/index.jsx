import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import Reviews from 'frontend/js/views/Shared/PageSections/Reviews';
import JimmyPng from './img/jimmy.png';
import Jimmy2xPng from './img/jimmy@2x.png';
import MarkPng from './img/mark.png';
import Mark2xPng from './img/mark@2x.png';
import SarahPng from './img/sarah.png';
import Sarah2xPng from './img/sarah@2x.png';
import useStyles from './useStyles';

function ReviewsSection() {
  const classes = useStyles();

  const reviews = [
    {
      name: <FormattedMessage id="sellYourCarPage.reviews.reviewer1.mark" />,
      photo: MarkPng,
      photo2x: Mark2xPng,
      message: <FormattedMessage id="sellYourCarPage.reviews.reviewer1.message" />,
      rating: 5,
    },
    {
      name: <FormattedMessage id="sellYourCarPage.reviews.reviewer2.sarah" />,
      photo: SarahPng,
      photo2x: Sarah2xPng,
      message: <FormattedMessage id="sellYourCarPage.reviews.reviewer2.message" />,
      rating: 4,
    },
    {
      name: <FormattedMessage id="sellYourCarPage.reviews.reviewer3.jimmy" />,
      photo: JimmyPng,
      photo2x: Jimmy2xPng,
      message: <FormattedMessage id="sellYourCarPage.reviews.reviewer3.message" />,
      rating: 5,
    },
  ];

  return <Reviews className={classes.root} reviews={reviews} />;
}

export default ReviewsSection;
