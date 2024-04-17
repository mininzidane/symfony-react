/* eslint-disable react/prop-types */
import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import RatingStars from 'frontend/js/views/Shared/RatingStars';
import useStyles from './useStyles';

function Card({ desc, rating, name, photo }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <header className={classes.header}>
        <img className={classes.image} src={photo} alt="User" />

        <div className={classes.content}>
          <div className={classes.name}>{name}</div>
          <RatingStars className={classes.ratingStars} rating={rating} color="#EA5507" />
          <div className={classes.rating}>
            <FormattedMessage id="testimonialsPage.rating.starsCount" values={{ count: rating }} />
          </div>
        </div>
      </header>

      <div className={classes.desc}>{desc}</div>
    </div>
  );
}

export default Card;
