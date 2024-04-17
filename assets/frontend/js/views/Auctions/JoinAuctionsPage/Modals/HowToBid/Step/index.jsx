/* eslint-disable react/prop-types */
import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import useStyles from './useStyles';

function Step({ number, text, images }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.smallImage}>{images.small}</div>
      <div>
        <div className={classes.number}>
          <FormattedMessage id="joinAuctions.howToBid.step" /> {number}
        </div>
        <div className={classes.description}>{text}</div>
      </div>
      <div className={classes.image}>{images.big}</div>
    </div>
  );
}

export default Step;
