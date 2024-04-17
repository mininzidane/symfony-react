/* eslint-disable react/prop-types */
import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import Button from 'frontend/js/components/Button';
import RouterService from 'frontend/js/api/RouterService';
import Review from './Review';
import reviews from './reviews';
import useStyles from './useStyles';

function Reviews({ iso2, countryName }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <h2 className={classes.title}>
          <FormattedMessage id="homePage.reviews.title" />
        </h2>

        <div className={classes.grid}>
          <section className={classes.content}>
            {reviews[iso2].map((review, index) => (
              <Review
                key={index}
                name={review.name}
                avatar={review.avatar}
                messageId={review.messageId}
                rating={review.rating}
                countryName={countryName}
              />
            ))}
          </section>
        </div>

        <div className={classes.footer}>
          <Button
            label={<FormattedMessage id="homePage.reviews.viewAll" />}
            href={RouterService.getRoute('autoBidMasterReviews')}
            color="blue"
            isInline
            isShadowless
          />
        </div>
      </div>
    </div>
  );
}

export default Reviews;
