import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import ButtonLink from 'frontend/js/components/ButtonLink';
import useStyles from './useStyles';

function Description() {
  const classes = useStyles();

  function handleClick() {
    window.location.hash = '';
  }

  return (
    <div className={classes.root}>
      <FormattedMessage
        id="checkoutPage.paymentMethods.guide.desc"
        values={{ button: (chunk) => <ButtonLink label={chunk} onClick={handleClick} /> }}
      />
    </div>
  );
}

export default Description;
