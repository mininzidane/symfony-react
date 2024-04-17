import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl-phraseapp';
import RatingStars from 'frontend/js/views/Shared/RatingStars';
import useStyles from './useStyles';

function Review({ className, name, rating, messageId, avatar, countryName }) {
  const classes = useStyles();

  return (
    <div className={classnames(classes.root, className)}>
      <div className={classes.details}>
        <div className={classes.photo}>
          <img src={avatar} alt={`Autobidmaster ${name} Review`} width={64} height={64} />
        </div>
        <div className={classes.info}>
          <div className={classes.name}>{name}</div>
          <RatingStars className={classes.ratingStars} rating={rating} color="#EA5507" />
          <div className={classes.ratingHint}>
            <FormattedMessage id="testimonialsPage.rating.starsCount" values={{ count: rating }} />
          </div>
        </div>
      </div>
      <p className={classes.message}>
        <FormattedMessage id={messageId} values={{ country: countryName }} />
      </p>
    </div>
  );
}

Review.defaultProps = {
  className: '',
};

Review.propTypes = {
  name: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
  messageId: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
  countryName: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  className: PropTypes.string,
  avatar: PropTypes.string.isRequired,
};

export default Review;
