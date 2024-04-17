import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import useStyles from './useStyles';

function Title() {
  const classes = useStyles();
  return (
    <div itemProp="itemReviewed" itemScope itemType="http://schema.org/Thing">
      <h1 className={classes.root} itemProp="name">
        <FormattedMessage id="testimonialsPage.title" />
      </h1>
    </div>
  );
}

export default Title;
