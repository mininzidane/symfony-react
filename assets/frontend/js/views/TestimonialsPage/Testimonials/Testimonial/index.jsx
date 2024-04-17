import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl-phraseapp';
import RouterService from 'frontend/js/api/RouterService';
import DateTimeService from 'frontend/js/lib/utils/DateTimeService';
import Card from 'frontend/js/components/Card';
import RatingStars from 'frontend/js/views/Shared/RatingStars';
import useStyles from './useStyles';

function Testimonial({ className, testimonial }) {
  const classes = useStyles();
  const { authorName, createdAt, rating, content } = testimonial;

  return (
    <Card elevation={2} className={className}>
      <div itemScope itemType="http://schema.org/Review" className={classes.root}>
        <div className={classes.header}>
          <div>
            <div itemProp="author" className={classes.author}>
              {authorName}
            </div>
            <div>
              <FormattedMessage id="testimonialsPage.testimonial.datetime.on" />{' '}
              <time itemProp="datePublished" dateTime={createdAt} className={classes.time}>
                {DateTimeService.formatFromISOString(createdAt, 'MM/dd/yyyy hh:mma')}
              </time>
            </div>
          </div>
          <div itemProp="reviewRating" itemScope itemType="http://schema.org/Rating">
            <meta itemProp="ratingValue" content={rating} />
            <RatingStars rating={rating} className={classes.ratingStars} />
            <div>
              <FormattedMessage id="testimonialsPage.rating.starsCount" values={{ count: rating }} />
            </div>
          </div>
        </div>
        <div className={classes.description}>
          <span itemProp="description">{content}</span>
        </div>
        <div itemProp="itemReviewed" itemScope itemType="http://schema.org/Product">
          <meta itemProp="name" content={RouterService.getRoute('home')} />
        </div>
      </div>
    </Card>
  );
}

Testimonial.propTypes = {
  testimonial: PropTypes.object.isRequired,
  className: PropTypes.string,
};

Testimonial.defaultProps = {
  className: '',
};

export default Testimonial;
