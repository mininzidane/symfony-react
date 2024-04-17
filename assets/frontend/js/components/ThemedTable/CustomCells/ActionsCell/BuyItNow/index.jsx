/* eslint-disable react/prop-types */
import React from 'react';
import Button from 'frontend/js/components/Button';
import Amount from 'frontend/js/components/Amount';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import useStyles from './useStyles';

function BuyItNow({ href, price, onBuyItNowClick }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button
        href={href}
        className={classes.buyItNowButton}
        label={<FormattedMessage id="shared.cta.buyItNow" />}
        color="green"
      />

      <a href={href} className={classes.buyItNowLink} onClick={onBuyItNowClick}>
        <FormattedMessage id="shared.cta.buyItNow" />: <Amount value={price} hasCurrency />
      </a>
    </div>
  );
}

export default BuyItNow;
