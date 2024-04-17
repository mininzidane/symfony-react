/* eslint-disable react/prop-types */
import React from 'react';
import RatingStars from 'frontend/js/views/Shared/RatingStars';
import GLogoSvg from './img/g-logo.svg';
import useStyles from './useStyles';

function Card({ name, date, text, rating }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.name}>
        <img src={GLogoSvg} alt="icon" />
        <strong>{name}</strong>
      </div>
      <div className={classes.date}>{date}</div>
      <RatingStars className={classes.stars} rating={rating} color="#EA5507" />
      <div className={classes.text}>{text}</div>
    </div>
  );
}

export default Card;
